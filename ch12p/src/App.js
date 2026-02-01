import { useState, useCallback } from "react";
import "./index.css";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  const [timers, setTimers] = useState([{ id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const addTimer = useCallback(() => {
    setTimers((prev) => [...prev, { id: nextId }]);
    setNextId((prev) => prev + 1);
  }, [nextId]);

  const removeTimer = useCallback((id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="App">
      <h1>Countdown Timers</h1>
      <button onClick={addTimer} style={{ marginBottom: "20px" }}>
        + Add Timer
      </button>
      {timers.map((timer) => (
        <CountdownTimer key={timer.id} id={timer.id} onRemove={removeTimer} />
      ))}
    </div>
  );
}

export default App;
