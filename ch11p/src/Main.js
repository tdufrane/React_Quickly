import useAuth from "./hooks/useAuth";

function Main() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <h1>{isLoggedIn ? "Welcome back!" : "Welcome, please log in"}</h1>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </>
  );
}

export default Main;
