"use client"; // Needed if using Next.js 13 app directory
import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. Click the button to start music.");
      });
      setPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      
      {!playing && (
        <button
          onClick={handlePlay}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: "#ffb6c1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Play Music
        </button>
      )}

      {playing && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "120px",
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
}