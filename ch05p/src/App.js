import { useState } from "react";
import "./App.css";
const PLUS = (a, b) => a + b;
const MINUS = (a, b) => a - b;
const MULTIPLY = (a, b) => a * b;
const DIVIDE = (a, b) => a / b;

function markDone(list, index) {
  return list.map((item, i) => (i === index ? { ...item, done: true } : item));
}

function FilterButton({ current, flag, setFilter, children }) {
  const style = {
    border: "1px solid dimgray",
    background: current === flag ? "dimgray" : "transparent",
    color: current === flag ? "white" : "dimgray",
    padding: "4px 10px",
  };
  return (
    <button style={style} onClick={() => setFilter(flag)}>
      {children}
    </button>
  );
}

function Task({ task, done, markDone }) {
  const paragraphStyle = {
    color: done ? "gray" : "white",
    borderLeft: "2px solid",
  };
  const buttonStyle = {
    border: "none",
    background: "transparent",
    display: "inline",
    color: "inherit",
  };
  return (
    <p style={paragraphStyle}>
      <button style={buttonStyle} onClick={done ? null : markDone}>
        {done ? "✓ " : "◯ "}
      </button>
      {task}
    </p>
  );
}

function App() {
  const items = ["First", "Second", "Third"];
  const itemsApplication = [
    { task: "First", done: false, index: 0 },
    { task: "Second", done: false, index: 1 },
    { task: "Third", done: false, index: 2 },
  ];
  return (
    <div className="App">
      <TodoApplication initialList={itemsApplication} />
    </div>
  );
}

function TodoApplication({ initialList }) {
  const [todos, setTodos] = useState(initialList);
  const [hideDone, setHideDone] = useState(false);
  const filteredTodos = hideDone ? todos.filter(({ done }) => !done) : todos;

  return (
    <main>
      <div style={{ display: "flex" }}>
        <FilterButton current={hideDone} flag={false} setFilter={setHideDone}>
          Show all
        </FilterButton>
        <FilterButton current={hideDone} flag={true} setFilter={setHideDone}>
          Hide done
        </FilterButton>
      </div>
      {filteredTodos.map((todo, index) => (
        <Task
          key={todo.task}
          task={todo.task}
          done={todo.done}
          markDone={() => setTodos((value) => markDone(value, todo.index))}
        />
      ))}
    </main>
  );
}

function TodoList({ initialList }) {
  const [todos, setTodos] = useState(initialList);
  return (
    <main>
      <h1>Todo List</h1>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button
              onClick={() =>
                setTodos((value) => [
                  ...value.slice(0, index),
                  ...value.slice(index + 1),
                ])
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

function Calculator({ a, b }) {
  const [operator, setOperator] = useState(() => PLUS);
  return (
    <main>
      <h1>Calculator</h1>
      <button onClick={() => setOperator(() => PLUS)}>+</button>
      <button onClick={() => setOperator(() => MINUS)}>-</button>
      <button onClick={() => setOperator(() => MULTIPLY)}>x</button>
      <button onClick={() => setOperator(() => DIVIDE)}>/</button>
      <p>
        Result of applying operator to {a} and {b}:
        <code> {operator(a, b)}</code>
      </p>
    </main>
  );
}

function Accordion() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <main>
      <h2 style={{ display: "flex", gap: "6px" }}>Accordion</h2>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>
      {isExpanded && (
        <section>
          <p>
            This is the expanded content of the accordion. It is visible when
            the accordion is expanded.
          </p>
        </section>
      )}
    </main>
  );
}

function Counter({ isVisible, start = 0 }) {
  const [counter, setCounter] = useState(start);
  if (isVisible === false) {
    return null;
  }
  return (
    <div>
      <p>Count: {counter}</p>
      <button
        onClick={() => {
          console.log("Incrementing counter");
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          console.log("Decrementing counter");
          setCounter(counter - 10);
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          console.log("Resetting counter");
          setCounter(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
