import { useState, useCallback, memo } from "react";
import useCountdown from "../hooks/useCountdown";

// Pure function moved outside component to avoid recreation
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Styles extracted to avoid recreation on each render
const styles = {
  container: { border: "1px solid #ccc", padding: "20px", margin: "10px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  display: { fontSize: "3rem", margin: "20px 0" },
  complete: { color: "green", fontSize: "1.5rem" },
};

const CountdownTimer = memo(function CountdownTimer({ id, onRemove }) {
  const [inputSeconds, setInputSeconds] = useState(60);
  const { timeLeft, isRunning, isComplete, start, pause, reset } =
    useCountdown(inputSeconds);

  const handleInputChange = useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      setInputSeconds(newValue);
      reset(newValue);
    },
    [reset]
  );

  const handleRemove = useCallback(() => onRemove(id), [onRemove, id]);
  const handleReset = useCallback(() => reset(inputSeconds), [reset, inputSeconds]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Timer {id}</h2>
        <button onClick={handleRemove}>Remove</button>
      </div>
      <div>
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputChange}
          min="1"
          disabled={isRunning}
        />
        <span> seconds</span>
      </div>
      <div style={styles.display}>{formatTime(timeLeft)}</div>
      {isComplete && <div style={styles.complete}>Time's up!</div>}
      <div>
        {!isRunning ? (
          <button onClick={start} disabled={timeLeft === 0}>
            Start
          </button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
});

export default CountdownTimer;
