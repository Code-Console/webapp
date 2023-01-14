import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMainState, IUser } from "../../interfaces";
import {
  createUser,
  IChat,
  IMeetingLocalUser,
  IMeetingRemoteUsers,
  JitsiConnection,
  JitsiMeetingRoom,
} from "../../interfaces/meeting";
import flatMap from "lodash/flatMap";
import { logEvent } from "../analytics";
import { actionUpdateLocalUser } from "../../redux/action/meeting";
export const MeetingContext = React.createContext<{
  connection?: JitsiConnection;
  room?: JitsiMeetingRoom;
  setConnection: (connection: JitsiConnection) => void;
  setRoom: (room: JitsiMeetingRoom) => void;
  onDisconnect: () => void;
  setUserName: (name: string) => void;
  localUser?: IMeetingLocalUser;
  setLocalUser: (localTracks: IMeetingLocalUser) => void;
  remoteUsers?: IMeetingRemoteUsers;
  setRemoteUsers: (remoteUsers: IMeetingRemoteUsers) => void;
  updateRemoteUsers: (track: any) => void;
  chat?: IChat[];
  addChatMsg?: (msg: IChat) => void;
  switchVideo?: (isVideo?: boolean) => void;
  networkState: {
    isOnline: boolean;
    offerReload: boolean;
  };
}>(undefined as any);

const MeetingContextContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const [connection, setConnection] = React.useState<JitsiConnection>(null);
  const [localUser, setLocalUser] = React.useState<IMeetingLocalUser>();
  const [remoteUsers, setRemoteUsers] = React.useState<IMeetingRemoteUsers>({});
  const [room, setRoom] = React.useState<JitsiMeetingRoom>(null as any);
  const [networkState, setNetworkState] = React.useState({
    isOnline: true,
    offerReload: false,
  });
  const [chat, setChat] = React.useState<IChat[]>([]);
  const meeting = useSelector(
    (state: IMainState) => state.clientState.meeting || {}
  );
  const user = useSelector((state: IMainState) => state.clientState?.user);
  const localTracks = localUser?.tracks || [];

  const updateRemoteUsers = (track: any) => {
    const participantId = track.getParticipantId();
    setRemoteUsers((remoteUsers) => {
      const copy = { ...remoteUsers };
      const existingTracks = copy[participantId]?.tracks || [];
      copy[participantId] = {
        ...(copy[participantId] || {}),
        shouldShowVideo: true,
        tracks: [...existingTracks, track],
      };
      return copy;
    });
  };
  const addChatMsg = (msg: IChat) => {
    setChat([...chat, msg]);
  };
  const switchVideo = (isVideo?: boolean) => {
    // eslint-disable-line no-unused-vars
    const videoTrack = localUser?.tracks?.find((t) => t.getType() === "video");
    const audio = localUser?.tracks?.filter((t) => t.getType() === "audio");

    JitsiMeetJS.createLocalTracks({
      devices: [!isVideo ? "video" : "desktop"],
    })
      .then((tracks: any) => {
        if (videoTrack) {
          videoTrack.dispose();
          localTracks.pop();
        }
        setTimeout(() => {
          const track = tracks?.filter(
            (t: any) => t.getType() === "video"
          )?.[0];
          console.error(
            "~~~~~~~~~~~~~tracks~~~~~~~~",
            tracks.map((t: any) => track.type)
          );
          if (track) {
            setLocalUser({
              ...localUser,
              tracks: [...(audio || []), track],
            });
            track.addEventListener(
              JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
              () => console.error("local track muted")
            );
            track.addEventListener(
              JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
              () => switchVideo(false)
            );
            room.addTrack(track);
          }
        }, 100);
      })
      .catch((error: any) => switchVideo(true));
  };

  React.useEffect(() => {
    const onlineStatusListener = () => {
      setNetworkState((network) => ({ ...network, isOnline: true }));
    };
    const offlineStatusListener = () => {
      setNetworkState((network) => ({ ...network, isOnline: false }));
    };
    const isSupported =
      window.addEventListener !== undefined &&
      typeof navigator.onLine !== "undefined";
    if (isSupported) {
      window.addEventListener("online", onlineStatusListener);
      window.addEventListener("offline", offlineStatusListener);
    } else console.log("Browser does not support network API");
    return () => {
      window.removeEventListener("online", onlineStatusListener);
      window.removeEventListener("offline", offlineStatusListener);
    };
  }, []);

  React.useEffect(() => {
    // const preState = getReconnectState(meetingId);
    // if (preState) {
    //   const {
    //     layout,
    //     displayName,
    //     audioMuted,
    //     videoMuted,
    //     vBackground,
    //     meetingState,
    //     participantId,
    //   } = preState;
    //   if (role === MeetingRole.ADVISOR && layout)
    //     dispatch(actionSetMeetingLayoutState(layout));
    //   if (displayName)
    //     dispatch(actionUpdateLocalUser({ ...user, alias: displayName }));
    //   if (vBackground?.backgroundEffectEnabled) {
    //     dispatch(actionToggleVirtualBackground(vBackground));
    //   }
    //   dispatch(actionLocalTrackAudioMuteDidChange(!!audioMuted));
    //   dispatch(actionLocalTrackVideoMuteDidChange(!!videoMuted));
    //   dispatch(
    //     actionParticipantIsReconnecting({
    //       meetingState: meetingState,
    //       oldParticipantId: participantId,
    //     })
    //   );
    //   localStorage.removeItem(MEETING_RECONNECT_STATE);
    // }
  }, []);

  const onConnectionFailed = () => {
    console.log("connection failed");
    setNetworkState((network) => ({ ...network, offerReload: true }));
  };

  const onConnectionDisconnected = () => {
    console.log("connection disconnected");
  };

  React.useEffect(() => {
    if (connection) {
      connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed
      );
      connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        onConnectionDisconnected
      );
    }
  }, [connection]);

  const disconnectCleanUp = () => {
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      onConnectionDisconnected
    );
    const remoteTracks = flatMap(
      Object.keys(remoteUsers || {}),
      (participantId) => (remoteUsers || {})[participantId]?.tracks || []
    );
    remoteTracks.forEach((t) => t.detach(null));
    localTracks?.forEach((t) => {
      (t as any).dispose();
    });
  };

  const onDisconnect = () => {
    room
      ?.leave()
      .then(() => disconnectCleanUp())
      .then(() => {
        return connection.disconnect();
      })
      .catch((e) => {
        console.log("error when stopping conference");
        console.log(e);
      });
  };

  const setUserName = (name: string) => {
    room?.setDisplayName(name);
    const updatedUser: IUser = {
      ...(user || createUser({ identityId: "getIdentityId", name: "name" })),
    };

    //update user name first for lounge joining
    dispatch(actionUpdateLocalUser(updatedUser));
    //save user info later
    // const action = actionUpdateUserAttributesAsync(updatedUser.id, updatedUser);
    // dispatch(action);
    logEvent(
      "DID_UPDATE_MEETING_DISPLAY_NAME",
      "DID_UPDATE_MEETING_DISPLAY_NAME",
      {
        name,
        meetingId: meeting.meetingId,
        isPresenter: meeting.isPresenter,
        participantId: room?.myUserId(),
      }
    );
  };

  return (
    <MeetingContext.Provider
      value={{
        connection,
        room,
        setConnection,
        setRoom,
        onDisconnect,
        setUserName,
        networkState,
        localUser,
        setLocalUser,
        remoteUsers,
        setRemoteUsers,
        updateRemoteUsers,
        chat,
        addChatMsg,
        switchVideo,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export default MeetingContextContainer;
