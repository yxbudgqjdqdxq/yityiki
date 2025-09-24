// components/BackgroundMusic.js
import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Start with a softer volume
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Effect to play music only after the first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      setIsPlaying(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Effect to control audio playback and volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying && hasInteracted) {
        audioRef.current.play().catch(error => console.log("Audio play prevented: ", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, hasInteracted]);


  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      <div className="music-player">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          className="play-button"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </>
  );
};

export default BackgroundMusic;

