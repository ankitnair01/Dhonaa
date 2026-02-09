import React, { useState, useEffect } from "react";

interface TreasureHuntScreenProps {
  onNext: () => void;
}

const lines = [
  "I didn't want to just give you your Valentine's gift…",
  "I wanted you to find it.",
  "",
  "So here's your hint:",
  "",
  "It's put in a cover and kept above the Almira ❤️",
];

const TreasureHuntScreen: React.FC<TreasureHuntScreenProps> = ({ onNext }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowButton(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="absolute w-80 h-80 rounded-full bg-love-glow opacity-10 animate-gentle-glow -z-10" />

      <div className="max-w-md mx-auto">
        <span className="text-5xl block mb-8 animate-pulse-heart">🗺️</span>
        {lines.slice(0, visibleLines).map((line, i) => (
          <p
            key={i}
            className={`font-body text-lg md:text-xl mb-4 animate-fade-in-up ${
              i === lines.length - 1
                ? "font-display text-2xl md:text-3xl text-love-pink text-glow mt-6"
                : line === ""
                ? "h-4"
                : "text-foreground"
            }`}
          >
            {line}
          </p>
        ))}

        {showButton && (
          <button
            onClick={onNext}
            className="mt-8 font-body font-semibold text-base px-8 py-4 rounded-full bg-gradient-button text-primary-foreground shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in-up"
          >
            One last thing... 💕
          </button>
        )}
      </div>
    </div>
  );
};

export default TreasureHuntScreen;
