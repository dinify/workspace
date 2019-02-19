/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
import { Link } from "react-router-dom";
// core components
import NavPillss from "components/NavPills/NavPills.jsx";

const codeExample = `import React from 'react';
// core components
import NavPills from "components/NavPills/NavPills.jsx";

function Example(){
  return (
    <NavPills
      color="warning"
      tabs={[
        {
          tabButton: "Profile",
          tabContent: (
            <span>
              <p>
                Collaboratively administrate empowered markets via
                plug-and-play networks. Dynamically procrastinate
                B2C users after installed base benefits.
              </p>
              <br />
              <p>
                Dramatically visualize customer directed convergence
                without revolutionary ROI. Collaboratively
                administrate empowered markets via plug-and-play
                networks. Dynamically procrastinate B2C users after
                installed base benefits.
              </p>
              <br />
              <p>This is very nice.</p>
            </span>
          )
        },
        {
          tabButton: "Settings",
          tabContent: (
            <span>
              <p>
                Efficiently unleash cross-media information without
                cross-media value. Quickly maximize timely
                deliverables for real-time schemas.
              </p>
              <br />
              <p>
                Dramatically maintain clicks-and-mortar solutions
                without functional solutions.
              </p>
            </span>
          )
        },
        {
          tabButton: "Options",
          tabContent: (
            <span>
              <p>
                Completely synergize resource taxing relationships
                via premier niche markets. Professionally cultivate
                one-to-one customer service with robust ideas.{" "}
              </p>
              <br />
              <p>
                Dynamically innovate resource-leveling customer
                service for state of the art customer service.
              </p>
            </span>
          )
        }
      ]}
    />
  );
}

export default Example;
`;
const codeProps = `NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};`;

function NavPills() {
  return (
    <div>
      <h1>NavPills</h1>
      <p>
        This component extends{" "}
        {
          " "
          // eslint-disable-next-line
        }
        <a href="https://material-ui-next.com/demos/tabs/" target="_blank">
          material-ui tabs compoent
        </a>
        . we've done this to make it more easier for you to use our styles.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/jss/material-kit-pro-react/components/navPillsStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <p>
        You can see more example in{" "}
        <Link to="/components/panels">Panels view</Link>.
      </p>
      <div className="border-example-8">
        <NavPillss
          color="warning"
          tabs={[
            {
              tabButton: "Profile",
              tabContent: (
                <span>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                  </p>
                  <br />
                  <p>
                    Dramatically visualize customer directed convergence without
                    revolutionary ROI. Collaboratively administrate empowered
                    markets via plug-and-play networks. Dynamically
                    procrastinate B2C users after installed base benefits.
                  </p>
                  <br />
                  <p>This is very nice.</p>
                </span>
              )
            },
            {
              tabButton: "Settings",
              tabContent: (
                <span>
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                  </p>
                  <br />
                  <p>
                    Dramatically maintain clicks-and-mortar solutions without
                    functional solutions.
                  </p>
                </span>
              )
            },
            {
              tabButton: "Options",
              tabContent: (
                <span>
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.{" "}
                  </p>
                  <br />
                  <p>
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </span>
              )
            }
          ]}
        />
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExample}
      </SyntaxHighlighter>
      <h2>Props</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
    </div>
  );
}

export default NavPills;
