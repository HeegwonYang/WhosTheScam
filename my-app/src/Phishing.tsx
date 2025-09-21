import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

function Phishing() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cardKey, setCardKey] = useState(0); // for resetting card after swipe

  const handleChoice = (choice: "scam" | "trustworthy") => {
    if (choice === "scam") {
      setFeedback("❌ You marked this as a scam.");
    } else {
      setFeedback("✅ You marked this as trustworthy.");
    }
    // remove and reset card
    setTimeout(() => setCardKey((prev) => prev + 1), 800);
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

      {/* Animated card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cardKey}
          className="message-card"
          {...handlers}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: feedback?.includes("scam") ? -200 : 200 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            🚨 You have won a free iPhone! Click this link to claim your prize:{" "}
            <a href="#">scam-link.com</a>
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="button-row">
        <button className="btn cross" onClick={() => handleChoice("scam")}>
          ✖
        </button>
        <button className="btn check" onClick={() => handleChoice("trustworthy")}>
          ✔
        </button>
      </div>

      {/* Feedback */}
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default Phishing;
