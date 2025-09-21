import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const phishingQuestions = [
  { id: 1, text: "🚨 You have won a free iPhone! Click this link to claim your prize: scam-link.com", correct: "scam" },
  { id: 2, text: "⚠️ Your bank account has been locked. Please login here to verify your identity: secure-login-bank.net", correct: "scam" },
  { id: 3, text: "📦 USPS: A parcel could not be delivered due to invalid ZIP code. Confirm details here: usps-delivery.vip", correct: "scam" },
  { id: 4, text: "👤 Someone tried to sign in to your account. Was this you? Visit this page to reset: suspicious-login-alert.io", correct: "scam" },
  { id: 5, text: "🎉 Congratulations! You’ve been selected for a $500 gift card. Claim now at gift-prizes.org", correct: "scam" },
];

function Phishing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // ✅ lock state

  const currentQuestion = phishingQuestions[currentIndex];

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setCardKey((prev) => prev + 1);
    setCompleted(false);
    setIsAnswered(false);
  };

  const handleChoice = (choice: "scam" | "trustworthy") => {
    if (!currentQuestion || isAnswered) return; // ✅ block extra clicks
    setIsAnswered(true);

    if (choice === currentQuestion.correct) {
      setFeedback("✅ Correct! This is a scam.");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("❌ Incorrect. Be careful!");
    }

    setTimeout(() => {
      setFeedback(null);
      setIsAnswered(false); // ✅ re-enable for next question

      if (currentIndex < phishingQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setCardKey((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 1200);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleChoice("scam"),
    onSwipedRight: () => handleChoice("trustworthy"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="phishing-container">
      <h1>Phishing</h1>

      {!completed && (
        <p className="question-number">
          Question {currentIndex + 1} of {phishingQuestions.length}
        </p>
      )}

      <AnimatePresence mode="wait">
        {currentQuestion && !completed && (
          <motion.div
            key={cardKey}
            className="message-card"
            {...handlers}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: feedback?.includes("scam") ? -200 : 200 }}
            transition={{ duration: 0.6 }}
          >
            <p>{currentQuestion.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!completed && currentQuestion && (
        <div className="button-row">
          <button
            className="btn cross"
            onClick={() => handleChoice("scam")}
            disabled={isAnswered} // ✅ disable while waiting
          >
            ✖
          </button>
          <button
            className="btn check"
            onClick={() => handleChoice("trustworthy")}
            disabled={isAnswered} // ✅ disable while waiting
          >
            ✔
          </button>
        </div>
      )}

      {feedback && <p className="feedback">{feedback}</p>}

      {completed && (
        <div className="end-screen">
          <h2>🏁 You finished the Phishing section!</h2>
          <p>Your score: {score} / {phishingQuestions.length}</p>

          {score === phishingQuestions.length ? (
            <p className="badge">🏅 Perfect! You earned the Phishing Master badge!</p>
          ) : (
            <p className="try-again">🔄 Try again to earn the badge!</p>
          )}

          <div className="end-actions">
            <Link to="/home">
              <button className="btn back-btn">⬅ Back to Topics</button>
            </Link>
            {score !== phishingQuestions.length && (
              <button className="btn retry-btn" onClick={restartGame}>
                🔄 Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Phishing;
