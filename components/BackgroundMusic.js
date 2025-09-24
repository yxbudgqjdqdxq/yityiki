"use client";
import { useRef, useState, useEffect } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  // Fallback: start music when user clicks anywhere
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!playing && audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
      window.removeEventListener("click", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, [playing, volume]);

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />

      {/* Slider is always rendered above everything */}
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
            zIndex: 9999,
          }}
        />
      )}

      {/* Play button for first interaction */}
      {!playing && (
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.volume = volume;
              audioRef.current.play().catch(() => {});
              setPlaying(true);
            }
          }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 14px",
            borderRadius: "12px",
            background: "#ffb6c1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          Play Music
        </button>
      )}
    </>
  );
}