import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMainState, IUser } from "../../interfaces";
import {
  createUser,
  IMeetingRemoteUsers,
  JitsiConnection,
  JitsiLocalTrack,
  JitsiMeetingRoom,
} from "../../interfaces/meeting";
import flatMap from "lodash/flatMap";
import { logEvent } from "../analytics";
import {
  actionDidLeaveMeeting,
  actionUpdateLocalUser,
} from "../../redux/action/meeting";
export const MeetingContext = React.createContext<{
  connection?: JitsiConnection;
  room?: JitsiMeetingRoom;
  setConnection: (connection: JitsiConnection) => void;
  setRoom: (room: JitsiMeetingRoom) => void;
  onDisconnect: (eventName: string, meetingId: string) => void;
  setUserName: (name: string) => void;
  localTracks?: JitsiLocalTrack[];
  setLocalTracks: (localTracks: JitsiLocalTrack[]) => void;
  remoteUsers?: IMeetingRemoteUsers;
  setRemoteUsers: (remoteUsers: IMeetingRemoteUsers) => void;
  updateRemoteUsers: (track: any) => void;
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
  const [localTracks, setLocalTracks] = React.useState<JitsiLocalTrack[]>([]);
  const [remoteUsers, setRemoteUsers] = React.useState<IMeetingRemoteUsers>({});
  const [room, setRoom] = React.useState<JitsiMeetingRoom>(null as any);
  const [networkState, setNetworkState] = React.useState({
    isOnline: true,
    offerReload: false,
  });

  const meeting = useSelector(
    (state: IMainState) => state.clientState.meeting || {}
  );
  const user = useSelector((state: IMainState) => state.clientState?.user);
  // const localTracks = meeting.localUser?.tracks || [];

  const updateRemoteUsers = (track: any) => {
    const participantId = track.getParticipantId();
    setRemoteUsers((remoteUsers) => {
      const copy = { ...remoteUsers };
      const existingTracks = copy[participantId]?.tracks || [];
      copy[participantId] = {
        ...(copy[participantId] || {}),
        tracks: [...existingTracks, track],
      };
      return copy;
    });
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
      Object.keys(meeting.remoteUsers || {}),
      (participantId) =>
        (meeting.remoteUsers || {})[participantId]?.tracks || []
    );
    remoteTracks.forEach((t) => t.detach(null));
    localTracks?.forEach((t) => {
      (t as any).dispose();
    });
  };

  const onDisconnect = (eventName: string, meetingId: string) => {
    room
      ?.leave()
      .then(() => disconnectCleanUp())
      .then(() => {
        return connection.disconnect();
      })
      .then(() => {
        const participantId = room?.myUserId();

        dispatch(actionDidLeaveMeeting());
        logEvent(eventName, eventName, {
          participantId,
          meetingId,
        });
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
        localTracks,
        setLocalTracks,
        remoteUsers,
        setRemoteUsers,
        updateRemoteUsers
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export default MeetingContextContainer;
