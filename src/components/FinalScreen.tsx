import React from "react";

const FinalScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      {/* Multiple glowing orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-love-pink opacity-10 animate-gentle-glow -z-10" />
      <div className="absolute w-64 h-64 rounded-full bg-love-lavender opacity-15 animate-gentle-glow -z-10" style={{ animationDelay: "2s" }} />

      <div className="animate-fade-in-up max-w-lg mx-auto">
        <span className="text-6xl md:text-8xl block mb-8 animate-pulse-heart">💕</span>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground text-glow leading-snug mb-6">
          No matter how much code Anku writes,
        </h2>
        <p className="font-display text-2xl md:text-4xl text-love-pink text-glow mb-10">
          Mamalu will always be his favorite logic ❤️
        </p>
        <div className="flex items-center justify-center gap-3 text-3xl">
          {["💕", "💖", "💗", "💓", "💕"].map((emoji, i) => (
            <span
              key={i}
              className="animate-pulse-heart"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <p className="mt-10 font-body text-sm text-muted-foreground">
          Made with ❤️ by Anku, for Mamalu
        </p>
      </div>
    </div>
  );
};

export default FinalScreen;
