import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const codeExample = `<nav id="cd-vertical-nav">
  <ul>
    <li>
      <a
        href="#buttons"
        data-number="1"
        className=""
        onClick={e => {
          e.preventDefault();
          this.smoothScroll("buttons");
        }}
      >
        <span className="cd-dot" />
        <span className="cd-label">Basic Elements</span>
      </a>
    </li>
  </ul>
</nav>`;

function SideDots() {
  return (
    <div>
      <h1>SideDots</h1>
      <p>
        This is a small navigation that appears on the right side{" "}
        <Link to="/components">Components</Link> and{" "}
        <Link to="/sections">Sections</Link> Pages that makes it a bit easier
        for your to navigate on these pages.
      </p>
      <p>
        This component you will not find in our <code>src/components</code>{" "}
        folder file, this is just a static component made just inside the above
        pages.
      </p>
      <p>
        For it to work properly if you want to add them in another page you need
        to move the following functions inside your page:
      </p>
      <ul>
        <li>
          <code>componentDidMount()</code>
        </li>
        <li>
          <code>componentDidUpdate()</code>
        </li>
        <li>
          <code>componentWillUnmount()</code>
        </li>
        <li>
          <code>easeInOutQuad(t, b, c, d)</code>
        </li>
        <li>
          <code>updateView()</code>
        </li>
        <li>
          <code>smoothScroll(target)</code>
        </li>
        <li>
          <code>scrollTo(element, to, duration)</code>
        </li>
      </ul>
      <p>
        All these functions you can copy/paste from any of the above mentioned
        pages.
      </p>
      <p>
        For the component itself you need to copy{" "}
        <code>{`<nav id="cd-vertical-nav">`}</code> and all of it's contents
        from one of the above mentioned pages.
      </p>
      <h2>Small sample code</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExample}
      </SyntaxHighlighter>
      <p>You will need three things to make the SideDots work.</p>
      <p>
        As you can see, in the sampe code we have an href to an id set to our
        anchor element, you will need to add this id somewhere in your page as
        well and where you add that id (on the component) you will also need to
        add the class <code>cd-section</code>, for the example above, it will
        look like this:
      </p>
      <SyntaxHighlighter language="jsx" style={prism}>
        {`<div id="buttons" className="cd-section">`}
      </SyntaxHighlighter>
      <p>
        So the three things that were mentioned above are{" "}
        <code>the required functions</code>,{" "}
        <code>the actual code (sample code above)</code> and{" "}
        <code>the id set on a tag / component</code>
      </p>
      <h2>Styles</h2>
      <p>
        You will find these styles inside{" "}
        <code>src/assets/scss/core/_misc.scss</code> from <code>line 138</code>{" "}
        to <code>line 226</code>, as you will see, the styels are made through
        it's id.
      </p>
    </div>
  );
}

export default SideDots;
