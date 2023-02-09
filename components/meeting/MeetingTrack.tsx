import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimType, IMainState } from "../../interfaces";
import {
  DevicePermissionStatus,
  IDevicePermission,
} from "../../interfaces/meeting";
import { actionSetMeetingId } from "../../redux/action/meeting";
import AnimationFiberCanvas from "../Fiber/Animtion";
import Cockpit from "./Cockpit";
import { jitsiConfig } from "./config";
import tryConnect from "./connection";
import { MeetingContext } from "./MeetingContext";

const MeetingTrack = () => {
  const {
    connection,
    room,
    setConnection,
    setRoom,
    localUser,
    setLocalUser,
    remoteUsers,
    setRemoteUsers,
    updateRemoteUsers,
    addChatMsg,
  } = React.useContext(MeetingContext);
  const dispatch = useDispatch();
  const meeting = useSelector(
    (state: IMainState) => state.clientState.meeting || {}
  );

  function onConferenceJoined() {
    console.error("conference joined!", localUser?.tracks?.length);
    for (let i = 0; localUser?.tracks && i < localUser?.tracks?.length; i++) {
      room?.addTrack(localUser?.tracks[i]);
    }
  }
  function onUserLeft(id: any) {
    console.log("user left");
    if (!remoteUsers?.[id]) {
      return;
    }
    const copy = { ...remoteUsers };
    delete copy[id];
    setRemoteUsers(copy);
  }
  function onRemoteTrack(track: any) {
    if (track.isLocal()) {
      return;
    }
    updateRemoteUsers(track);

    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
      (audioLevel: any) => console.log(`Audio Level remote: ${audioLevel}`)
    );
    // track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () =>
    //   console.log("remote track muted")
    // );
    // track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
    //   console.log("remote track stoped")
    // );
    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      (deviceId: any) =>
        console.log(`track audio output device was changed to ${deviceId}`)
    );
  }
  const joinRoom = () => {
    console.error("meeting.meetingId~~~~~~~", meeting.meetingId);
    const room = connection.initJitsiConference(meeting.meetingId, {});
    setRoom(room);
    room.join();
    room.setDisplayName("user-" + Math.floor(Math.random() * 1000));
  };
  const onEndpointMessage = (sender: any, payload: any) => {
    console.error("meeting.meetingId~~~~~~~", sender);
    addChatMsg?.({
      name: sender?._displayName,
      msg: payload?.msg,
      id: sender._id,
    });
  };
  const roomListener = () => {
    if (!room) return;
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track: any) => {
      console.error(
        remoteUsers,
        `track removed!!!${track}`,
        track.getParticipantId()
      );
      const participantId = track.getParticipantId();
      const copy = { ...remoteUsers };
      const existingTracks = copy[participantId]?.tracks || [];
      copy[participantId] = {
        ...(copy[participantId] || {}),
        tracks: existingTracks.filter((t) => t.getId() !== track.getId()),
      };
      setRemoteUsers(copy);
    });
    room.on(
      JitsiMeetJS.events.conference.CONFERENCE_JOINED,
      onConferenceJoined
    );
    room.on(JitsiMeetJS.events.conference.USER_JOINED, (id: any) => {
      console.log("user join");
      const copy = { ...remoteUsers };
      copy[id] = { tracks: [] };
      setRemoteUsers(copy);
    });
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
    room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, (track: any) => {
      console.log(`${track.getType()} - ${track.isMuted()}`);
    });
    room.on(
      JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
      (userID: any, displayName: any) =>
        console.log(`${userID} - ${displayName}`)
    );
    room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, () => {
      //(userID: any, audioLevel: any)
    });
    room.on(
      JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED,
      onEndpointMessage
    );
    room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, () =>
      console.log(`~~~~`)
    );
  };

  const createLocalTracks = async (
    facingMode = "user",
    constraints = undefined
  ) => {
    return JitsiMeetJS.createLocalTracks({
      devices: ["audio", "video"],
      facingMode,
      constraints,
    })
      .catch(() => {
        return null;
      })
      .then((tracks: any) => {
        const lUser = {
          ...(localUser || {}),
          tracks: tracks,
        };
        setLocalUser(lUser);
      });
  };
  const initMeeting = () => {
    try {
      JitsiMeetJS.init(jitsiConfig);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
      const facingMode = "user";
      const constraints = undefined;
      createLocalTracks(facingMode, constraints)
        .catch(() => {
          return createLocalTracks();
        })
        .then(() => {
          return tryConnect(jitsiConfig);
        })
        .then((connection) => {
          setConnection(connection);
        })
        .catch(() => {
          console.error("Connect to server failed");
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getUserMedia = (): Promise<IDevicePermission> => {
    if (navigator?.mediaDevices?.getUserMedia) {
      return navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(() => ({
          audio: DevicePermissionStatus.GRANTED,
          video: DevicePermissionStatus.GRANTED,
        }))
        .catch(() => {
          //Assuming that can't get video permission, retry with audio only
          console.log("DEBUG:: Can not get camera permission");
          return navigator.mediaDevices
            .getUserMedia({
              audio: true,
              video: false,
            })
            .then(() => ({
              audio: DevicePermissionStatus.GRANTED,
              video: DevicePermissionStatus.REJECTED,
            }));
        });
    }
    return Promise.reject(
      new Error("navigator.mediaDevices.getUserMedia is not available")
    );
  };
  const joinMeeting = (meetingId: string) => {
    getUserMedia()
      .then((permission) => {
        dispatch(actionSetMeetingId(meetingId));
        initMeeting();
        console.log(permission);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    if (connection && !room) joinRoom();
  }, [connection]);
  React.useEffect(() => {
    if (!room) return;
    roomListener();
    return () => {
      // room && roomListener('off');
    };
  }, [room]);
  return (
    <div>
      <Cockpit joinMeeting={joinMeeting} meetingId={meeting.meetingId} />
      <AnimationFiberCanvas
        animationType={AnimType.AUDITORIUM}
        isOrbitControl={true}
      />
    </div>
  );
};

export default MeetingTrack;
