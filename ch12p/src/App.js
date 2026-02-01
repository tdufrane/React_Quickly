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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header>
        <h1>Countdown Timers</h1>
      </header>
      <main id="main-content">
        <button
          type="button"
          onClick={addTimer}
          style={{ marginBottom: "20px" }}
          aria-label="Add a new countdown timer"
        >
          + Add Timer
        </button>
        <section aria-label="Active timers">
          {timers.length === 0 ? (
            <p>No timers. Click "Add Timer" to create one.</p>
          ) : (
            timers.map((timer) => (
              <CountdownTimer key={timer.id} id={timer.id} onRemove={removeTimer} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
