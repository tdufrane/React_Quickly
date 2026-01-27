import React from "react";
import ReactDOM from "react-dom/client";

const world = React.createElement("em", null, "world");
const title = React.createElement("h1", null, "Hello ", world, "!");

const link = React.createElement(
  "a",
  { href: "https://reactjs.org" },
  "Learn React",
);
class MyComponent extends React.Component {
  render() {
    return React.createElement(
      "p",
      null,
      React.createElement(
        "strong",
        null,
        `${this.props.newValue || "No value passed"} This is my component. ${
          this.props.framework || "React no passed value"
        }`,
      ),
    );
  }
}
class TestComponent extends React.Component {
  render() {
    console.log(Object.isFrozen(this.props));
    return React.createElement("div");
  }
}
class Link extends React.Component {
  render() {
    return React.createElement(
      "p",
      null,
      React.createElement("a", { href: this.props.url }, this.props.children),
    );
  }
}
const boldReact = React.createElement("strong", null, "React");
const link1 = React.createElement(Link, { url: "//react.dev" }, boldReact);
const test = React.createElement(TestComponent);
const linkWithComponent = React.createElement(MyComponent, {
  framework: "Testing",
  newValue: "New Value",
});
const linkWithComponentAlt = React.createElement(MyComponent);
const description = React.createElement("strong", null, "Description:");
const group = React.createElement(
  React.Fragment,
  null,
  title,
  link,
  linkWithComponent,
  linkWithComponentAlt,
  test,
  link1,
);
const domElement = document.getElementById("root");
ReactDOM.createRoot(domElement).render(group);
