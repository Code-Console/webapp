import React from "react";

const MeetingVideo = ({
  videoRef,
  onPlaying,
  participantId,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  onPlaying?: () => void;
  participantId: string;
}) => {
  React.useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, []);
  return (
    <>
      <video
        muted={true}
        autoPlay
        playsInline
        className={`remote-video`}
        ref={videoRef}
        onCanPlay={() => {
          console.log("remote video: now can play");
        }}
        onPlaying={(e) => {
          console.log(e);
          console.log("remote video: is playing");
          onPlaying?.();
        }}
        id={`remote-video-${participantId}`}
      ></video>
      <style jsx>
        {`
          .remote-video {
            width: 128px;
          }
        `}
      </style>
    </>
  );
};

export default MeetingVideo;
