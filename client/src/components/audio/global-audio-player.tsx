import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  X
} from "lucide-react";
import { useAudio } from "@/contexts/audio-context";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function GlobalAudioPlayer() {
  const {
    currentSermon,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    skipBackward,
    skipForward,
    seekTo,
    setVolume,
    toggleMute,
    dismissPlayer,
  } = useAudio();

  // Don't render if no sermon is loaded
  if (!currentSermon) {
    return null;
  }

  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50" data-testid="global-audio-player">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Sermon Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {currentSermon.imageUrl && (
              <img
                src={currentSermon.imageUrl}
                alt={currentSermon.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                data-testid="img-global-sermon-thumbnail"
              />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground truncate" data-testid="text-global-sermon-title">
                {currentSermon.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate" data-testid="text-global-sermon-speaker">
                {currentSermon.speaker}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 mx-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={skipBackward}
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              data-testid="button-global-skip-backward"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              onClick={togglePlay}
              className="bg-accent hover:bg-accent/90 text-accent-foreground h-8 w-8 rounded-full"
              data-testid="button-global-play-pause"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={skipForward}
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              data-testid="button-global-skip-forward"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap" data-testid="text-global-current-time">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
              data-testid="slider-global-progress"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap" data-testid="text-global-duration">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume & Dismiss */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              data-testid="button-global-volume-toggle"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-16 hidden sm:block"
              data-testid="slider-global-volume"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissPlayer}
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              data-testid="button-global-dismiss"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}