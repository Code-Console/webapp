import React from "react";
import {
  ConfState,
  DevicePermissionStatus,
  IDevicePermission,
  JitsiConnection,
  JitsiConnectionStatus,
  JitsiLocalTrack,
  JitsiMeetingRoom,
  JitsiParticipant,
} from "../../interfaces/meeting";
import { jitsiConfig } from "./config";

export const logJitsiEvent = (action: string, additionalInfor: object = {}) => {
  console.log(
    `%cJitsiEvent ${action} triggered`,
    "color: #FF4500",
    additionalInfor || {},
    "@@@@@@@@@@@@"
  );
  // logEvent(JITSI_MEET_EVENT, action, { ...(additionalInfor || {}) });
};

const MeetingContainer = () => {
  const [state, setState] = React.useState<ConfState>({ jitsiLocalTrack: [] });
  const localVideoRef = React.useRef() as any;
  const [connection, setConnection] = React.useState<JitsiConnection>();
  const [room, setRoom] = React.useState<JitsiMeetingRoom>();
  const meetingId = "meetingId";

  const onDataChannelOpen = () => {
    // dispatch(actionBridgeChannelOpened());
  };

  const onTrackRemoved = (track: any) => {
    console.log(
      `track removed!!! ${track} id - ${track.getId()} local?: ${track.isLocal()}`
    );
    if (track.isLocal()) {
      //   dispatch(actionDidRemoveLocalTrack(track));
    } else {
      //   dispatch(actionDidRemoveRemoteTrack(track));
    }
  };
  const onTrackAdded = (track: any) => {
    console.log(
      `onTrackAdded local -  isLocal: ${track.isLocal()}, type - ${track.getType()}, id - ${track.getId()}`
    );
    if (track.isLocal()) {
      return;
    }
    // dispatch(actionDidAddRemoteTrack(track));
    // const action =
    //   track.getType() === 'audio'
    //     ? actionRemoteTrackAudioMuteDidChange
    //     : actionRemoteTrackVideoMuteDidChange;
    // dispatch(action(track.getParticipantId(), track.isMuted()));
  };

  const onParticipantStatusChanged = (
    participantId: string,
    status: JitsiConnectionStatus
  ) => {
    // dispatch(actionDidChangeConnectionStatus({ participantId, status }));
    logJitsiEvent("DID_CHANGE_PARTICIPANT_CONN_STATUS", {
      participantId,
      status,
    });
  };

  const onConferenceJoined = () => {
    console.log("conference joined!");
    // dispatch(actionDidJoinMeeting(room?.myUserId(), meetingRole));
    logJitsiEvent("DID_JOIN_MEETING, DID_JOIN_MEETING", {
      participantId: `room?.myUserId(),
      meetingId,
      role: meetingRole`,
    });
  };

  const onUserJoined = (participantId: any, user: any) => {
    console.log(
      `user join - ${participantId}, displayName - ${user.getDisplayName()}`
    );
    // dispatch(
    //   actionUpdateRemoteDisplayName(participantId, user.getDisplayName())
    // );
    // dispatch(actionParticipantDidJoinMeeting(participantId, user));
  };

  const onUserPropertyChanged = (user: any) => {
    console.log("user property changed", user?.getProperty("meetingState"));
    const remoteMeetingState = user.getProperty("meetingState");
    // if (remoteMeetingState === ParticipantMeetingState.ENTERED_FROM_LOUNGE) {
    //   dispatch(actionParticipantDidEnterFromLounge(user.getId()));
    // }
  };
  const onUserLeft = (id: any) => {
    console.log(id + " user left");
    // dispatch(actionParticipantDidLeaveMeeting(id));
  };

  const onDisplayNameChanged = (participantId: any, displayName: any) => {
    console.log(`onDisplayNameChanged: ${participantId} - ${displayName}`);
    // if (participantId !== room?.myUserId()) {
    //   dispatch(actionUpdateRemoteDisplayName(participantId, displayName));
    // }
  };

  const onEndpointMessage = (_: any, payload: any) => {
    logJitsiEvent("onEndpointMessage", payload);
    // dispatch(actionDidReceiveEndpointMessage(payload));
  };

  const onTrackMuteChanged = (track: any) => {
    if (track.isLocal()) {
      return;
    }
    console.log(
      `${track.getType()} track mute changed to muted ${track.isMuted()}, for participant ${track.getParticipantId()}`
    );
    // const action =
    //   track.getType() === 'video'
    //     ? actionRemoteTrackVideoMuteDidChange(
    //         track.getParticipantId(),
    //         track.isMuted()
    //       )
    //     : actionRemoteTrackAudioMuteDidChange(
    //         track.getParticipantId(),
    //         track.isMuted()
    //       );
    // dispatch(action);
  };

  const onRemoteStatsUpdated = (participantId: string, stats: any) => {
    console.log(
      `onRemoteStatsUpdated for participantId ${participantId}`,
      stats
    );
    // dispatch(actionUpdateRemoteUserMeetingStats(participantId, stats));
  };
  const onLocalStatsUpdated = (stats: any) => {
    console.log(`onLocalStatsUpdated`, stats);
    // if (stats?.connectionQuality < 10) {
    //   logJitsiEvent(LOW_CONNECTION_QUALITY, {
    //     meetingId,
    //     participantId: room?.myUserId()
    //   });
    // }
    // dispatch(actionUpdateMeetingStats(stats));
  };

  const onKicked = () => {
    console.log("kicked from meeting");
    // onDisconnect(KICKED_OUT_FROM_MEETING, meetingId);
  };

  const onDominantSpeakerChanged = (id: string) => {
    // if (enteredMeetingFromLounge) {
    //   dispatch(actionDidChangeDominantSpeaker(id));
    // }
  };

  const onLastNEndpointChange = (
    leavingEndpointIds: string[],
    enteringEndpointIds: string[]
  ) =>
    logJitsiEvent("LAST_N_ENDPOINTS_CHANGED", {
      leavingEndpointIds,
      enteringEndpointIds,
    });
  const onSubjectChange = (subject: string) =>
    logJitsiEvent("SUBJECT_CHANGED", { subject });
  const onConferenceLeft = () => logJitsiEvent("CONFERENCE_LEFT");
  const onConferenceUniqueIdSet = (meetingId: string) =>
    logJitsiEvent("CONFERENCE_UNIQUE_ID_SET", { meetingId });
  const onDMTFSupportChanged = (support: boolean) =>
    logJitsiEvent("DTMF_SUPPORT_CHANGED", { support });
  const onUserRoleChanged = (id: string, role: string) =>
    logJitsiEvent("USER_ROLE_CHANGED", { id, role });
  const onUserStatusChanged = (id: string, status: string) =>
    logJitsiEvent("USER_STATUS_CHANGED", { id, status });
  const onConferenceFailed = (errorCode: string) =>
    logJitsiEvent("CONFERENCE_FAILED", { errorCode });
  const onConferenceError = (errorCode: string) =>
    logJitsiEvent("CONFERENCE_ERROR", { errorCode });
  const onUserKicked = (actorParticipant: JitsiParticipant, reason: string) =>
    logJitsiEvent("KICKED", { actorParticipant, reason });
  const onParticipantKicked = (
    actorParticipant: JitsiParticipant,
    kickedParticipant: JitsiParticipant,
    reason: string
  ) =>
    logJitsiEvent("PARTICIPANT_KICKED", {
      actorParticipant,
      kickedParticipant,
      reason,
    });
  const onStartMutedPolicyChanged = (policy: {
    audio: boolean;
    video: boolean;
  }) => logJitsiEvent("START_MUTED_POLICY_CHANGED", policy);
  const onStartedMuted = () => logJitsiEvent("STARTED_MUTED");
  const onNoAudioInput = () => logJitsiEvent("NO_AUDIO_INPUT", undefined);
  const onAudioInputStateChange = () =>
    logJitsiEvent("AUDIO_INPUT_STATE_CHANGE", undefined);
  const onRestarted = () => logJitsiEvent("CONFERENCE_RESTARTED", undefined);
  const onVideoBridgeNotAvailable = () =>
    logJitsiEvent("VIDEOBRIDGE_NOT_AVAILABLE", undefined);
  const onReservationError = () =>
    logJitsiEvent("RESERVATION_ERROR", undefined);
  const onGracefulShutdown = () =>
    logJitsiEvent("GRACEFUL_SHUTDOWN", undefined);
  const onJingleFatalError = (error: any) =>
    logJitsiEvent("INCOMPATIBLE_SERVER_VERSIONS", { error });
  const onConferenceDistroyed = () =>
    logJitsiEvent("CONFERENCE_DESTROYED", undefined);
  const onConferenceMaxUser = () =>
    logJitsiEvent("CONFERENCE_MAX_USERS", undefined);

  const roomListener = (status: "on" | "off") => {
    const JitsiConferenceErrors = JitsiMeetJS.errors.conference;
    const JitsiConferenceEvents = JitsiMeetJS.events.conference;
    const JitsiConnectionQualityEvents = JitsiMeetJS.events.connectionQuality;
    const listeners: {
      [key: string]: Function;
    } = {
      [JitsiConferenceEvents.DATA_CHANNEL_OPENED]: onDataChannelOpen,
      [JitsiConferenceEvents.PARTICIPANT_PROPERTY_CHANGED]:
        onUserPropertyChanged,
      [JitsiConferenceEvents.TRACK_REMOVED]: onTrackRemoved,
      [JitsiConferenceEvents.TRACK_ADDED]: onTrackAdded,
      [JitsiConferenceEvents.PARTICIPANT_CONN_STATUS_CHANGED]:
        onParticipantStatusChanged,
      [JitsiConferenceEvents.DOMINANT_SPEAKER_CHANGED]:
        onDominantSpeakerChanged,
      [JitsiConferenceEvents.CONFERENCE_JOINED]: onConferenceJoined,
      [JitsiConferenceEvents.USER_JOINED]: onUserJoined,
      [JitsiConferenceEvents.USER_LEFT]: onUserLeft,
      [JitsiConferenceEvents.DISPLAY_NAME_CHANGED]: onDisplayNameChanged,
      [JitsiConferenceEvents.ENDPOINT_MESSAGE_RECEIVED]: onEndpointMessage,
      [JitsiConferenceEvents.TRACK_MUTE_CHANGED]: onTrackMuteChanged,
      [JitsiConnectionQualityEvents.REMOTE_STATS_UPDATED]: onRemoteStatsUpdated,
      [JitsiConnectionQualityEvents.LOCAL_STATS_UPDATED]: onLocalStatsUpdated,
      [JitsiConferenceEvents.LAST_N_ENDPOINTS_CHANGED]: onLastNEndpointChange,
      [JitsiConferenceEvents.SUBJECT_CHANGED]: onSubjectChange,
      [JitsiConferenceEvents.CONFERENCE_LEFT]: onConferenceLeft,
      [JitsiConferenceEvents.CONFERENCE_UNIQUE_ID_SET]: onConferenceUniqueIdSet,
      [JitsiConferenceEvents.DTMF_SUPPORT_CHANGED]: onDMTFSupportChanged,
      [JitsiConferenceEvents.USER_ROLE_CHANGED]: onUserRoleChanged,
      [JitsiConferenceEvents.USER_STATUS_CHANGED]: onUserStatusChanged,
      [JitsiConferenceEvents.CONFERENCE_FAILED]: onConferenceFailed,
      [JitsiConferenceEvents.KICKED]: onUserKicked,
      [JitsiConferenceEvents.PARTICIPANT_KICKED]: onParticipantKicked,
      [JitsiConferenceEvents.START_MUTED_POLICY_CHANGED]:
        onStartMutedPolicyChanged,
      [JitsiConferenceEvents.STARTED_MUTED]: onStartedMuted,
      [JitsiConferenceEvents.NO_AUDIO_INPUT]: onNoAudioInput,
      [JitsiConferenceEvents.AUDIO_INPUT_STATE_CHANGE]: onAudioInputStateChange,
      [JitsiConferenceErrors.CONNECTION_ERROR]: onConferenceError,
      [JitsiConferenceErrors.CONFERENCE_RESTARTED]: onRestarted,
      [JitsiConferenceErrors.VIDEOBRIDGE_NOT_AVAILABLE]:
        onVideoBridgeNotAvailable,
      [JitsiConferenceErrors.RESERVATION_ERROR]: onReservationError,
      [JitsiConferenceErrors.GRACEFUL_SHUTDOWN]: onGracefulShutdown,
      [JitsiConferenceErrors.INCOMPATIBLE_SERVER_VERSIONS]: onJingleFatalError,
      [JitsiConferenceErrors.CONFERENCE_DESTROYED]: onConferenceDistroyed,
      [JitsiConferenceErrors.CONFERENCE_MAX_USERS]: onConferenceMaxUser,
    };
    for (const event in listeners) {
      room[status](event, listeners[event]);
    }
  };

  const joinRoom = async () => {
    if (!room) {
      const room = connection.initJitsiConference(meetingId, jitsiConfig);
      room.setLocalParticipantProperty("meetingState", "IN_THE_LOUNGE");
      room.join();
      window["room"] = room;
      setRoom(room);
      console.log(room);
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
          //   console.log("DEBUG:: Can not get camera permission");
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
        // console.log("permission   ", permission);
        // setPermissionStatus(permission);
        // dispatch(actionSetMeetingId(meetingId));
        initMeeting();
        // logEvent(DID_SET_DEVICE_PERMISSION, DID_SET_DEVICE_PERMISSION, {
        //   audio: permission.audio,
        //   video: permission.video,
        //   meetingId,
        // });
        // meetingDebugLogger(DID_GET_USER_MEDIA, permission);
      })
      .catch((error) => {
        // setPermissionStatus({
        //   audio: DevicePermissionStatus.REJECTED,
        //   video: DevicePermissionStatus.REJECTED,
        // });
        // logEvent(DID_SET_DEVICE_PERMISSION, DID_SET_DEVICE_PERMISSION, {
        //   audio: DevicePermissionStatus.REJECTED,
        //   video: DevicePermissionStatus.REJECTED,
        //   meetingId,
        // });
        // meetingDebugLogger(DID_FAIL_TO_GET_USER_MEDIA, { error });
      });
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
      .catch((e: any) => {
        console.error(e);
      })
      .then((tracks: any[]) => {
        for (let index = 0; index < tracks.length; index++) {
          const track = tracks[index];
          //   console.log(track,'~~~~~~~~!!!!!!!!~~~~~~');
          if (track.getType() === "audio") {
            //dispatch(actionSetAudioInput(track.getDeviceId()));
          }
          if (track.getType() === "video") {
            console.log(track.getType(), "~~~>>", track.getId());
            //dispatch(actionSetVideoInput(track.getDeviceId()));
          }
        }
        // meetingDebugLogger(DID_CREATE_LOCAL_TRACKS, {
        //   video: tracks.some((t) => t.getType() === 'video'),
        //   audio: tracks.some((t) => t.getType() === 'audio')
        // });
        // dispatch(actionDidAddLocalTrack(tracks));
        console.log(
          "ggg",
          tracks.map((one) => one.getType())
        );
        setState({ ...state, jitsiLocalTrack: tracks });
      });
  };
  const initMeeting = () => {
    const isStudio = false;
    try {
      JitsiMeetJS.init(jitsiConfig);
      //   console.log("jitsiConfig~~~~~~~~~~~~", jitsiConfig);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

      const facingMode = isStudio ? "environment" : "user";
      const constraints = undefined;

      createLocalTracks(facingMode, constraints)
        .catch((e) => {
          console.error(`createLocalTracks failed with error`, e);
          //   Sentry.captureException(e);
          //   meetingDebugLogger(DID_FAIL_TO_CREATE_LOCAL_TRACKS, { error: e });
          return createLocalTracks();
        })
        .then(() => {
          //   initDeviceList();
          //   return tryConnect(jitsiConfig);
        })
        .then((connection) => {
          //   meetingDebugLogger(DID_CONNECT_TO_SERVER);
          setConnection(connection);
          //   dispatch(actionUpdateMeetingServerUrl(jitsiConfig.hosts?.domain));
        })
        .catch(() => {
          //TODO: Provide a way to handle when connect failed
          //   meetingDebugLogger(DID_FAIL_TO_CONNECT_TO_SERVER);
          console.error("Connect to server failed");
        });
    } catch (e) {
      //   meetingDebugLogger(DID_FAIL_TO_INIT_JITSI, { error: e });
      console.log("error invoking JitsiMeetJS init");
      console.log(e);
    }
  };
  React.useEffect(() => {
    joinMeeting(meetingId);
  }, []);
  React.useEffect(() => {
    if (connection) joinRoom();
  }, [connection]);
  React.useEffect(() => {
    console.log(room, "~~~~~~~~room~~~");
    if (!room) return;
    roomListener("on");
    return () => {
      room && roomListener("off");
    };
  }, [room]);

  const localVideoTrack = state.jitsiLocalTrack.find(
    (track) => track.getType() === "video"
  );
  React.useEffect(() => {
    // console.log("attaching local track");
    localVideoTrack?.attach(localVideoRef.current);
    return () => {
      localVideoRef.current && localVideoTrack?.detach(localVideoRef.current);
    };
  }, [localVideoTrack]);
  console.log(state.jitsiLocalTrack.map((one) => one.getType()));
  return (
    <div>
      {state.jitsiLocalTrack?.map((track: JitsiLocalTrack) => (
        <div className="flex-row" key={track.getId()}>
          <div className="user-image">{track.getType()}</div>
          <div className="user-image">{track.getId()}</div>
        </div>
      ))}

      {/* <video
        autoPlay
        playsInline
        ref={localVideoRef}
        id="local-video"
        className="local-video"
      ></video> */}
    </div>
  );
};

export default MeetingContainer;
