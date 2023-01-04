import React from "react";
import { useDispatch } from "react-redux";
import { IMeeting } from "../../../interfaces";

import { MeetingContext } from "../MeetingContext";
import VideosContainer from "./VideosContainer";
const MeetingVideos = ({
  meeting,
  showStudioGrid,
}: {
  meeting: IMeeting;
  showStudioGrid?: boolean;
}) => {
  const dispatch = useDispatch();
  const localRole = meeting.localUser?.role;

  const { room } = React.useContext(MeetingContext);

  return (
    <>
      <VideosContainer
        meetingLayout={{}}
        remoteUsers={meeting?.remoteUsers || {}}
        localUser={meeting?.localUser || {}}
        canControlMeeting={true}
      />
    </>
  );
};

export default MeetingVideos;
