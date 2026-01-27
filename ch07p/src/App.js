import { useRef, useState, useEffect } from "react";
import "./App.css";

const THRESHOLD = 300;

function App() {
  return (
    <div className="App">
      <Component />
    </div>
  );
}

function Component() {
  const ref = useRef();
  useEffect(() => ref.current.focus(), []);
  return <input ref={ref} />;
}

function DoubleClickCounter() {
  const [counter, setCounter] = useState(0);
  const lastClickTime = useRef(null);
  const onClick = () => {
    const isDoubleClick = Date.now() - lastClickTime.current < THRESHOLD;
    if (isDoubleClick) {
      setCounter((value) => value + 1);
    } else {
      lastClickTime.current = Date.now();
    }
  };
  return (
    <main>
      <button onClick={onClick}>Click me!</button>
      <p>Double click count: {counter}</p>
    </main>
  );
}

export default App;
