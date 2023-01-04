import { drop, first } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import {
  DevicePermissionStatus,
  IDevicePermission,
  JitsiConnectionStatus,
  JitsiParticipant,
  ParticipantMeetingState,
} from "../../interfaces/meeting";
import { actionDidAddLocalTrack } from "../../redux/action/meeting";
import { logEvent, logJitsiEvent } from "../analytics";
import { jitsiConfig } from "./config";
import tryConnect from "./connection";
import { MeetingContext } from "./MeetingContext";

const Meeting = () => {
  const conference = "conference";
  const confOptions = {};

  let connection: any = null;
  let isJoined = false;
  let room: any = null;

  let localTracks: any = [];
  const remoteTracks: any = {};
  /**
   * Handles local tracks.
   * @param tracks Array with JitsiTrack objects
   */
  const {setConnection, setRoom } = React.useContext(MeetingContext);
  function onLocalTracks(tracks: any) {
    localTracks = tracks;
    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        (audioLevel: any) => console.log(`Audio Level local: ${audioLevel}`)
      );
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
        () => console.log("local track muted")
      );
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
        () => console.log("local track stoped")
      );
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId: any) =>
          console.log(`track audio output device was changed to ${deviceId}`)
      );
      // if (localTracks[i].getType() === "video") {
      //   $("#video-ele").append(
      //     `<video autoplay='1' id='localVideo${i}' class='video-back'/>`
      //   );
      //   localTracks[i].attach($(`#localVideo${i}`)[0]);
      // } else {
      //   $("#video-ele").append(
      //     `<audio autoplay='1' muted='true' id='localAudio${i}' />`
      //   );
      //   localTracks[i].attach($(`#localAudio${i}`)[0]);
      // }
      if (isJoined) {
        room?.addTrack(localTracks[i]);
      }
    }
  }

  /**
   * Handles remote tracks
   * @param track JitsiTrack object
   */
  function onRemoteTrack(track: any) {
    console.error("onRemoteTrack~~~~~", track);
    if (track.isLocal()) {
      return;
    }
    const participant = track.getParticipantId();

    if (!remoteTracks[participant]) {
      remoteTracks[participant] = [];
    }
    const idx = remoteTracks[participant].push(track);

    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
      (audioLevel: any) => console.log(`Audio Level remote: ${audioLevel}`)
    );
    track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () =>
      console.log("remote track muted")
    );
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
      console.log("remote track stoped")
    );
    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      (deviceId: any) =>
        console.log(`track audio output device was changed to ${deviceId}`)
    );
    const id = participant + track.getType() + idx;

    // if (track.getType() === "video") {
    //   $("#video-ele").append(
    //     `<video autoplay='1' id='${participant}video${idx}' class='video-back'/>`
    //   );
    // } else {
    //   $("#video-ele").append(
    //     `<audio autoplay='1' id='${participant}audio${idx}' />`
    //   );
    // }
    console.error("onRemoteTrack~~~~~", remoteTracks);
    setTimeout(() => {
      // setVideo();
    }, 300);
    // track.attach($(`#${id}`)[0]);
  }

  /**
   * That function is executed when the conference is joined
   */
  function onConferenceJoined() {
    console.log("conference joined!");
    isJoined = true;
    for (let i = 0; i < localTracks.length; i++) {
      room?.addTrack(localTracks[i]);
    }
  }

  /**
   *
   * @param id
   */
  function onUserLeft(id: any) {
    console.log("user left");
    if (!remoteTracks[id]) {
      return;
    }
    const tracks = remoteTracks[id];

    for (let i = 0; i < tracks.length; i++) {
      // tracks[i].detach($(`#${id}${tracks[i].getType()}`));
    }
  }

  /**
   * That function is called when connection is established successfully
   */
  function onConnectionSuccess() {
    console.error("~~~a~~", conference);
    room = connection.initJitsiConference(conference, confOptions);
    setRoom(room);
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track: any) => {
      delete remoteTracks[track.getParticipantId()];
      console.error(
        remoteTracks,
        `track removed!!!${track}`,
        track.getParticipantId()
      );
      // setVideo({ remove: track.getParticipantId() });
    });
    room.on(
      JitsiMeetJS.events.conference.CONFERENCE_JOINED,
      onConferenceJoined
    );
    room.on(JitsiMeetJS.events.conference.USER_JOINED, (id: any) => {
      console.log("user join");
      remoteTracks[id] = [];
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
    room.on(
      JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
      (userID: any, audioLevel: any) => console.log(`${userID} - ${audioLevel}`)
    );
    room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, () =>
      console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`)
    );
    console.log("~~~b~~", room);
    room.join();
  }

  /**
   * This function is called when the connection fail.
   */
  function onConnectionFailed() {
    console.log("~~~c~~", "Connection Failed");
    console.error("Connection Failed!");
  }

  /**
   * This function is called when the connection fail.
   */
  function onDeviceListChanged(devices: any) {
    console.info("current devices", devices);
  }

  /**
   * This function is called when we disconnect.
   */
  function disconnect() {
    console.log("~~~~~~~~~~d~~~~", "disconnect!");
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      onConnectionSuccess
    );
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.removeEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      disconnect
    );
  }

  /**
   *
   */
  function unload() {
    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].dispose();
    }
    room?.leave();
    connection.disconnect();
  }

  let isVideo = true;

  /**
   *
   */
  function switchVideo() {
    // eslint-disable-line no-unused-vars
    isVideo = !isVideo;
    if (localTracks[1]) {
      localTracks[1].dispose();
      localTracks.pop();
    }
    JitsiMeetJS.createLocalTracks({
      devices: [isVideo ? "video" : "desktop"],
    })
      .then((tracks: any) => {
        localTracks.push(tracks[0]);
        localTracks[1].addEventListener(
          JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
          () => console.log("local track muted")
        );
        localTracks[1].addEventListener(
          JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
          () => console.log("local track stoped")
        );
        // localTracks[1].attach($("#localVideo1")[0]);
        room?.addTrack(localTracks[1]);
      })
      .catch((error: any) => console.log(error));
  }

  /**
   *
   * @param selected
   */
  function changeAudioOutput(selected: any) {
    // eslint-disable-line no-unused-vars
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
  }

  // $(window).bind("beforeunload", unload);
  // $(window).bind("unload", unload);

  // JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

  const initOptions = {
    disableAudioLevels: true,
  };
  const initJitsi = () => {
    JitsiMeetJS.init(initOptions);

    connection = new JitsiMeetJS.JitsiConnection(null, null, jitsiConfig);

    setConnection(connection);

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      onConnectionSuccess
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      disconnect
    );

    JitsiMeetJS.mediaDevices.addEventListener(
      JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
      onDeviceListChanged
    );

    connection.connect();

    JitsiMeetJS.createLocalTracks({ devices: ["audio", "video"] })
      .then(onLocalTracks)
      .catch((error: any) => {
        throw error;
      });

    if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable("output")) {
      JitsiMeetJS.mediaDevices.enumerateDevices((devices: any) => {
        const audioOutputDevices = devices.filter(
          (d: any) => d.kind === "audiooutput"
        );

        if (audioOutputDevices.length > 1) {
          // $("#audioOutputSelect").html(
          //   audioOutputDevices
          //     .map((d) => `<option value="${d.deviceId}">${d.label}</option>`)
          //     .join("\n")
          // );
          // $("#audioOutputSelectWrapper").show();
        }
      });
    }
  };

  /******************************************************* */
  const dispatch = useDispatch();
  const [permissionStatus, setPermissionStatus] =
    React.useState<IDevicePermission>({
      video: DevicePermissionStatus.WAITING,
      audio: DevicePermissionStatus.WAITING,
    });

  const recoverFromFailedCreateLocalTracks = (
    facingMode = "user",
    constraints = undefined
  ) => {
    let videoDeviceIds: string[] = [];

    const tryWithVideoDevice = () => {
      if (videoDeviceIds.length === 0) {
        return JitsiMeetJS.createLocalTracks({
          devices: ["audio"],
          facingMode,
          constraints,
        });
      }
      const cameraDeviceId = first(videoDeviceIds);
      videoDeviceIds = drop(videoDeviceIds);
      return JitsiMeetJS.createLocalTracks({
        devices: ["audio", "video"],
        cameraDeviceId,
        facingMode,
        constraints,
      }).catch(tryWithVideoDevice);
    };

    return navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        videoDeviceIds = devices
          .filter((d) => d.kind === "videoinput")
          .map((d) => d.deviceId);
      })
      .then(() => tryWithVideoDevice());
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
        return recoverFromFailedCreateLocalTracks(facingMode, constraints);
      })
      .then((tracks: any) => {
        // for (let index = 0; index < tracks.length; index++) {
        //   const track = tracks[index];
        //   if (track.getType() === 'audio') {
        //     dispatch(actionSetAudioInput(track.getDeviceId()));
        //   }
        //   if (track.getType() === 'video') {
        //     dispatch(actionSetVideoInput(track.getDeviceId()));
        //   }
        // }
        // meetingDebugLogger(DID_CREATE_LOCAL_TRACKS, {
        //   video: tracks.some((t) => t.getType() === 'video'),
        //   audio: tracks.some((t) => t.getType() === 'audio')
        // });
        dispatch(actionDidAddLocalTrack(tracks));
      });
  };

  // const transport = getConnectionTransport();
  // const jitsiRegion = getJitsiRegionByRegionAndStore(region, storeId);
  // const jitsiConfig = jitsiRegion
  //   ? getConfigByRegion(meetingId, transport, jitsiRegion)
  //   : getInitConfig(meetingId, transport, storeId);
  const initMeeting = () => {
    try {
      console.log("jitsiConfig~~~~~~~~~~~~", jitsiConfig);
      JitsiMeetJS.init(jitsiConfig);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
      // meetingDebugLogger(DID_INIT_JITSI);
      const facingMode = "user";
      const constraints = undefined;
      createLocalTracks(facingMode, constraints)
        .catch((e) => {
          console.error(`createLocalTracks failed with error`, e);
          // Sentry.captureException(e);
          // meetingDebugLogger(DID_FAIL_TO_CREATE_LOCAL_TRACKS, { error: e });
          return createLocalTracks();
        })
        .then(() => {
          // initDeviceList();
          return tryConnect(jitsiConfig);
        })
        .then((connection) => {
          // meetingDebugLogger(DID_CONNECT_TO_SERVER);
          setConnection(connection);
          // dispatch(actionUpdateMeetingServerUrl(jitsiConfig.hosts?.domain));
        })
        .catch(() => {
          //TODO: Provide a way to handle when connect failed
          // meetingDebugLogger(DID_FAIL_TO_CONNECT_TO_SERVER);
          console.error("Connect to server failed");
        });
    } catch (e) {
      // meetingDebugLogger(DID_FAIL_TO_INIT_JITSI, { error: e });
      console.log("error invoking JitsiMeetJS init");
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
        setPermissionStatus(permission);
        // dispatch(actionSetMeetingId(meetingId));
        initMeeting();
        // logEvent(DID_SET_DEVICE_PERMISSION, DID_SET_DEVICE_PERMISSION, {
        //   audio: permission.audio,
        //   video: permission.video,
        //   meetingId
        // });
        // meetingDebugLogger(DID_GET_USER_MEDIA, permission);
      })
      .catch((error) => {
        setPermissionStatus({
          audio: DevicePermissionStatus.REJECTED,
          video: DevicePermissionStatus.REJECTED,
        });
        // logEvent(DID_SET_DEVICE_PERMISSION, DID_SET_DEVICE_PERMISSION, {
        //   audio: DevicePermissionStatus.REJECTED,
        //   video: DevicePermissionStatus.REJECTED,
        //   meetingId
        // });
        // meetingDebugLogger(DID_FAIL_TO_GET_USER_MEDIA, { error });
      });
  };
  const joinRoom = async () => {
    if (!room) {
      const room = connection.initJitsiConference(conference, jitsiConfig);
      room.setLocalParticipantProperty(
        "meetingState",
        ParticipantMeetingState.IN_THE_LOUNGE
      );
      room.join();
      window["room" as any] = room;
      setRoom(room);
    }
  };







  const onTrackAdded = (track:any) => {
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

  const onTrackRemoved = (track:any) => {
    console.log(
      `track removed!!! ${track} id - ${track.getId()} local?: ${track.isLocal()}`
    );
    // if (track.isLocal()) {
    //   dispatch(actionDidRemoveLocalTrack(track));
    // } else {
    //   dispatch(actionDidRemoveRemoteTrack(track));
    // }
  };
  const onConferenceJoinedA = () => {
    console.log('conference joined!');
    // dispatch(actionDidJoinMeeting(room?.myUserId(), meetingRole));
    // logEvent(DID_JOIN_MEETING, DID_JOIN_MEETING, {
    //   participantId: room?.myUserId(),
    //   meetingId,
    //   role: meetingRole
    // });
  };

  const onUserJoined = (participantId:any, user:any) => {
    console.log(
      `user join - ${participantId}, displayName - ${user.getDisplayName()}`
    );
    // dispatch(
    //   actionUpdateRemoteDisplayName(participantId, user.getDisplayName())
    // );
    // dispatch(actionParticipantDidJoinMeeting(participantId, user));
  };

  const onUserPropertyChanged = (user:any) => {
    console.log('user property changed', user?.getProperty('meetingState'));
    const remoteMeetingState = user.getProperty('meetingState');
    if (remoteMeetingState === ParticipantMeetingState.ENTERED_FROM_LOUNGE) {
      // dispatch(actionParticipantDidEnterFromLounge(user.getId()));
    }
  };
  const onUserLeftA = (id:any) => {
    console.log(id + ' user left');
    // dispatch(actionParticipantDidLeaveMeeting(id));
  };

  const onDisplayNameChanged = (participantId:any, displayName:any) => {
    console.log(`onDisplayNameChanged: ${participantId} - ${displayName}`);
    // if (participantId !== room?.myUserId()) {
    //   dispatch(actionUpdateRemoteDisplayName(participantId, displayName));
    // }
  };

  const onEndpointMessage = (_:any, payload:any) => {
    // dispatch(actionDidReceiveEndpointMessage(payload));
  };

  const onTrackMuteChanged = (track:any) => {
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
    if (stats?.connectionQuality < 10) {
      logJitsiEvent('LOW_CONNECTION_QUALITY', {
        conference,
        participantId: room?.myUserId()
      });
    }
    // dispatch(actionUpdateMeetingStats(stats));
  };


  const onDominantSpeakerChanged = (id: string) => {
    // if (enteredMeetingFromLounge) {
    //   dispatch(actionDidChangeDominantSpeaker(id));
    // }
  };

  const onParticipantStatusChanged = (
    participantId: string,
    status: JitsiConnectionStatus
  ) => {
    // dispatch(actionDidChangeConnectionStatus({ participantId, status }));
    logEvent(
      'DID_CHANGE_PARTICIPANT_CONN_STATUS',
      'DID_CHANGE_PARTICIPANT_CONN_STATUS',
      { participantId, status }
    );
  };

  const onLastNEndpointChange = (
    leavingEndpointIds: string[],
    enteringEndpointIds: string[]
  ) =>
    logJitsiEvent('LAST_N_ENDPOINTS_CHANGED', {
      leavingEndpointIds,
      enteringEndpointIds
    });
  const onSubjectChange = (subject: string) =>
    logJitsiEvent('SUBJECT_CHANGED', { subject });
  const onConferenceLeft = () => logJitsiEvent('CONFERENCE_LEFT');
  const onConferenceUniqueIdSet = (meetingId: string) =>
    logJitsiEvent('CONFERENCE_UNIQUE_ID_SET', { meetingId });
  const onDMTFSupportChanged = (support: boolean) =>
    logJitsiEvent('DTMF_SUPPORT_CHANGED', { support });
  const onUserRoleChanged = (id: string, role: string) =>
    logJitsiEvent('USER_ROLE_CHANGED', { id, role });
  const onUserStatusChanged = (id: string, status: string) =>
    logJitsiEvent('USER_STATUS_CHANGED', { id, status });
  const onConferenceFailed = (errorCode: string) =>
    logJitsiEvent('CONFERENCE_FAILED', { errorCode });
  const onConferenceError = (errorCode: string) =>
    logJitsiEvent('CONFERENCE_ERROR', { errorCode });
  const onUserKicked = (actorParticipant: JitsiParticipant, reason: string) =>
    logJitsiEvent('KICKED', { actorParticipant, reason });
  const onParticipantKicked = (
    actorParticipant: JitsiParticipant,
    kickedParticipant: JitsiParticipant,
    reason: string
  ) =>
    logJitsiEvent('PARTICIPANT_KICKED', {
      actorParticipant,
      kickedParticipant,
      reason
    });
  const onStartMutedPolicyChanged = (policy: {
    audio: boolean;
    video: boolean;
  }) => logJitsiEvent('START_MUTED_POLICY_CHANGED', policy);
  const onStartedMuted = () => logJitsiEvent('STARTED_MUTED');
  const onNoAudioInput = () => logJitsiEvent('NO_AUDIO_INPUT');
  const onAudioInputStateChange = () =>
    logJitsiEvent('AUDIO_INPUT_STATE_CHANGE');
  const onRestarted = () => logJitsiEvent('CONFERENCE_RESTARTED');
  const onVideoBridgeNotAvailable = () =>
    logJitsiEvent('VIDEOBRIDGE_NOT_AVAILABLE');
  const onReservationError = () => logJitsiEvent('RESERVATION_ERROR');
  const onGracefulShutdown = () => logJitsiEvent('GRACEFUL_SHUTDOWN');
  const onJingleFatalError = (error:any) =>
    logJitsiEvent('INCOMPATIBLE_SERVER_VERSIONS', { error });
  const onConferenceDistroyed = () => logJitsiEvent('CONFERENCE_DESTROYED');
  const onConferenceMaxUser = () => logJitsiEvent('CONFERENCE_MAX_USERS');
  const onDataChannelOpen = () => {
    // dispatch(actionBridgeChannelOpened());
  };
  const roomListener = (status: 'on' | 'off') => {
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
      [JitsiConferenceEvents.CONFERENCE_JOINED]: onConferenceJoinedA,
      [JitsiConferenceEvents.USER_JOINED]: onUserJoined,
      [JitsiConferenceEvents.USER_LEFT]: onUserLeftA,
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
      [JitsiConferenceErrors.CONFERENCE_MAX_USERS]: onConferenceMaxUser
    };
    for (const event in listeners) {
      room[status](event, listeners[event]);
    }
  };










  React.useEffect(() => {
    if (connection) joinRoom();
  }, [connection]);
  React.useEffect(() => {
    if (!room ) return;
    roomListener('on');
    return () => {
      room && roomListener('off');
    };
  }, [room]);
  /****************************************************** */

  return (
    <div>
      <button onClick={() => initJitsi()}>initJitsi</button>
    </div>
  );
};

export default Meeting;
