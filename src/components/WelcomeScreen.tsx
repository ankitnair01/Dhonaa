import React from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      {/* Glowing background orb */}
      <div className="absolute w-72 h-72 rounded-full bg-love-glow opacity-20 animate-gentle-glow -z-10" />

      <div className="animate-fade-in-up">
        <span className="text-6xl md:text-8xl block mb-6 animate-pulse-heart">💕</span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 text-glow leading-tight">
          Hi Mamalu
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          Anku made something special just for you.
        </p>
        <button
          onClick={onStart}
          className="font-body font-semibold text-lg md:text-xl px-10 py-4 rounded-full bg-gradient-button text-primary-foreground shadow-glow hover:bg-gradient-button-hover hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Start the Game 🎮
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
