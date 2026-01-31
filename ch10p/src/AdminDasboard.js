import { createContext, useContext, useState } from "react";
import { BUTTON_STYLE, HEADER_STYLE } from "./Constant";

const NameContext = createContext();

function Button({ children }) {
  return <button style={BUTTON_STYLE}>{children}</button>;
}
function UserButton() {
  const name = useContext(NameContext);
  return <Button> {name}</Button>;
}
function Header() {
  return (
    <header style={HEADER_STYLE}>
      <Button>Home</Button>
      <Button>Groups</Button>
      <Button>Profile</Button>
      <UserButton />
    </header>
  );
}
function Welcome() {
  const name = useContext(NameContext);
  return (
    <section>
      <h1>Welcome, {name}!</h1>
    </section>
  );
}
function Main() {
  return (
    <main>
      <Welcome />
    </main>
  );
}
function Dashboard({ name }) {
  return (
    <NameContext.Provider value={name}>
      <Header />
      <Main />
    </NameContext.Provider>
  );
}
function AdminDashboard() {
  const [user, setUser] = useState("Alice");
  return (
    <>
      <h1>Admin Dashboard</h1>
      <select
        name="UserName"
        value={user}
        onChange={(evt) => setUser(evt.target.value)}
      >
        <option>Alice</option>
        <option>Bob</option>
        <option>Carol</option>
      </select>
      <Dashboard name={user} />
    </>
  );
}
export default AdminDashboard;
