import React, { useState, useEffect, useCallback } from "react";

interface CatchGameScreenProps {
  onComplete: () => void;
}

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

const CatchGameScreen: React.FC<CatchGameScreenProps> = ({ onComplete }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caught, setCaught] = useState(0);
  const [completed, setCompleted] = useState(false);
  const target = 5;

  const spawnHeart = useCallback(() => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 5,
      y: Math.random() * 60 + 15,
      size: Math.random() * 20 + 30,
      emoji: ["❤️", "💕", "💖", "💗", "🩷", "💓"][Math.floor(Math.random() * 6)],
    };
    setHearts((prev) => [...prev.slice(-6), newHeart]);
  }, []);

  useEffect(() => {
    if (completed) return;
    const interval = setInterval(spawnHeart, 1200);
    spawnHeart();
    return () => clearInterval(interval);
  }, [spawnHeart, completed]);

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    const newCaught = caught + 1;
    setCaught(newCaught);
    if (newCaught >= target) {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="animate-fade-in-up mb-8">
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4 text-glow">
          {completed ? "You unlocked something special 👀" : "Catch My Love! 💕"}
        </h2>
        {!completed && (
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: target }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-300 ${i < caught ? "scale-125" : "opacity-30 scale-90"}`}
              >
                {i < caught ? "❤️" : "🤍"}
              </span>
            ))}
          </div>
        )}
        {!completed && (
          <p className="font-body text-muted-foreground">
            Tap the hearts! {caught}/{target}
          </p>
        )}
      </div>

      {/* Game area */}
      {!completed && (
        <div className="relative w-full max-w-lg h-[50vh] rounded-3xl bg-card/50 border border-border overflow-hidden">
          {hearts.map((heart) => (
            <button
              key={heart.id}
              onClick={() => catchHeart(heart.id)}
              className="absolute transition-all duration-200 hover:scale-150 active:scale-75 cursor-pointer animate-pulse-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: `${heart.size}px`,
              }}
              aria-label="Catch this heart"
            >
              {heart.emoji}
            </button>
          ))}
        </div>
      )}

      {completed && (
        <span className="text-6xl animate-pulse-heart">🎁</span>
      )}
    </div>
  );
};

export default CatchGameScreen;
