import React from "react";
import {
  IMeetingLocalUser,
  IMeetingRemoteUsers,
  MeetingLayout,
  MeetingRole,
} from "../../../interfaces/meeting";
import { MeetingContext } from "../MeetingContext";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";

const VideosContainer = ({
  meetingLayout = {},
  remoteUsers = {},
  localUser,
  canControlMeeting,
}: {
  meetingLayout?: MeetingLayout;
  remoteUsers?: IMeetingRemoteUsers;
  localUser: IMeetingLocalUser;
  canControlMeeting?: boolean;
}) => {
  const { room } = React.useContext(MeetingContext);
  const myId = room?.myUserId() as string;
  const presenterIds = meetingLayout?.presenterIds || [];
  const enlargedVideoParticipantId = meetingLayout?.enlargedVideoParticipantId;
  const isInFullScreenMode = !!enlargedVideoParticipantId;
  const pinnedParticipants = meetingLayout?.pinnedParticipantIds || [];
  const isPresentationLayout = false;
  const notInvisibleParticipantInPresentation = (participantId: string) => {
    const shouldHide =
      participantId !== myId &&
      !canControlMeeting &&
      meetingLayout?.invisibleParticipantIds?.includes(participantId);

    return !shouldHide;
  };

  const notPresenterAndEnlargedParticipantInPresentation = (
    participantId: string
  ) => {
    return (
      participantId !== meetingLayout?.enlargedVideoParticipantId &&
      !presenterIds.includes(participantId)
    );
  };

  const shouldShowLocalVideo = () => {
    if (isInFullScreenMode) {
      return (
        localUser?.participantId !== enlargedVideoParticipantId &&
        !presenterIds?.includes(localUser?.participantId as string)
      );
    }
    if (isPresentationLayout) {
      return notPresenterAndEnlargedParticipantInPresentation(myId);
    }
    return true;
  };
  const shouldShowRemoteVideo = (participantId: string) => {
    if (
      !canControlMeeting &&
      meetingLayout?.invisibleParticipantIds?.includes(participantId)
    ) {
      return false;
    }
    if (isInFullScreenMode) {
      return participantId !== enlargedVideoParticipantId;
    }
    return true;
  };

  const shouldShowRemoteVideoInPresentation = (participantId: string) => {
    return (
      notInvisibleParticipantInPresentation(participantId) &&
      notPresenterAndEnlargedParticipantInPresentation(participantId) &&
      remoteUsers[participantId]?.role !== MeetingRole.STUDIO
    );
  };

  const remoteUsersVideo = (pinned?: boolean) => {
    return Object.keys(remoteUsers)
      .filter(
        (participantId) =>
          remoteUsers[participantId]?.shouldShowVideo &&
          remoteUsers[participantId].role !== MeetingRole.STUDIO
      )
      .filter((participantId) =>
        pinned
          ? pinnedParticipants.includes(participantId)
          : !pinnedParticipants.includes(participantId)
      )
      .filter(
        isPresentationLayout
          ? shouldShowRemoteVideoInPresentation
          : shouldShowRemoteVideo
      )
      .map((participantId) => (
        <RemoteVideo participantId={participantId} key={participantId} />
      ));
  };
  const presenterVideosComponent = (
    <>
      {myId &&
        presenterIds?.includes(myId) &&
        meetingLayout?.enlargedVideoParticipantId !== myId && <LocalVideo />}
      {presenterIds
        .filter(
          (participantId) =>
            participantId !== meetingLayout?.enlargedVideoParticipantId
        )
        .filter((participantId) => participantId !== myId)
        .filter(notInvisibleParticipantInPresentation)
        .map((participantId) => (
          <RemoteVideo participantId={participantId} key={participantId} />
        ))}
    </>
  );

  const localVideoComponent = shouldShowLocalVideo() && (
    <div id="local-wrapper">
      <LocalVideo />
    </div>
  );

  const participantVideosComponent = (
    <>
      {remoteUsersVideo(true)}
      {remoteUsersVideo()}
    </>
  );
  const totalVideos = React.useMemo(
    () =>
      Object.keys(remoteUsers)
        .filter(
          (participantId) =>
            remoteUsers[participantId]?.shouldShowVideo &&
            remoteUsers[participantId]?.role !== MeetingRole.STUDIO
        )
        .filter(shouldShowRemoteVideo).length + 1,
    [remoteUsers]
  );

  return (
    <>
      {isPresentationLayout && localVideoComponent}
      <div id="videos-wrapper">
        <div className="scroll-container">
          {isPresentationLayout && (
            <div id="presenter-wrapper">{presenterVideosComponent}</div>
          )}
          <div id="participant-wrapper">
            {!isPresentationLayout && localVideoComponent}
            {participantVideosComponent}
          </div>
        </div>
      </div>
      <div className="video-wrapper-bg" />

      <style jsx>{`
        #videos-wrapper {
          position: fixed;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

export default VideosContainer;
