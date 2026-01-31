import { useReducer, useEffect } from "react";
import "./App.css";
import Dashboard1 from "./Dasboard1";
import Dashboard2 from "./Dasboard2";
import AdminDashboard from "./AdminDasboard";
import ButtonsPanel from "./ButtonContext";
import useLoader from "./useLoader";
import useCounter from "./useCounter";

const URL = "//swapi.dev/api/films";
const INITIAL_STATE = {
  status: "INITIALIZE",
  result: null,
  error: null,
};

function App() {
  return (
    <div className="App">
      <StyledCounter />
    </div>
  );
}

function reducer(state, { type }) {
  switch (type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
function Counter() {
  const [counter, dispatch] = useReducer(reducer, 0);
  return (
    <section>
      <h1>Counter: {counter}</h1>
      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
      </div>
    </section>
  );
}

function Loader() {
  const [state, dispatch] = useLoader(INITIAL_STATE);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch(URL)
      .then((res) => res.json())
      .then(({ results }) =>
        dispatch({
          type: "SUCCESS",
          payload: results,
        }),
      )
      .catch(({ message }) =>
        dispatch({
          type: "FAILURE",
          payload: message,
        }),
      );
  }, [dispatch]);
  const { status, error, result } = state;
  if (status === "INITIALIZE") {
    return <h1>Initializing...</h1>;
  }
  if (status === "LOADING") {
    return <h1>Loading...</h1>;
  }
  if (status === "FAILURE") {
    return <h1>Error occurred: {error}</h1>;
  }
  return (
    <>
      <h1>Results are in</h1>
      <ul>
        {result.map(({ title }) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </>
  );
}

function Button({ handleClick, label }) {
  return <button onClick={handleClick}>{label}</button>;
}

function StyledCounter() {
  const { counter, handleIncrement, handleDecrement } = useCounter();
  return (
    <section>
      <h1>Counter: {counter}</h1>
      <div>
        <Button handleClick={handleIncrement} label="Increment" />
        <Button handleClick={handleDecrement} label="Decrement" />
      </div>
    </section>
  );
}
export default App;
