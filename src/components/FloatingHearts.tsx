import React, { useEffect, useCallback } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["💖", "💕", "💗", "💓", "🩷", "❤️", "💞"];

const FloatingHearts: React.FC<{ intensity?: number }> = ({ intensity = 8 }) => {
  const [hearts, setHearts] = React.useState<FloatingHeart[]>([]);

  const spawnHeart = useCallback(() => {
    const id = Date.now() + Math.random();
    const heart: FloatingHeart = {
      id,
      left: Math.random() * 100,
      size: 14 + Math.random() * 20,
      duration: 6 + Math.random() * 6,
      delay: 0,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
    setHearts((prev) => [...prev.slice(-30), heart]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnHeart, 1200 / (intensity / 4));
    return () => clearInterval(interval);
  }, [spawnHeart, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-10%",
            fontSize: `${h.size}px`,
            animation: `float-up ${h.duration}s ease-out forwards`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
