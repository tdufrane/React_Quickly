import { useState } from "react";
import MenuContext from "./Context";
import AuthContext from "./AuthContext";
import Menu from "./Menu";
import Main from "./Main";
import Footer from "./Footer";
import useLinks from "./hooks/useLinks";
import "./style.css";

function App() {
  const { links, loading, error } = useLinks();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <MenuContext.Provider value={links}>
        <header>
          <Menu />
        </header>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </MenuContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
