import React from "react";
import { jitsiConfig } from "./config";
import tryConnect from "./connection";
import { JitsiConnection, JitsiMeetingRoom } from "./MeetingContainer";

const Meeting = () => {
  const meetingId = "meetingid";
  const [connection, setConnection] = React.useState<JitsiConnection>();
  const [room, setRoom] = React.useState<JitsiMeetingRoom>();

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
        //setState({ ...state, jitsiLocalTrack: tracks });
      });
  };
  const initMeeting = () => {
    try {
      JitsiMeetJS.init(jitsiConfig);

      createLocalTracks("user", undefined)
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
      console.log("error invoking JitsiMeetJS init");
      console.log(e);
    }
  };
  const onRemoteTrack = (track: any) => {
    console.log("onRemoteTrack", track);
  };
  const onConferenceJoined = (track: any) => {
    console.log("onConferenceJoined", track);
  };
  const joinRoom = async () => {
    console.log("joinRoom~~~~~~~~~~~~~~~");
    if (!room) {
      const room = connection.initJitsiConference(meetingId, jitsiConfig);
      room.setLocalParticipantProperty("meetingState", "IN_THE_LOUNGE");

      room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
      room.on(
        JitsiMeetJS.events.conference.CONFERENCE_JOINED,
        onConferenceJoined
      );
      room.join();
      window["room"] = room;
      setRoom(room);
    }
  };
  React.useEffect(() => {
    initMeeting();
  }, []);
  React.useEffect(() => {
    console.log(connection);
    if (connection) joinRoom();
  }, [connection]);
  return (
    <div>
      <button onClick={initMeeting}></button>
    </div>
  );
};

export default Meeting;
