
import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mesg: text }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ emotion: "error", emoji: "⚠️" });
    } finally {
      setLoading(false);
    }
  };

 const getColor = () => {
  if (!result) return "#ffffff";

  if (result.emotion === "positive") return "#d1f5dc"; 
  if (result.emotion === "negative") return "#f8d0d0"; 
  if (result.emotion === "neutral") return "#fff3cd";  

  return "#f0f0f0";
};

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Sentiment Analyzer</h1>

        <div className="card" style={{ backgroundColor: getColor() }}>
          <textarea
            placeholder="Type your feedback..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setResult(null);
            }}
          />

          {/* Quick emoji buttons */}
          <div className="quick-buttons">
            <button onClick={() => setText("I am happy")}>😊</button>
            <button onClick={() => setText("It is okay")}>😐</button>
            <button onClick={() => setText("I am unhappy")}>😞</button>
          </div>

          <button onClick={analyzeSentiment} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {result && (
            <div className="result">
              <span className="emoji">{result.emoji}</span>
              <p className="emotion">{result.emotion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;