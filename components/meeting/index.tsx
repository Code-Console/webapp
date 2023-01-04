import React from "react";
import { jitsiConfig } from "./config";
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
  const { setConnection, setRoom } = React.useContext(MeetingContext);
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
        room.addTrack(localTracks[i]);
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
      room.addTrack(localTracks[i]);
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
    setRoom(room)
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
    room.leave();
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
        room.addTrack(localTracks[1]);
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

  return (
    <div>
      <button onClick={initJitsi}>initJitsi</button>
    </div>
  );
};

export default Meeting;
