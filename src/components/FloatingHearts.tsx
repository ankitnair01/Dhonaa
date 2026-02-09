import React, { useEffect, useState } from "react";

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; size: number; duration: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            "--duration": `${heart.duration}s`,
            "--delay": `${heart.delay}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          } as React.CSSProperties}
        >
          💕
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
