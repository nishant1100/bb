import React, { useState, useEffect } from "react";
import FloatingHearts from "./FloatingHearts";
import CursorSparkles from "./CursorSparkles";
import Confetti from "./Confetti";

const LOVE_LETTER =
  "From the moment you came into my life, everything became softer, brighter, and happier. You are my safe place, my favorite thought, and my forever Valentine 💕";

const FLOATING_WORDS = ["Safe", "Always", "Chosen", "Forever", "Loved", "Yours"];

const QUIZ_QUESTIONS = [
  {
    question: "What do I call you the most? 💕",
    options: ["Binny", "Babe", "Madam Ji"],
    correct: 0,
  },
  {
    question: "What makes me smile instantly? 😊",
    options: ["Your laugh", "Chocolate", "Sleep"],
    correct: 0,
  },
  {
    question: "What's my favorite thing about us? 💖",
    options: ["Everything", "Our late-night talks", "Our silences"],
    correct: 0,
  },
];

const LovePage: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [finaleExplosion, setFinaleExplosion] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Hero entrance
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(LOVE_LETTER.slice(0, i + 1));
        i++;
        if (i >= LOVE_LETTER.length) {
          clearInterval(interval);
          setTimeout(() => setShowQuiz(true), 800);
        }
      }, 40);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuizAnswer = (answerIdx: number) => {
    const correct = answerIdx === QUIZ_QUESTIONS[quizIndex].correct;
    setQuizFeedback(correct ? "Of course you know that 😘" : "Hmm… I'll remind you later 😏");

    setTimeout(() => {
      setQuizFeedback(null);
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
        setQuizIndex((prev) => prev + 1);
      } else {
        setQuizDone(true);
        setTimeout(() => {
          setShowFinale(true);
          setTimeout(() => setFinaleExplosion(true), 500);
        }, 1000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-x-hidden">
      <FloatingHearts intensity={10} />
      <CursorSparkles />

      {/* Floating psychology words */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {FLOATING_WORDS.map((word, i) => (
          <span
            key={word}
            className="absolute font-display text-2xl md:text-3xl text-primary/20"
            style={{
              left: `${10 + (i * 15) % 80}%`,
              top: `${15 + (i * 20) % 70}%`,
              animation: `word-drift ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 3}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <h1
            className="font-display text-6xl md:text-8xl text-gradient-love mb-6"
            style={{ animation: heroVisible ? "wiggle 0.5s ease-in-out 0.3s" : undefined }}
          >
            YAYYYY 💖💖💖
          </h1>
          <p className="font-body text-xl md:text-2xl text-foreground max-w-lg mx-auto leading-relaxed">
            Binny, you just made me the happiest person ever 🥹
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce text-muted-foreground font-body text-sm">
          scroll down 💕
          <div className="mt-1 text-lg">↓</div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
        <div
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft max-w-lg w-full relative"
          style={{ animation: "bounce-in 0.6s ease-out" }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl" style={{ animation: "gentle-float 3s ease-in-out infinite" }}>💌</div>
          <h2 className="font-display text-3xl text-foreground mb-6 text-center">A little letter for you</h2>
          <p className="font-body text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line">
            {typedText}
            <span
              className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
              style={{ animation: "typewriter-cursor 0.8s infinite" }}
            />
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      {showQuiz && !quizDone && (
        <section className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
          <div
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft max-w-lg w-full text-center"
            style={{ animation: "bounce-in 0.6s ease-out" }}
          >
            <h2 className="font-display text-3xl text-foreground mb-2">How well do you know us? 💞</h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
            </p>

            <p className="font-body text-lg text-foreground mb-6">
              {QUIZ_QUESTIONS[quizIndex].question}
            </p>

            <div className="flex flex-col gap-3">
              {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(i)}
                  disabled={!!quizFeedback}
                  className="px-6 py-3 rounded-2xl font-body text-base bg-blush text-foreground hover:bg-rose-light hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-60"
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizFeedback && (
              <p
                className="mt-6 font-body text-primary font-medium"
                style={{ animation: "bounce-in 0.3s ease-out" }}
              >
                {quizFeedback}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Finale */}
      {showFinale && (
        <section className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
          {finaleExplosion && <Confetti />}
          <div
            className="text-center max-w-lg"
            style={{ animation: "bounce-in 0.8s ease-out" }}
          >
            <h2
              className="font-display text-5xl md:text-6xl text-gradient-love mb-6"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              I'm so lucky to love you, Binny 💖
            </h2>
            <p className="font-body text-2xl text-foreground mb-4">
              Happy Valentine's Day 🌹
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {["💖", "💕", "💗", "💓", "🩷", "❤️", "💞"].map((h, i) => (
                <span
                  key={i}
                  className="text-3xl"
                  style={{
                    animation: `gentle-float ${2 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground mt-12">
              Forever yours 💕
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default LovePage;
