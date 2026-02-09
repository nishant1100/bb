import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        "touches" in e ? e.touches[0] : e;
      const id = Date.now() + Math.random();
      setSparkles((prev) => [
        ...prev.slice(-15),
        { id, x: clientX + (Math.random() - 0.5) * 30, y: clientY + (Math.random() - 0.5) * 30, size: 8 + Math.random() * 12 },
      ]);
    };

    let throttle = false;
    const throttled = (e: MouseEvent | TouchEvent) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => (throttle = false), 80);
      handleMove(e);
    };

    window.addEventListener("mousemove", throttled);
    window.addEventListener("touchmove", throttled);
    return () => {
      window.removeEventListener("mousemove", throttled);
      window.removeEventListener("touchmove", throttled);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            animation: "sparkle 0.8s ease-out forwards",
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
};

export default CursorSparkles;
