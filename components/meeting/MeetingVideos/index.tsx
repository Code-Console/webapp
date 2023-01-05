import React from "react";
import {
  IMeetingLocalUser,
  IMeetingRemoteUsers,
} from "../../../interfaces/meeting";
import VideosContainer from "./VideosContainer";
const MeetingVideos = ({
  remoteUsers,
  localUser,
}: {
  remoteUsers?: IMeetingRemoteUsers;
  localUser?: IMeetingLocalUser;
}) => {
  return (
    <>
      <VideosContainer
        meetingLayout={{}}
        remoteUsers={remoteUsers || {}}
        localUser={localUser || {}}
        canControlMeeting={true}
      />
    </>
  );
};

export default MeetingVideos;
