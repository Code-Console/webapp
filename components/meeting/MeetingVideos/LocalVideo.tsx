import React from "react";
import { useSelector } from "react-redux";
import { IMainState } from "../../../interfaces";

const LocalVideo = ({ showGrid }: { showGrid?: boolean }) => {
  const localVideoRef = React.useRef() as any;
  const meeting = useSelector(
    (state: IMainState) => state.clientState.meeting || {}
  );
  const displayName = useSelector(
    (state: IMainState) => state.clientState.user?.name
  );
  const localTracks = meeting.localUser?.tracks || [];
  const isSharingScreen = meeting.localUser?.isSharingScreen;
  const videoEffect = meeting.localUser?.videoEffect;
  const localVideoTrack = localTracks.find(
    (track) => track.getType() === "video"
  );

  const audioMuted = meeting?.localUser?.audioMuted;
  const videoMuted = meeting?.localUser?.videoMuted;

  React.useEffect(() => {
    localVideoTrack?.attach(localVideoRef.current);
    return () => {
      localVideoRef.current && localVideoTrack?.detach(localVideoRef.current);
    };
  }, [localVideoTrack]);

  return (
    <div
      className={`local-video-container video-thumbnail`}
      id={`video-${meeting.localUser?.participantId}`}
    >
      <video
        autoPlay
        playsInline
        ref={localVideoRef}
        id="local-video"
        className="local-video"
      ></video>

      <div className="display-name notranslate">
        {displayName}
      </div>
      <div className="highlight-box" />
      {showGrid && (
        <>
          <div className="grid-line line-vertical" />
          <div className="grid-line line-horizontal" />
        </>
      )}
      <style jsx>
        {`
          video {
            background: ${localVideoTrack ? "transparent" : "#333"};
            object-fit: ${isSharingScreen ? "contain" : "cover"} !important;
            visibility: ${videoMuted ? "hidden" : "visible"};
          }

          .display-name {
            display: block;
            text-decoration: ${!displayName ? "underline" : "none"};
          }

          .enlarge .display-name-edit,
          :global(.meeting-lounge) .display-name {
            display: none;
          }

          .initialName {
            z-index: ${videoMuted ? 2 : 0};
          }
          .local-video-container.highlight .initialName {
            opacity: 1;
          }

          .local-video-container:hover .display-name {
            overflow: visible;
            text-shadow: 0 0 2px #000;
          }
          .virtual-bg-dialog {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
          .virtual-background-button {
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 13;
          }
        `}
      </style>
    </div>
  );
};

export default LocalVideo;
