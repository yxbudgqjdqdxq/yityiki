// components/BackgroundMusic.js
import { useRef, useState, useEffect } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // initial 50%

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        // browsers may block autoplay until user interacts
      });
    }
  }, [volume]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/bg-music.mp3"
        loop
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '120px',
          cursor: 'pointer',
          zIndex: 9999,
          accentColor: '#ff8cd4', // pastel pink handle
        }}
      />
    </>
  );
}