# Countdown Timer Implementation

## Overview
Multiple independent countdown timers. Each timer has its own controls and runs independently. Users can add and remove timers dynamically.

## Files to Create

### 1. `src/components/CountdownTimer.js`
Main timer component with:
- Input field for seconds
- Start/Pause/Reset buttons
- Display showing remaining time (MM:SS format)
- "Time's up!" message when complete

### 2. `src/hooks/useCountdown.js`
Custom hook managing timer logic:
- `timeLeft` state (seconds remaining)
- `isRunning` state
- `start()`, `pause()`, `reset()` functions
- `useEffect` with `setInterval` for countdown
- Cleanup on unmount

## Files to Modify

### 3. `src/App.js`
- Import and render `CountdownTimer` component

## Implementation Details

### useCountdown Hook
```jsx
import { useState, useEffect } from "react";

function useCountdown(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (seconds) => {
    setTimeLeft(seconds);
    setIsRunning(false);
    setIsComplete(false);
  };

  return { timeLeft, isRunning, isComplete, start, pause, reset };
}

export default useCountdown;
```

### CountdownTimer Component
Props:
- `id` - Unique timer identifier
- `onRemove` - Callback to remove this timer

```jsx
import { useState } from "react";
import useCountdown from "../hooks/useCountdown";

function CountdownTimer({ id, onRemove }) {
  const [inputSeconds, setInputSeconds] = useState(60);
  const { timeLeft, isRunning, isComplete, start, pause, reset } = useCountdown(inputSeconds);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", margin: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Timer {id}</h2>
        <button onClick={() => onRemove(id)}>Remove</button>
      </div>
      {/* Input, display, and controls */}
    </div>
  );
}

export default CountdownTimer;
```

### App.js - Multiple Timer Management
```jsx
import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  const [timers, setTimers] = useState([{ id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const addTimer = () => {
    setTimers([...timers, { id: nextId }]);
    setNextId(nextId + 1);
  };

  const removeTimer = (id) => {
    setTimers(timers.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <h1>Countdown Timers</h1>
      <button onClick={addTimer}>+ Add Timer</button>
      {timers.map((timer) => (
        <CountdownTimer key={timer.id} id={timer.id} onRemove={removeTimer} />
      ))}
    </div>
  );
}
```

## Features
- Add unlimited timers with "+ Add Timer" button
- Each timer runs independently
- Remove individual timers without affecting others
- MM:SS time display format
- Start/Pause/Reset controls per timer
- "Time's up!" message when complete
- Input changes immediately reflect in timer display

## Performance Optimizations

### useCountdown Hook
- `useRef` for interval reference (avoids stale closures)
- `useCallback` for memoized `start`, `pause`, `reset` functions
- Removed `timeLeft` from useEffect dependencies (uses functional updates)

### CountdownTimer Component
- `React.memo` wrapper prevents unnecessary re-renders
- `formatTime` moved outside component (pure function)
- Styles extracted as constants (avoids object recreation)
- `useCallback` for event handlers

### App.js
- `useCallback` for `addTimer` and `removeTimer`
- Functional state updates for proper batching

## Verification
1. Run `npm start` in ch12p
2. Click "Add Timer" - new timer appears
3. Start multiple timers - each runs independently
4. Click Remove on a timer - only that timer is removed
5. Other timers continue running unaffected
