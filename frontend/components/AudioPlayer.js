'use client';

import { useState, useRef, useEffect } from 'react';

const songs = [
  { id: 1, name: 'Smells Like Teen Spirit', file: '/audio/smells-like-teen-spirit.mp3' },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            const playOnClick = () => {
              audioRef.current?.play().then(() => setIsPlaying(true));
              document.removeEventListener('click', playOnClick);
            };
            document.addEventListener('click', playOnClick);
          });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }
    }
  }, [currentSongIndex]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={currentSong.file} type="audio/mpeg" />
      </audio>

      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 40,
          pointerEvents: 'none'
        }}
      >
        <button
          onClick={toggleAudio}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
            background: isPlaying 
              ? 'linear-gradient(135deg, #8b0000 0%, #5a0000 100%)'
              : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            borderColor: isPlaying ? '#ff0000' : '#444',
            boxShadow: isPlaying 
              ? '0 0 30px rgba(255, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)'
              : '0 8px 16px rgba(0, 0, 0, 0.4)',
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm8 0a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
