import { useState, useEffect, useRef } from "react";
import "./App.css";

const VIDEO_SRC =
  "//images-assets.nasa.gov/video/One Small Step/One Small Step~orig.mp4";
const FOCUS_NONE = 0;
const FOCUS_USER = 1;
const FOCUS_REQUEST = 2;

function getWindowSize() {
  return `${window.innerWidth}x${window.innerHeight}`;
}

function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

function Menu() {
  const [isExpanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    const onWindowClick = () => setExpanded(false);
    const onMenuClick = (evt) => evt.stopPropagation();
    const menu = menuRef.current;
    window.addEventListener("pointerdown", onWindowClick);
    menu.addEventListener("pointerdown", onMenuClick);
    return () => {
      window.removeEventListener("pointerdown", onWindowClick);
      menu.removeEventListener("pointerdown", onMenuClick);
    };
  }, [isExpanded]);
  const menuRef = useRef();
  return (
    <main>
      <button onClick={() => setExpanded(true)}>Show menu</button>
      {isExpanded && (
        <div
          style={{ border: "1px solid black", padding: "1em" }}
          ref={menuRef}
        >
          This is the menu
        </div>
      )}
    </main>
  );
}

function Transition() {
  const [isRunning, setRunning] = useState(false);
  const div = useRef();
  useEffect(() => {
    const onStart = () => setRunning(true);
    const onEnd = () => setRunning(false);
    const node = div.current;
    node.addEventListener("transitionstart", onStart);
    node.addEventListener("transitionend", onEnd);
    return () => {
      node.removeEventListener("transitionstart", onStart);
      node.removeEventListener("transitionend", onEnd);
    };
  }, [setRunning]);
  return (
    <section>
      <h1>Transition is {!isRunning && "not"} running</h1>
      <div style={{ color: "red", transition: "color 1s linear" }} ref={div}>
        COLORFUL TEXT
      </div>
      <button onClick={() => (div.current.style.color = "blue")}>
        Go blue
      </button>
      <button onClick={() => (div.current.style.color = "red")}>Go red</button>
    </section>
  );
}

function WindowSize() {
  const [size, setSize] = useState(getWindowSize());
  useEffect(() => {
    const onResize = () => setSize(getWindowSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setSize]);
  return <h1>Window size: {size}</h1>;
}
function Button({ handleClick, label }) {
  const buttonStyle = {
    color: "blue",
    border: "1px solid",
    background: "transparent",
    borderRadius: ".25em",
    padding: ".5em 1em",
    margin: ".5em",
  };
  const onClick = () => handleClick();
  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
}

function StyledCounter() {
  const [counter, setCounter] = useState(0);
  const update = (evt) => setCounter((parameter) => parameter + evt);
  return (
    <section>
      <h1>Counter: {counter}</h1>
      <div>
        <Button handleClick={() => update(1)} label="Increment" />
        <Button handleClick={() => update(-1)} label="Decrement" />
      </div>
    </section>
  );
}

function Admin() {
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const onClick = (evt) => {
    evt.preventDefault();
    if (password === "secret") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };
  const onChange = (evt) => setPassword(evt.target.value);
  return (
    <>
      {isAdmin && <h1>Welcome, admin!</h1>}
      <form>
        <input type="password" onChange={onChange} />
        <button type="button" onClick={onClick}>
          Log in
        </button>
      </form>
    </>
  );
}

function getStyle(isActive) {
  return {
    display: "flex",
    flexDirection: "column",
    backgroundColor: isActive ? "oldlace" : "transparent",
  };
}

function Field({ label, children }) {
  return (
    <label>
      {label}:
      <br />
      {children}
    </label>
  );
}

function Contact() {
  const [focus, setFocus] = useState(FOCUS_NONE);
  const onUserFocus = () => setFocus(FOCUS_USER);
  const onRequestFocus = () => setFocus(FOCUS_REQUEST);
  const onBlur = () => setFocus(FOCUS_NONE);
  return (
    <form onBlur={onBlur}>
      <h1>Contact</h1>
      <fieldset onFocus={onUserFocus} style={getStyle(focus === FOCUS_USER)}>
        <legend>User</legend>
        <Field label="Name">
          <input />
        </Field>
        <Field label="Email">
          <input type="email" />
        </Field>
      </fieldset>
      <fieldset
        onFocus={onRequestFocus}
        style={getStyle(focus === FOCUS_REQUEST)}
      >
        <legend>Request</legend>
        <Field label="Subject">
          <input />
        </Field>
        <Field label="Body">
          <textarea />
        </Field>
      </fieldset>
    </form>
  );
}

function DropdownCounter() {
  const [counter, setCounter] = useState(0);
  const onChange = (evt) =>
    setCounter((value) => value + Number(evt.target.value));
  const values = [0, 1, 2, 3, 4, 5];
  return (
    <section>
      <h2>Dropdown Counter: {counter}</h2>
      <select name="dropdown" id="dropdown" value={counter} onChange={onChange}>
        {values.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </section>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = useRef();
  //alert(increment.current.evt);
  const onClick = (evt) => {
    alert("EVENT TYPE " + evt.type);
    alert("TARGET " + evt.target);
    alert("INCREMENT CURRENT " + increment.current);
    const delta = evt.target === increment.current ? 1 : -1;
    setCounter((c) => c + delta);
  };
  return (
    <section>
      <h2>Counter: {counter}</h2>
      <button ref={increment} onClick={onClick}>
        +
      </button>
      <button onClick={onClick}>-</button>
    </section>
  );
}

function VideoPlayer() {
  const [isPlaying, setPlaying] = useState(false);
  const video = useRef();
  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  const onClickPlay = () => video.current.play();
  const onClickPause = () => video.current.pause();
  return (
    <section>
      <video
        ref={video}
        src={VIDEO_SRC}
        controls
        width="480"
        onPlay={onPlay}
        onPause={onPause}
      />
      <button onClick={isPlaying ? onClickPause : onClickPlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </section>
  );
}

function MouseStatus() {
  const [isMoving, setMoving] = useState(false);
  const onMouseMove = () => setMoving(true);
  useEffect(() => {
    if (!isMoving) return;
    const timeout = setTimeout(() => setMoving(false), 500);
    return () => clearTimeout(timeout);
  }, [isMoving]);
  return (
    <section onMouseMove={onMouseMove}>
      <h2>
        The mouse is {!isMoving && "not"} moving: {isMoving ? "✓" : "✗"}
      </h2>
    </section>
  );
}
export default App;
