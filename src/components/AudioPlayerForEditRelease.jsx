import { useRef, useState, useEffect } from 'react';
import { CirclePlay, CirclePause } from 'lucide-react';
import { cdnLink } from '../hooks/cdnLink';

const formatTime = (time) => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const AudioPlayerForEditRelease = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current);
      setProgress(100);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const updateProgress = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent || 0);
    setCurrentTime(audio.currentTime);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      if (audio.ended) audio.currentTime = 0;
      audio.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
  const bar = progressBarRef.current;
  const rect = bar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  const newTime = (clickX / width) * audioRef.current.duration;
  audioRef.current.currentTime = newTime;
  setCurrentTime(newTime);

  // 👉 manually update progress if paused
  if (!isPlaying) {
    const percent = (newTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  }
};


  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      minWidth: '150px',
      margin: '20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <audio ref={audioRef} src={cdnLink(audioSrc)} preload="metadata" />

      <button
        onClick={togglePlay}
        style={{
          fontSize: '24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isPlaying ? <CirclePause /> : <CirclePlay />}
      </button>

      {/* Duration */}
      <div style={{ fontSize: '14px', minWidth: '60px' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        onClick={handleProgressClick}
        style={{
          flex: 1,
          height: '10px',
          backgroundColor: '#ddd',
          borderRadius: '5px',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        {/* Filled Bar */}
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#EA3958',
            borderRadius: '5px',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'none', // no transition to ensure frame-based update
          }}
        ></div>

        {/* Dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `calc(${progress}% - 7.5px)`,
            transform: 'translateY(-50%)',
            width: '15px',
            height: '15px',
            backgroundColor: '#EA3958',
            borderRadius: '50%',
            pointerEvents: 'none',
            border: '1px solid white',
          }}
        ></div>
      </div>
    </div>
  );
};

export default AudioPlayerForEditRelease;
