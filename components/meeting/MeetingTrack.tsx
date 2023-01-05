import React from "react";
import { useDispatch } from "react-redux";
import { IMeetingRemoteUsers } from "../../interfaces/meeting";
import { jitsiConfig } from "./config";
import tryConnect from "./connection";
import { MeetingContext } from "./MeetingContext";

const MeetingTrack = () => {
  const dispatch = useDispatch();
  let isJoined = false;
  const {
    connection,
    room,
    setConnection,
    setRoom,
    localTracks,
    setLocalTracks,
    remoteUsers,
    setRemoteUsers,
    updateRemoteUsers,
  } = React.useContext(MeetingContext);
  function onConferenceJoined() {
    console.error("conference joined!", localTracks?.length);
    isJoined = true;
    for (let i = 0; localTracks && i < localTracks?.length; i++) {
      room?.addTrack(localTracks[i]);
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
    // for (let i = 0; tracks && i < tracks?.length; i++) {
    //   // tracks[i].detach($(`#${id}${tracks[i].getType()}`));
    // }
  }
  function onRemoteTrack(track: any) {
    console.error("onRemoteTrack~~!!~~~", track.getType());
    if (track.isLocal()) {
      return;
    }
    updateRemoteUsers(track);
    
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
    // const id = participantId + track.getType() + idx;

    // if (track.getType() === "video") {
    //   $("#video-ele").append(
    //     `<video autoplay='1' id='${participant}video${idx}' class='video-back'/>`
    //   );
    // } else {
    //   $("#video-ele").append(
    //     `<audio autoplay='1' id='${participant}audio${idx}' />`
    //   );
    // }
    console.error("onRemoteTrack~~~~~", remoteUsers);
    setTimeout(() => {
      // setVideo();
    }, 300);
    // track.attach($(`#${id}`)[0]);
  }
  const joinRoom = () => {
    console.error("~~~a~~");
    const room = connection.initJitsiConference("conference", {});
    setRoom(room);
    room.join();
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
    room.on(
      JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
      (userID: any, audioLevel: any) => console.log(`${userID} - ${audioLevel}`)
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
      .catch((e: any) => {
        return null;
      })
      .then((tracks: any) => {
        console.error("~~~~~~~~~~~~~~~", tracks);
        // dispatch(actionDidAddLocalTrack(tracks));
        setLocalTracks(tracks);
      });
  };
  const initMeeting = () => {
    try {
      console.log("jitsiConfig~~~~~~~~~~~~", jitsiConfig);
      JitsiMeetJS.init(jitsiConfig);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
      const facingMode = "user";
      const constraints = undefined;
      createLocalTracks(facingMode, constraints)
        .catch((e) => {
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
  React.useEffect(() => {
    console.error("loacal?.length~~~~~~~~~~", localTracks?.length);
  }, [localTracks]);
  React.useEffect(() => {
    if (connection) joinRoom();
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
      <button onClick={() => initMeeting()}>initJitsi</button>
      <button onClick={() => console.error("~~~~~~RemoteUsers", remoteUsers)}>
        remoteUsers
      </button>
    </div>
  );
};

export default MeetingTrack;
