import React from "react";
import MeetingContextContainer from "../components/meeting/MeetingContext";
import MeetingTrack from "../components/meeting/MeetingTrack";
import Styles from "../components/Styles";
import HTMLMeetingHeader from "../components/UI/HTMLMeetingHeader";

const Meet = () => {
  return (
    <>
      <HTMLMeetingHeader />
      <MeetingContextContainer>
        <MeetingTrack />
      </MeetingContextContainer>

      <Styles />
    </>
  );
};

export default Meet;
