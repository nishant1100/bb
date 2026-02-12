import React, { useEffect, useState } from "react";

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<
    { id: number; left: number; color: string; size: number; duration: number; shape: string }[]
  >([]);

  useEffect(() => {
    const colors = [
      "hsl(340, 80%, 60%)",
      "hsl(350, 85%, 65%)",
      "hsl(280, 50%, 80%)",
      "hsl(40, 80%, 65%)",
      "hsl(0, 80%, 55%)",
      "hsl(340, 60%, 92%)",
    ];
    const shapes = ["💖", "💕", "✨", "🌸", "💗", "🩷", "⭐","💖", "💕", "✨", "🌸", "💗", "🩷", "⭐"];
    const items = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 12 + Math.random() * 16,
      duration: 2 + Math.random() * 3,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `confetti-fall ${p.duration}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
