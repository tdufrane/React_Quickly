import { useState, useCallback, memo } from "react";
import useCountdown from "../hooks/useCountdown";

// Pure function moved outside component to avoid recreation
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
    <article className="timer" aria-labelledby={`timer-heading-${id}`}>
      <header className="timer-header">
        <h2 id={`timer-heading-${id}`}>Timer {id}</h2>
        <button
          type="button"
          className="timer-remove-button"
          onClick={handleRemove}
          aria-label={`Remove Timer ${id}`}
        >
          Remove
        </button>
      </header>
      <div>
        <label htmlFor={`timer-seconds-${id}`}>
          Duration in seconds:
          <input
            id={`timer-seconds-${id}`}
            name={`timer-seconds-${id}`}
            type="number"
            value={inputSeconds}
            onChange={handleInputChange}
            min="1"
            disabled={isRunning}
            className="timer-input"
            aria-describedby={`timer-display-${id}`}
          />
        </label>
      </div>
      <div
        id={`timer-display-${id}`}
        className="timer-display"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="visually-hidden">Time remaining: </span>
        {formatTime(timeLeft)}
      </div>
      {isComplete && (
        <div
          className="timer-complete"
          role="alert"
          aria-live="assertive"
        >
          Time's up!
        </div>
      )}
      <div role="group" aria-label={`Controls for Timer ${id}`}>
        {!isRunning ? (
          <button
            type="button"
            className="timer-button"
            onClick={start}
            disabled={timeLeft === 0}
            aria-label={`Start Timer ${id}`}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            className="timer-button"
            onClick={pause}
            aria-label={`Pause Timer ${id}`}
          >
            Pause
          </button>
        )}
        <button
          type="button"
          className="timer-button"
          onClick={handleReset}
          aria-label={`Reset Timer ${id}`}
        >
          Reset
        </button>
      </div>
    </article>
  );
});

export default CountdownTimer;
