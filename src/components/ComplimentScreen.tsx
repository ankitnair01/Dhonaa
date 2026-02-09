import React, { useState } from "react";

interface ComplimentScreenProps {
  onNext: () => void;
}

const compliments = [
  "Your smile 🥹",
  "The way you make everything feel warm ☀️",
  "How you understand me without words 💫",
  "You are my favorite person 🌸",
  "Mamalu, you are my home ❤️",
  "Your laugh is my favorite sound 🎶",
  "The way your eyes light up 🌟",
  "How you make even ordinary days special ✨",
  "Your kindness makes the world better 🌍",
  "Everything about you, Mamalu 💕",
];

const ComplimentScreen: React.FC<ComplimentScreenProps> = ({ onNext }) => {
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const showCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(compliments[randomIndex]);
    setFadeKey((prev) => prev + 1);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="absolute w-64 h-64 rounded-full bg-love-lavender opacity-20 animate-gentle-glow -z-10" />

      <div className="animate-fade-in-up">
        <span className="text-5xl block mb-6">💖</span>
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8 text-glow">
          Why Anku loves you
        </h2>

        <div className="min-h-[100px] flex items-center justify-center mb-8">
          {currentCompliment && (
            <p
              key={fadeKey}
              className="text-xl md:text-2xl font-body text-foreground animate-fade-in-up max-w-md"
            >
              {currentCompliment}
            </p>
          )}
        </div>

        <button
          onClick={showCompliment}
          className="font-body font-semibold text-base md:text-lg px-8 py-4 rounded-full bg-gradient-button text-primary-foreground shadow-glow hover:bg-gradient-button-hover hover:scale-105 active:scale-95 transition-all duration-300 mb-6"
        >
          Click to see why Anku loves you 💖
        </button>

        {clickCount >= 3 && (
          <div className="animate-fade-in-up">
            <button
              onClick={onNext}
              className="block mx-auto mt-4 font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Continue to your surprise →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplimentScreen;
