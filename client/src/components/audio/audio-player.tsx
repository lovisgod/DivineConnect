import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import type { Sermon } from "@shared/schema";

interface AudioPlayerProps {
  sermon: Sermon;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ sermon }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(sermon.duration || 0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 15);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume / 100;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume / 100;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 max-w-4xl mx-auto" data-testid="audio-player">
      <audio
        ref={audioRef}
        src={sermon.audioUrl}
        preload="metadata"
        className="hidden"
        data-testid="audio-element"
      />
      
      <div className="flex items-center space-x-4 mb-4">
        {sermon.imageUrl && (
          <img
            src={sermon.imageUrl}
            alt={sermon.title}
            className="w-16 h-16 rounded-full object-cover"
            data-testid="img-sermon-thumbnail"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-foreground" data-testid="text-sermon-title">
            {sermon.title}
          </h3>
          <p className="text-muted-foreground" data-testid="text-sermon-speaker">
            {sermon.speaker}
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-sermon-date">
            {new Date(sermon.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Progress Controls */}
      <div className="bg-muted rounded-lg p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span data-testid="text-current-time">{formatTime(currentTime)}</span>
            <span data-testid="text-duration">{formatTime(duration)}</span>
          </div>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
            data-testid="slider-progress"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={skipBackward}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-skip-backward"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            onClick={togglePlay}
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 rounded-full"
            data-testid="button-play-pause"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={skipForward}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-skip-forward"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-volume-toggle"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
              data-testid="slider-volume"
            />
          </div>
        </div>
      </div>

      {/* Message Description */}
      {sermon.description && (
        <div className="mt-4">
          <p className="text-muted-foreground" data-testid="text-sermon-description">
            {sermon.description}
          </p>
        </div>
      )}
    </div>
  );
}
