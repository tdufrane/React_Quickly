import { useState } from "react";
import "./App.css";
import List from "./List";
import Add from "./Add";

const PLACEHOLDER = `conic-gradient(
gray 0.25turn, white 0 0.5turn,
gray 0 0.75turn, white 0 1turn
)`;

function App() {
  return (
    <div className="App">
      <h1>Various Controlled Components</h1>
      <section>
        <h2>To-do List</h2>
        <ToDoList />
      </section>
    </div>
  );
}

function NaturalSum() {
  const [sum, setSum] = useState(0);
  const onSubmit = (evt) => {
    const value = evt.target.elements.operand.valueAsNumber;
    const naturalSum = (value * (value + 1)) / 2;
    setSum(naturalSum);
    evt.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label>
        Number:
        <input type="number" min="1" defaultValue="1" name="operand" />
      </label>
      <div>
        <button>Submit</button>
      </div>
      <div>Sum: {sum}</div>
    </form>
  );
}
function ToDoList() {
  const [items, setItems] = useState([]);
  const [isAdding, setAdding] = useState(false);
  const handleDelete = (item) =>
    setItems((oldItems) => oldItems.filter((oldItem) => oldItem !== item));
  const handleAdd = (newItem) => {
    setItems((oldItems) => oldItems.concat([newItem]));
    setAdding(false);
  };
  const handleCancel = () => setAdding(false);

  return (
    <main>
      <nav>
        <button onClick={() => setAdding(false)}>View list</button>
        <button onClick={() => setAdding(true)}>Add new item</button>
      </nav>
      {isAdding ? (
        <Add handleAdd={handleAdd} handleCancel={handleCancel} />
      ) : (
        <List items={items} handleDelete={handleDelete} />
      )}
    </main>
  );
}

function Address() {
  const [data, setData] = useState({
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    country: "",
  });
  const onChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    setData((oldData) => ({ ...oldData, [key]: value }));
  };
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label>
        Address line 1:
        <input name="address1" value={data.address1} onChange={onChange} />
      </label>
      <label>
        Address line 2:
        <input name="address2" value={data.address2} onChange={onChange} />
      </label>
      <label>
        Zip:
        <input name="zip" value={data.zip} onChange={onChange} />
      </label>
      <label>
        City:
        <input name="city" value={data.city} onChange={onChange} />
      </label>
      <label>
        State:
        <input name="state" value={data.state} onChange={onChange} />
      </label>
      <label>
        Country:
        <input name="country" value={data.country} onChange={onChange} />
      </label>
      <pre>{JSON.stringify(data, true, 2)}</pre>
    </form>
  );
}
function TicketNumber() {
  const [ticketNumber, setTicketNumber] = useState("");
  const onChange = (evt) => {
    const [first = "", second = ""] = evt.target.value
      .replace(/[^0-9a-z]/gi, "")
      .slice(0, 6)
      .match(/.{0,3}/g);
    const value = first.length === 3 ? `${first}-${second}` : first;
    setTicketNumber(value.toUpperCase());
  };
  const isValid = ticketNumber.length === 7;
  return (
    <form style={{ display: "flex" }}>
      <label>
        Ticket number:
        <input
          value={ticketNumber}
          onChange={onChange}
          placeholder="E.g. R1S-T2U"
        />
      </label>
      <span>{isValid ? "✓" : "✗"}</span>
    </form>
  );
}
function HexColor() {
  const [color, setColor] = useState("BADA55");
  const onChange = (evt) =>
    setColor(evt.target.value.replace(/[^0-9a-f]/gi, "").toUpperCase());
  const outputStyle = {
    width: "20px",
    height: "20px",
    border: "1px solid",
    background: color.length === 6 ? `#${color}` : PLACEHOLDER,
  };
  return (
    <form style={{ display: "flex" }}>
      <label>
        Hex color:
        <input value={color} onChange={onChange} />
      </label>
      <span style={outputStyle} />
    </form>
  );
}
function Sum() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const onChangeFirst = (e) => setFirst(Number(e.target.value));
  const onChangeSecond = (e) => setSecond(Number(e.target.value));
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label>
        A:
        <input type="number" value={first} onChange={onChangeFirst} />
      </label>
      <label>
        B:
        <input type="number" value={second} onChange={onChangeSecond} />
      </label>
      <div>A+B: {first + second}</div>
    </form>
  );
}

export default App;
