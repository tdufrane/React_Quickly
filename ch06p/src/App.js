import { useState, useEffect, useRef } from "react";
import "./App.css";

const EMAIL1 = "daffyduck@looneytunes.invalid";
const EMAIL2 = "bugsbunny@looneytunes.invalid";
const EMAIL3 = "elmerfudd@looneytunes.invalid";

function Icon({ type }) {
  return <img src={`/images/${type}.png`} width="16" alt="" />;
}

function App() {
  const [showWatch, setShowWatch] = useState(false);
  const [defaultEmail, setDefaultEmail] = useState(EMAIL1);
  return (
    <div className="App">
      <LockButton />
    </div>
  );
}

function Button({ label, ButtonIcon }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={() => setPressed((p) => !p)}>
      <ButtonIcon pressed={pressed} />
      {label}
    </button>
  );
}
function LockIcon({ pressed }) {
  return pressed ? <Icon type="lock" /> : <Icon type="unlock" />;
}
function LockButton() {
  return <Button label="Lock" ButtonIcon={LockIcon} />;
}

function PhantomCursor() {
  const element = useRef();
  const onMouseMove = (evt) => {
    element.current.style.left = `${evt.nativeEvent.offsetX}px`;
    element.current.style.top = `${evt.nativeEvent.offsetY}px`;
  };
  return (
    <div style={{ position: "relative" }} onMouseMove={onMouseMove}>
      <img
        style={{ position: "absolute" }}
        ref={element}
        src="favicon.ico"
        alt=""
      />
    </div>
  );
}
function BlinkingBackground() {
  const [isLeft, setLeft] = useState(true);
  const onMouseMove = (evt) => setLeft(evt.nativeEvent.offsetX < 100);
  console.log(onMouseMove);
  const style = {
    backgroundColor: isLeft ? "blue" : "red",
    width: "200px",
    height: "200px",
  };
  return <div style={style} onMouseMove={onMouseMove} />;
}
function Die() {
  const style = {
    border: "2px solid black",
    display: "inline-block",
    width: "2em",
    height: "2em",
    textAlign: "center",
    lineHeight: 2,
  };
  const value = Math.floor(6 * Math.random());
  return <span style={style}>{value}</span>;
}
function DiceRoller() {
  const [rolls, setRolls] = useState(1);
  return (
    <main>
      <h1>Rolls: {rolls}</h1>
      <button onClick={() => setRolls((r) => r + 1)}>Re-roll</button>
      <div>
        <Die />
        <Die />
        <Die />
      </div>
    </main>
  );
}
function Countdown({ from }) {
  const [seconds, setSeconds] = useState(from);
  const [isRunning, setRunning] = useState(false);
  useEffect(() => {
    alert("IN EFFECT");
    if (!isRunning) {
      return;
    }

    const interval = setInterval(
      () =>
        setSeconds((value) => {
          if (value <= 1) {
            setRunning(false);
          }
          return value - 1;
        }),
      1000,
    );
    console.log("Starting: ", interval);
    return () => {
      console.log("Ending: ", interval);
      clearInterval(interval);
    };
  }, [isRunning]);
  return (
    <section>
      <h2>Time left: {seconds} seconds</h2>
      <button onClick={() => setSeconds(from)}>Reset</button>
      <button
        onClick={() => setRunning((valueof) => !valueof)}
        disabled={seconds === 0}
      >
        {isRunning ? "Pause" : "Resume"}
      </button>
    </section>
  );
}
function EmailInput({ value }) {
  const [email, setEmail] = useState("");
  useEffect(() => setEmail(value), [value]);
  return (
    <label>
      Email address:
      <input
        name="email"
        type="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
    </label>
  );
}
function BlogPost({ title, body }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <article>
      <h1>{title}</h1>
      {body}
    </article>
  );
}
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000,
    );
    return () => clearInterval(interval);
  }, []);
  return <h1>Seconds: {seconds}</h1>;
}
function RemoteDropdown() {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch("//www.swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => data.results)
      .then((characters) => characters.map(({ name }) => name))
      .then((names) => setOptions(names));
  }, []);
  return (
    <select>
      {options.map((option) => (
        <MappedSelectOption option={option} />
      ))}
    </select>
  );
}
function MappedSelectOption({ option }) {
  return <option key={option}>{option}</option>;
}
export default App;
