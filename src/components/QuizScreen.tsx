import React, { useState, useEffect, useCallback } from "react";

interface QuizScreenProps {
  onComplete: () => void;
}

const options = ["Friend 👩", "Not Anku 👨", "Koi aurr 👫", "Anku ❤️"];

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [flyingAnkus, setFlyingAnkus] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([]);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  const handleOption = useCallback((option: string) => {
    if (option === "Anku ❤️") {
      setCorrect(true);
      setWrongAnswer(false);
      // Create confetti
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ["❤️", "💕", "💖", "💗", "💓", "🩷"][Math.floor(Math.random() * 6)],
      }));
      setConfetti(newConfetti);
      setTimeout(onComplete, 2500);
    } else {
      setWrongAnswer(true);
      // Spawn flying Ankus
      const newAnkus = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        rotation: Math.random() * 360,
      }));
      setFlyingAnkus((prev) => [...prev, ...newAnkus]);
    }
  }, [onComplete]);

  useEffect(() => {
    if (wrongAnswer) {
      const timer = setTimeout(() => setFlyingAnkus([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer, flyingAnkus.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10 overflow-hidden">
      {/* Confetti */}
      {confetti.map((c) => (
        <span
          key={c.id}
          className="fixed text-2xl animate-confetti z-30"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            top: "-5%",
          }}
        >
          {c.color}
        </span>
      ))}

      {/* Flying Ankus on wrong answer */}
      {flyingAnkus.map((anku) => (
        <span
          key={anku.id}
          className="fixed text-xl md:text-2xl font-display text-love-pink animate-bounce-random z-20 pointer-events-none animate-wiggle"
          style={{
            left: `${anku.x}%`,
            top: `${anku.y}%`,
          }}
        >
          Anku 💖
        </span>
      ))}

      <div className="animate-fade-in-up">
        {!correct ? (
          <>
            <span className="text-5xl block mb-6">🤔</span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8 text-glow">
              Who loves you the most?
            </h2>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOption(option)}
                  className="font-body font-semibold text-base md:text-lg px-6 py-4 rounded-2xl bg-card shadow-soft border border-border hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 text-foreground"
                >
                  {option}
                </button>
              ))}
            </div>
            {wrongAnswer && (
              <p className="mt-6 text-xl font-display text-love-pink animate-fade-in-up">
                Wrong 😌 Try again
              </p>
            )}
          </>
        ) : (
          <div className="animate-fade-in-up">
            <span className="text-6xl block mb-6 animate-pulse-heart">❤️</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground text-glow">
              Correct. Obviously ❤️
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
