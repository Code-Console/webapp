import React from "react";
import { useSelector } from "react-redux";
import { IMainState } from "../../../interfaces";
import { JitsiRemoteTrack, MeetingRole } from "../../../interfaces/meeting";
import MeetingAudio from "./MeetingAudio";
import MeetingVideo from "./MeetingVideo";

const RemoteVideo = ({
  participantId,
  showGrid,
}: {
  participantId: string;
  showGrid?: boolean;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>() as any;
  const audioRef = React.useRef<HTMLAudioElement>() as any;
  const meeting = useSelector(
    (state: IMainState) => state.clientState.meeting || {}
  );
  const participantInfo = (meeting.remoteUsers || {})[participantId] || {};
  const selected = meeting?.participantControls === participantId;
  const role = participantInfo.role;

  const isInterrupted = participantInfo.connectionStatus === "interrupted";

  const isDominantSpeaker =
    meeting?.dominantSpeakerParticipantId === participantId;

  const isRaisingHand = (meeting?.raiseHand?.participantIds || []).includes(
    participantId
  );

  const displayName = participantInfo.displayName;

  const [isGhostUser, setIsGhostUser] = React.useState(false);
  const tracks: JitsiRemoteTrack[] = participantInfo.tracks || [];

  const audioTrack = tracks.find((track) => track.getType() === "audio");
  const videoTrack = tracks.find((track) => track.getType() === "video");
  const audioMuted = participantInfo.audioMuted || !audioTrack;
  const videoMuted = participantInfo.videoMuted || !videoTrack;

  const isAddingTracks = tracks.length === 0;

  const getScaleSize = () => {
    return 1;
  };
  const getRotateDeg = () => {
    return 0;
  };

  const isSharingScreen = videoTrack?.videoType === "desktop";

  React.useEffect(() => {
    if (videoTrack && videoTrack.getOriginalStream() && videoRef.current) {
      console.group("track and original stream");
      console.log(videoTrack);
      console.log(videoTrack.getOriginalStream());
      console.groupEnd();
      (videoRef.current as HTMLVideoElement).setAttribute("muted", "");
      (videoRef.current as HTMLVideoElement).setAttribute("playsInline", "");
      (videoRef.current as HTMLVideoElement).setAttribute("autoplay", "");
      videoTrack.attach(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        videoTrack?.detach(videoRef.current);
      }
    };
  }, [videoTrack, videoMuted]);

  React.useEffect(() => {
    if (audioTrack && audioRef.current) {
      if (
        meeting.localUser?.role !== MeetingRole.STUDIO &&
        participantInfo.role !== MeetingRole.STUDIO
      ) {
        audioTrack.attach(audioRef.current);
      }
    }
    return () => {
      if (audioRef.current) {
        audioTrack?.detach(audioRef.current);
      }
    };
  }, [audioTrack, audioMuted]);

  React.useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (isInterrupted) {
      timeoutId = setTimeout(() => {
        setIsGhostUser(true);
      }, 30000);
    } else {
      setIsGhostUser(false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInterrupted]);

  if (isGhostUser) return null;

  return (
    <div
      className={`remote-video-container video-thumbnail`}
      id={`video-${participantId}`}
    >
      {!videoMuted ? (
        <MeetingVideo videoRef={videoRef} />
      ) : (
        <div className="remote-video place-holder"></div>
      )}

      {!audioMuted && <MeetingAudio audioRef={audioRef} />}

      {displayName && (
        <div className="display-name notranslate">{displayName}</div>
      )}

      <div className="highlight-box" />
      {showGrid && (
        <>
          <div className="grid-line line-vertical" />
          <div className="grid-line line-horizontal" />
        </>
      )}

      <style jsx>
        {`
          .loading {
            font-size: 1rem;
          }
          .display-name {
            user-select: none;
          }

          .initialName {
            z-index: ${videoMuted ? 2 : 0};
          }

          .remote-video-container.highlight .initialName {
            opacity: 1;
          }

          .enlarge-close {
            z-index: 9;
          }
          .video-thumbnail.isSharingScreen :global(video) {
            object-fit: contain !important;
          }
          .video-thumbnail.isStudio :global(video) {
            transform: scale(${getScaleSize() || 1})
              rotate(${getRotateDeg() || 0}deg);
          }
        `}
      </style>
    </div>
  );
};

export default RemoteVideo;
