import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

let phishingQuestions = [
  {
    id: 1,
    type: "email",
    from: "Amazon Support <support@amazon-fake.com>",
    subject: "Action required: Return overdue order",
    body: "You have been fined $85.22 for failing to return Order #23442314. Please log in within 48 hours to pay this fine or apply for a waiver: http://shorturl.scam/amazon",
    correct: "scam",
  },
  {
    id: 2,
    type: "email",
    from: "Bank Security <alerts@bank-secure.net>",
    subject: "Confirmation code sent to the app",
    body: "We noticed unusual activity in your account. Go into your BankSecure app and enter the following code: 649482",
    correct: "trustworthy",
  }
];

let scamQuestions =[
{
    id: 1,
    type: "sms",
    body: "📦 USPS: A parcel could not be delivered due to invalid ZIP code. Confirm details here: usps-delivery.vip",
    correct: "scam"
},
{
    id: 2,
    type: "sms",
    body: "Your order for the Sony WH-1000XM5 headphones has been confirmed. Expected delivery is between Tuesday and Thursday. Thank you for shopping with us!",
    correct: "trustworthy",
}
]
  

function Question() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // ✅ lock state
  const { unit } = useParams();
  
  const questions = fetch("https://whosthescam.onrender.com/generate_ads/1/1/3");


  const unitString = () => {
    switch(unit){
      case "messages":
        return "Scam Messages";
      case "phishing":
        return "Phishing";
      case "social":
        return "Social Media Scams";
      case "misinfo":
        return "Fake News & Misinformation";
      default:
        return "Phishing";
    }
  }

  
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
        if (score === phishingQuestions.length){
        }
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
      <h1>{unitString()}</h1>

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
          <h2>🏁 You finished the {unitString()} section!</h2>
          <p>Your score: {score} / {phishingQuestions.length}</p>

          {score === phishingQuestions.length ? (
            <p className="badge">🏅 Perfect! You earned the {unitString()} Master badge!</p>
          ) : (
            <p className="try-again"> Try again to earn the badge!</p>
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

export default Question;
