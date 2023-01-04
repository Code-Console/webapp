import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMainState } from "../../interfaces";
import { MeetingRole } from "../../interfaces/meeting";
import {
  DID_LEAVE_MEETING,
} from "../../redux/action/meeting";
import { MeetingContext } from "./MeetingContext";
import MeetingLayoutWrapper from "./MeetingLayout";
import MeetingVideos from "./MeetingVideos";
const Cockpit = () => {
  const router = useRouter();
  const meetingId = (
    router.query.meeting as string | undefined
  )?.toLowerCase() as string;
  const dispatch = useDispatch();

  const clientState = useSelector(
    (state: IMainState) => state.clientState || {}
  );

  const meeting = clientState?.meeting;
  const controlParticipant = meeting?.participantControls;
  const [showStudioGrid, setShowStudioGrid] = React.useState(false);

  const localTracks = meeting.localUser?.tracks || [];
  const localRole = meeting.localUser?.role;
  const isSharingScreen = meeting.localUser?.isSharingScreen;

  const studioParticipantId = Object.keys(meeting.remoteUsers || {}).find(
    (participantId) =>
      (meeting.remoteUsers || {})[participantId]?.role === MeetingRole.STUDIO
  );

  const { room, onDisconnect, setUserName } = React.useContext(MeetingContext);

  const onStop = () => {
    onDisconnect(DID_LEAVE_MEETING, meetingId);
  };

  return (
    <MeetingLayoutWrapper>
      <MeetingVideos meeting={meeting} showStudioGrid={showStudioGrid} />
    </MeetingLayoutWrapper>
  );
};

export default Cockpit;
