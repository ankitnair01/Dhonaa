import React, { useState, useEffect } from "react";

interface ProposalScreenProps {
  onNext: () => void;
}

const ProposalScreen: React.FC<ProposalScreenProps> = ({ onNext }) => {
  const [stage, setStage] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [said, setSaid] = useState(false);

  // Typewriter lines for the proposal build-up
  const lines = [
    "Mamalu…",
    "Somewhere between all the chaos of life, you became my calm.",
    "You’re my constant, my safest place, my favorite logic.",
    "Every future I imagine feels incomplete without you in it.",
    "So today, with all my heart",
    "",
    "will you be mine, today and always? 💍❤️",
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => setVisibleLines((p) => p + 1), 1800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowQuestion(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  // Make "No" button run away
  const dodgeNo = () => {
    setNoPos({
      x: (Math.random() - 0.5) * 250,
      y: (Math.random() - 0.5) * 250,
    });
    setStage((s) => s + 1);
  };

  const noTexts = [
    "No 😢",
    "Are you sure? 🥺",
    "Really? 💔",
    "Think again! 😭",
    "Please? 🥹",
    "Last chance 😿",
    "You can't say no 💕",
  ];

  const handleYes = () => {
    setSaid(true);
    setTimeout(onNext, 3500);
  };

  // Confetti burst on "Yes"
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([]);

  useEffect(() => {
    if (said) {
      const items = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        emoji: ["❤️", "💍", "💕", "✨", "🥂", "💖", "🌹", "💗"][Math.floor(Math.random() * 8)],
      }));
      setConfetti(items);
    }
  }, [said]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10 overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-love-pink opacity-10 animate-gentle-glow -z-10" />
      <div className="absolute w-64 h-64 rounded-full bg-love-lavender opacity-15 animate-gentle-glow -z-10" style={{ animationDelay: "2s" }} />

      {/* Confetti on yes */}
      {confetti.map((c) => (
        <span
          key={c.id}
          className="fixed text-3xl animate-confetti z-30"
          style={{ left: `${c.left}%`, top: "-5%", animationDelay: `${c.delay}s` }}
        >
          {c.emoji}
        </span>
      ))}

      {!said ? (
        <div className="max-w-lg mx-auto">
          {/* Ring emoji */}
          <span className="text-5xl md:text-7xl block mb-6 animate-pulse-heart">💍</span>

          {/* Typewriter lines */}
          {lines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className={`animate-fade-in-up mb-3 ${
                line === ""
                  ? "h-4"
                  : i === 0
                  ? "font-display text-3xl md:text-5xl text-foreground text-glow"
                  : i === lines.length - 1
                  ? "font-display text-2xl md:text-3xl text-love-pink text-glow mt-4"
                  : "font-body text-lg md:text-xl text-foreground/80"
              }`}
            >
              {line}
            </p>
          ))}

          {/* The big question */}
          {showQuestion && (
            <div className="animate-fade-in-up mt-8">
              <h2 className="font-display text-4xl md:text-6xl text-foreground text-glow mb-10 leading-tight">
                Will you be my Valentine? 💕
              </h2>

              <div className="flex items-center justify-center gap-6 relative">
                {/* YES button — grows with each dodge */}
                <button
                  onClick={handleYes}
                  className="font-body font-bold rounded-full bg-gradient-button text-primary-foreground shadow-glow hover:bg-gradient-button-hover active:scale-95 transition-all duration-300 z-10"
                  style={{
                    fontSize: `${Math.min(1.2 + stage * 0.15, 2.5)}rem`,
                    padding: `${1 + stage * 0.2}rem ${2.5 + stage * 0.4}rem`,
                  }}
                >
                  Yes! 💖
                </button>

                {/* NO button — dodges away */}
                <button
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  onClick={dodgeNo}
                  className="font-body font-semibold text-sm px-5 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted transition-all duration-300 z-10"
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition: "transform 0.3s ease-out",
                    fontSize: `${Math.max(0.875 - stage * 0.05, 0.5)}rem`,
                    opacity: Math.max(1 - stage * 0.1, 0.3),
                  }}
                >
                  {noTexts[Math.min(stage, noTexts.length - 1)]}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* After she says YES */
        <div className="animate-fade-in-up max-w-lg mx-auto">
          <span className="text-7xl md:text-9xl block mb-8 animate-pulse-heart">💍❤️</span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground text-glow mb-6 leading-tight">
            She said YES!
          </h2>
          <p className="font-display text-2xl md:text-3xl text-love-pink text-glow mb-4">
            Best Valentine's Day ever 🥹💕
          </p>
          <p className="font-body text-lg text-muted-foreground">
            Anku + Mamalu = Forever ∞
          </p>
        </div>
      )}
    </div>
  );
};

export default ProposalScreen;
