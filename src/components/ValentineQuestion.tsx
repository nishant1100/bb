import React, { useState, useCallback, useRef } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Confetti from "../components/Confetti";

const NO_MESSAGES = [
  "Nice try 😜",
  "Nope 😏",
  "That's illegal 😆",
  "Not an option 💅",
  "Try again, cutie 🤭",
  "Hehe nope 😘",
  "You can't escape love 💖",
  "Wrong button, Binny 😏",
];

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion: React.FC<ValentineQuestionProps> = ({ onYes }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMsg, setNoMsg] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const msgIdx = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodgeNo = useCallback(() => {
    if (disabled) return;
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 150;
    setNoPos({ x, y });
    setNoMsg(NO_MESSAGES[msgIdx.current % NO_MESSAGES.length]);
    msgIdx.current++;
    setTimeout(() => setNoMsg(null), 1200);
  }, [disabled]);

  const handleYes = () => {
    if (disabled) return;
    setDisabled(true);
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setExploding(true);
      setTimeout(() => onYes(), 1800);
    }, 1500);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-blush relative overflow-hidden"
    >
      <FloatingHearts intensity={6} />

      {/* Ambient floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `gentle-float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      {exploding && <Confetti />}

      {/* Explosion hearts */}
      {exploding && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute text-4xl"
              style={{
                animation: `heart-explosion 1.2s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                transform: `rotate(${i * 30}deg) translateX(${50 + Math.random() * 80}px)`,
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}

      <div
        className={`relative z-20 bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft max-w-md w-full mx-4 text-center transition-all duration-700 ${
          exploding ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ animation: "bounce-in 0.8s ease-out" }}
      >
        {/* Cute decorative hearts on card */}
        <div className="absolute -top-4 -right-4 text-3xl" style={{ animation: "gentle-float 3s ease-in-out infinite" }}>💝</div>
        <div className="absolute -top-3 -left-3 text-2xl" style={{ animation: "gentle-float 4s ease-in-out infinite 0.5s" }}>🌸</div>

        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
          Binny 💖
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 mt-4">
          Will you be my Valentine?
        </p>

        {processing && (
          <div className="mb-6" style={{ animation: "bounce-in 0.4s ease-out" }}>
            <p className="font-body text-lg text-foreground">Processing your answer… 👀</p>
            <div className="mt-3 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block w-2 h-2 rounded-full bg-primary"
                  style={{
                    animation: "gentle-float 0.6s ease-in-out infinite",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!processing && !exploding && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[80px]">
            <button
              onClick={handleYes}
              disabled={disabled}
              className="px-8 py-3 rounded-full font-body font-semibold text-lg bg-primary text-primary-foreground shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            >
              Yes 💕
            </button>

            <div className="relative">
              <button
                onMouseEnter={dodgeNo}
                onTouchStart={dodgeNo}
                onClick={dodgeNo}
                disabled={disabled}
                className="px-8 py-3 rounded-full font-body font-semibold text-lg bg-muted text-muted-foreground hover:bg-muted transition-all duration-300 cursor-pointer disabled:opacity-50"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                No 🙈
              </button>
            </div>
          </div>
        )}

        {noMsg && (
          <p
            className="mt-4 font-body text-sm text-primary font-medium"
            style={{ animation: "bounce-in 0.3s ease-out" }}
          >
            {noMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ValentineQuestion;
