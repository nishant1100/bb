import React, { useEffect, useState } from "react";
import Confetti from "./Confetti";
import CursorSparkles from "./CursorSparkles";
import FloatingHearts from "./FloatingHearts";

const LOVE_LETTER =
  "Ever since you came into my life, everything feels warmer and more ramilo. Your presence turns ordinary moments into something magical. You are my peace, my favorite place to rest. Let's love more, create more memories, help each other grow and many more Janu. You are only the best thing that happened to me at KMC, I'm very very thankful to KMC and the friends who helped to know your name Binny uff my love. Love You so much Maya. Mero Jaan💕.And yes Thank You for being my valentine hehe ";

const FLOATING_WORDS = ["Safe", "Always", "Chosen", "Forever", "Loved", "Yours", "Mine", "Us", "Together", "Heart", "Soul", "Joy", "Comfort", "Home", "Beloved", "Adored", "Cherished", "Treasure", "Bliss", "Harmony","Maya","Thessy","Binny","Don","Mero Mutu","Jaanu","Jaadu","Mero Chor","Mutu"];

const QUIZ_QUESTIONS = [
  {
    question: "What do I call you the most? 💕",
    options: ["Thessy", "Babe", "Binika"],
    correct: 0,
  },
  {
    question: "What makes me smile instantly? 😊",
    options: ["Your laugh", "Your silence", "Gym"],
    correct: 0,
  },
  {
    question: "What's my favorite thing about us? 💖",
    options: ["Nothing", "Our romantic talks", "Our silences"],
    correct: 0,
  },
    {
    question: "Will we grow old together? 💖",
    options: ["Yes", "No", "Maybe"],
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

  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);

useEffect(() => {
  if (!showFinale) return;

  // reset in case user revisits
  setShowLine1(false);
  setShowLine2(false);
  setShowLine3(false);

  const t1 = setTimeout(() => {
    setShowLine1(true);
  }, 300);

  const t2 = setTimeout(() => {
    setShowLine2(true);
  }, 2300);

  const t3 = setTimeout(() => {
    setShowLine3(true);
  }, 4300);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
  };
}, [showFinale]);


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
    setQuizFeedback(correct ? "Of course you know that 😘" : "Hmm… I'll remind you later 😏" );

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
            Endlessly Yours 💞💖
          </h1>
          <p className="font-body text-xl md:text-2xl text-foreground max-w-lg mx-auto leading-relaxed">
            Because of you Bebo I'm the happiest and blessed person. Loving is you like a beautiful journey that I never want to end. You are my forever and always. Lots and lots of Love Mero Maya lai. Muah Janu. #bettertogether #forver #nishantbinika #binnyislove
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
          <h2 className="font-display text-3xl text-foreground mb-6 text-center">A Letter For My Maya</h2>
          <p className="font-body text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line">
            {typedText}
            <span
              className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
              style={{ animation: "typewriter-cursor 0.8s infinite" }}
            />
          </p>
        </div>

         {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce text-muted-foreground font-body text-sm">
          scroll down 💕
        </div>

      </section>
          
      {/* Quiz Section */}
      {!quizDone && (
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
                style={{ animation: "bounce-in 0.6s ease-out" }}
              >
                {quizFeedback}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Finale */}
{      showFinale && (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10 overflow-hidden">
    {finaleExplosion && <Confetti />}

    {/* Floating  hearts */}
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + i * 10}%`,
            animation: `float-up ${10 + i}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        >
          {i % 5 === 0 ? "💕" : "❤️"}
        </span>
      ))}
    </div>

    <div
      className="text-center max-w-lg relative"
      style={{ animation: "bounce-in 0.8s ease-out" }}
    >
      {/* Orbiting hearts */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {["💞", "💖"].map((h, i) => (
          <span
            key={i}
            className="absolute text-2xl"
            style={{
              animation: `orbit ${6 + i * 2}s linear infinite`,
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Heartbeat heading */}
      {showLine1 && (
        <h2
          className="font-display text-5xl md:text-6xl text-gradient-love mb-4 relative z-10 animate-pulse"
        >
          So lucky to be with you, Maya 
        </h2>
      )}

      {/* Whisper line */}
      {showLine2 && (
      <p className="mt-16 font-display text-8xl text-primary">
        Happy Valentine’s Day 💕
      </p>
      )}
      {/* Handwritten ending */}
      {showLine3 && (
      <p
        className="mt-16 font-display text-3xl text-primary"
        style={{ animation: "write-in 2s ease forwards" }}
      >
        Forever Yours ♡
      </p>
      )}
    </div>
  </section>
)}

    </div>
  );
};

export default LovePage;
