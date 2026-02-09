import React from "react";

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gradient-button text-primary-foreground shadow-glow flex items-center justify-center hover:bg-gradient-button-hover transition-all duration-300 hover:scale-110 animate-pulse-heart"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <span className="text-lg">{isPlaying ? "🎵" : "🔇"}</span>
    </button>
  );
};

export default MusicControl;
