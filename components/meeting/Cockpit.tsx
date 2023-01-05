import React from "react";
import { MeetingContext } from "./MeetingContext";
import MeetingLayoutWrapper from "./MeetingLayout";
import MeetingVideos from "./MeetingVideos";
const Cockpit = () => {
  const { localUser, remoteUsers } = React.useContext(MeetingContext);
  return (
    <MeetingLayoutWrapper>
      <MeetingVideos localUser={localUser} remoteUsers={remoteUsers} />
    </MeetingLayoutWrapper>
  );
};

export default Cockpit;
