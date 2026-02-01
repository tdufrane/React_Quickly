import Context from "./Context";
import Menu from "./Menu";
import Main from "./Main";
import Footer from "./Footer";
import "./style.css";

function App() {
  const links = [
    { title: "Home", href: "/", icon: "home" },
    { title: "Services", href: "/services", icon: "services" },
    { title: "Pricing", href: "/pricing", icon: "pricing" },
    { title: "Blog", href: "/blog", icon: "blog" },
  ];
  return (
    <Context.Provider value={links}>
      <header>
        <Menu />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </Context.Provider>
  );
}

export default App;
