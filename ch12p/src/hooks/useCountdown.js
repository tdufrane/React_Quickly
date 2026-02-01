import { useState, useEffect, useCallback, useRef } from "react";

function useCountdown(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback((seconds) => {
    setTimeLeft(seconds);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  return { timeLeft, isRunning, isComplete, start, pause, reset };
}

export default useCountdown;
