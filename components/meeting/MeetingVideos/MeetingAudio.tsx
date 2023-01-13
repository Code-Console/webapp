import React from 'react';

const MeetingAudio = ({
  audioRef
}: {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}) => {
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.srcObject = null;
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      }
    }
  }, []);
  return <audio autoPlay className="remote-audio" ref={audioRef} />;
};

export default MeetingAudio;
