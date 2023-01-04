import React from "react";
import Meeting from "../components/meeting";
import MeetingContextContainer from "../components/meeting/MeetingContext";
import Styles from "../components/Styles";
import HTMLMeetingHeader from "../components/UI/HTMLMeetingHeader";

const Meet = () => {
  return (
    <>
      <HTMLMeetingHeader />
      <MeetingContextContainer>
        <Meeting />
      </MeetingContextContainer>

      <Styles />
    </>
  );
};

export default Meet;
