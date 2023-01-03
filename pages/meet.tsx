import React from "react";
import Meeting from "../components/meeting";
import Styles from "../components/Styles";
import HTMLMeetingHeader from "../components/UI/HTMLMeetingHeader";

const Meet = () => {
  return (
    <>
      <HTMLMeetingHeader />
      <Meeting />
      <Styles />
    </>
  );
};

export default Meet;
