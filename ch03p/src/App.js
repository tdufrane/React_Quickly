import { Component, useMemo } from "react";
import "./App.css";

function App() {
  return (
    <main>
      <Gallery />
    </main>
  );
}

function Gallery() {
  return (
    <section style={{ display: "flex" }}>
      <Image index="1003" title="Deer" width="300" height="300" />
      <Image index="1020" title="Bear" width="150" height="150" />
      <Image index="1024" title="Vulture" width="150" height="150" />
      <Image index="1084" title="Walrus" width="150" height="150" />
    </section>
  );
}

/*class Image extends Component {
  constructor(props) {
    super(props);
    this.id = `image-${Math.floor(Math.random() * 10000)}`;
  }

  getImageSource() {
    return `//picsum.photos/id/${this.props.index}/${this.props.width}/${this.props.height}/`;
  }
  render() {
    return (
      <figure style={{ margin: "5px" }} id={this.id}>
        <img src={this.getImageSource()} alt={this.props.title} />
        <figcaption>{this.props.title}</figcaption>
      </figure>
    );
  }
}*/

function Image({ index, title, width, height }) {
  const id = useMemo(() => `image-${Math.floor(Math.random() * 10000)}`, []);
  const getImageSource = () => {
    return `//picsum.photos/id/${index}/${width}/${height}/`;
  };
  return (
    <figure style={{ margin: "5px" }} id={id}>
      <img src={getImageSource()} alt={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function Menu() {
  return (
    <nav className="menu">
      <h1 className="menu-title">Main Menu</h1>
      <ul className="menu">
        <MenuItem href="#home" label="Home" />
        <MenuItem href="#about" label="About" id="about-link" />
        <MenuItem href="#services" label="Services" />
        <MenuItem href="#contact" label="Contact" target="_blank" />
      </ul>
    </nav>
  );
}

function MenuItem({ href, label, target = "_self", ...rest }) {
  return (
    <li className="menu-item">
      <a className="menu-link" href={href} target={target} {...rest}>
        {label}
      </a>
    </li>
  );
}

export default App;
