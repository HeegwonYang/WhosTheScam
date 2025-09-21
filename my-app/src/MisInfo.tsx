import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MisinfoQuestions = [
  {
    id: 1,
    type: "email",
    from: "The Community Health and Wellness Task Force <noreply@CH01234.com>",
    subject: "Urgent Health Alert: New Study Links Common Food to Widespread Illness",
    body: "A groundbreaking, but unpublicized, study from a leading research group has uncovered a dangerous link between a common food item, Chicken Nuggets, and a new, rapidly spreading illness. The illness, which presents with symptoms similar to the flu, is believed to be a direct result of a newly introduced chemical preservative in this food.   To learn more about the specific risks and for information on alternative food sources, please visit the official research page at http://sadasda.shorturl.com/food-safety.",
    correct: "scam",
  },
  {
    id: 2,
    type: "sms",
    body: "🔓 Your bank account has been compromised. Due to suspicious activity, a hold has been placed on your funds. To release the hold, click here immediately and verify your information: suspicious-login-alert.io",
    correct: "scam",
  },
  {
    id: 3,
    type: "sms",
    body: "URGENT HEALTH ALERT! New study proves that these new pills can cure cancer. Don't wait, get yours now at http://NewHealthOrg.com/realPills. Doctors are hiding this from you!",
    correct: "scam",
  },
  {
    id: 4,
    type: "email",
    from: "Rewards Center <claim@prizes.org>",
    subject: "🎉 Congratulations! You’ve have been choosen to win a $10000 car!",
    body: "Claim your gift card now by clicking here: gift-prizes.org",
    correct: "scam",
  },
  {
    id: 5,
    type: "email",
    from: "Bank Security <alerts@bank-secure.net>",
    subject: "Your account has been locked",
    body: "We noticed unusual activity in your account. Please log in here to verify your identity: http://secure-bank-login.net",
    correct: "scam",
  },
];


function Misinfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // ✅ lock state

  const currentQuestion = MisinfoQuestions[currentIndex];

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

      if (currentIndex < MisinfoQuestions.length - 1) {
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
    <div className="misinfo-container">
      <h1>Misinformation</h1>

      {!completed && (
        <p className="question-number">
          Question {currentIndex + 1} of {MisinfoQuestions.length}
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
            {currentQuestion.type === "email" ? (
                <>
                <div className="email-header">
                    <p><strong>From:</strong> {currentQuestion.from}</p>
                    <p><strong>Subject:</strong> {currentQuestion.subject}</p>
                </div>
                <div className="email-body">
                    <p>{currentQuestion.body}</p>
                </div>
                </>
            ) : (
                <div className="sms-body">
                <p>{currentQuestion.body}</p>
                </div>
            )}
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
            Unsafe
          </button>
          <button
            className="btn check"
            onClick={() => handleChoice("trustworthy")}
            disabled={isAnswered} // ✅ disable while waiting
          >
            Safe
          </button>
        </div>
      )}

      {feedback && <p className="feedback">{feedback}</p>}

      {completed && (
        <div className="end-screen">
          <h2>🏁 You finished the Misinformation section!</h2>
          <p>Your score: {score} / {MisinfoQuestions.length}</p>

          {score === MisinfoQuestions.length ? (
            <p className="badge">🎖️ Perfect! You earned the News Veracity badge!</p>
          ) : (
            <p className="try-again"> Try again to earn the badge!</p>
          )}

          <div className="end-actions">
            <Link to="/home">
              <button className="btn back-btn">⬅ Back to Topics</button>
            </Link>
            {score !== MisinfoQuestions.length && (
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

export default Misinfo;