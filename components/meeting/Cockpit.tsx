import React from "react";
import { MeetingContext } from "./MeetingContext";
import MeetingLayoutWrapper from "./MeetingLayout";
import Lounge from "./Lounge";
import MeetingVideos from "./MeetingVideos";
import MeetingUI from "./MeetingUI";
const Cockpit = ({
  joinMeeting,
  meetingId,
}: {
  joinMeeting: (meetingId: string) => void;
  meetingId?: string;
}) => {
  const { localUser, remoteUsers } = React.useContext(MeetingContext);
  return (
    <MeetingLayoutWrapper>
      <MeetingVideos localUser={localUser} remoteUsers={remoteUsers} />
      {meetingId ? <MeetingUI /> : <Lounge joinMeeting={joinMeeting} />}
    </MeetingLayoutWrapper>
  );
};

export default Cockpit;
