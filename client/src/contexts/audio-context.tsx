import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import type { Sermon } from "@shared/schema";

interface AudioState {
  currentSermon: Sermon | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

interface AudioContextType extends AudioState {
  playSermon: (sermon: Sermon) => void;
  togglePlay: () => void;
  pause: () => void;
  skipBackward: () => void;
  skipForward: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  dismissPlayer: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [audioState, setAudioState] = useState<AudioState>({
    currentSermon: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setAudioState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setAudioState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioState.currentSermon]);

  const playSermon = (sermon: Sermon) => {
    const audio = audioRef.current;
    if (!audio) return;

    // If it's a new sermon, reset time
    if (audioState.currentSermon?.id !== sermon.id) {
      setAudioState(prev => ({
        ...prev,
        currentSermon: sermon,
        currentTime: 0,
        duration: sermon.duration || 0,
      }));
      audio.src = sermon.audioUrl;
      audio.currentTime = 0;
    }

    audio.play();
    setAudioState(prev => ({ ...prev, isPlaying: true }));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audioState.currentSermon) return;

    if (audioState.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    setAudioState(prev => ({ ...prev, isPlaying: false }));
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.max(0, audio.currentTime - 15);
    audio.currentTime = newTime;
    setAudioState(prev => ({ ...prev, currentTime: newTime }));
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.min(audioState.duration, audio.currentTime + 15);
    audio.currentTime = newTime;
    setAudioState(prev => ({ ...prev, currentTime: newTime }));
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    setAudioState(prev => ({ ...prev, currentTime: time }));
  };

  const setVolume = (volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setAudioState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
    audio.volume = volume / 100;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (audioState.isMuted) {
      audio.volume = audioState.volume / 100;
      setAudioState(prev => ({ ...prev, isMuted: false }));
    } else {
      audio.volume = 0;
      setAudioState(prev => ({ ...prev, isMuted: true }));
    }
  };

  const dismissPlayer = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setAudioState({
      currentSermon: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: audioState.volume,
      isMuted: audioState.isMuted,
    });
  };

  return (
    <AudioContext.Provider value={{
      ...audioState,
      playSermon,
      togglePlay,
      pause,
      skipBackward,
      skipForward,
      seekTo,
      setVolume,
      toggleMute,
      dismissPlayer,
      audioRef,
    }}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        className="hidden"
        data-testid="global-audio-element"
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}