import React from "react";

import Table from "components/Table/Table.jsx";

class BuildTools extends React.Component {
  render() {
    return (
      <>
        <h1 className="bd-title" id="content">
          Build tools
        </h1>
        <h3 id="change-brand-colors">
          <div>Change brand colors</div>
        </h3>
        <ul>
          <li>
            You will find all the branding colors inside{" "}
            <code className="highlighter-rouge">
              src/assets/jss/material-kit-pro-react.jsx
            </code>{" "}
            and inside{" "}
            <code className="highlighter-rouge">
              src/assets/scss/material-kit-pro-react/_variables.scss
            </code>
            .
          </li>
        </ul>
        <h3 id="compile-scss">
          <div>Available commands</div>
        </h3>
        <div className="bd-example">
          <Table
            tableHeaderColor="info"
            tableHead={["#", "Name", "Usage", "Description", "Read More"]}
            tableData={[
              [
                1,
                <code className="highlighter-rouge">install</code>,
                <code className="highlighter-rouge">npm install</code>,
                "This command installs a package, and any packages that it depends on.",
                <a
                  href="https://docs.npmjs.com/cli/install"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                2,
                <code className="highlighter-rouge">start</code>,
                <code className="highlighter-rouge">npm start</code>,
                "This will determinate the start of your development server.",
                <a
                  href="https://facebook.github.io/create-react-app/docs/available-scripts#npm-start"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                3,
                <code className="highlighter-rouge">build</code>,
                <code className="highlighter-rouge">npm run build</code>,
                "This will create a build directory with a production build of your app.",
                <a
                  href="https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-build"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                4,
                <code className="highlighter-rouge">test</code>,
                <code className="highlighter-rouge">npm run test</code>,
                "Runs the test watcher in an interactive mode. (Note that we have not implemented any tests - this command is by default from the create-react-app)",
                <a
                  href="https://facebook.github.io/create-react-app/docs/available-scripts#npm-test"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                5,
                <code className="highlighter-rouge">eject</code>,
                <code className="highlighter-rouge">npm run eject</code>,
                "This command will remove the single build dependency from your project. (We do not recommend using this command. Our product may not work after using this command.)",
                <a
                  href="https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                6,
                <code className="highlighter-rouge">install:clean</code>,
                <code className="highlighter-rouge">
                  npm run install:clean
                </code>,
                <div>
                  This command will remove the{" "}
                  <code className="highlighter-rouge">node_modules</code> folder
                  and{" "}
                  <code className="highlighter-rouge">package_lock.json</code>{" "}
                  file, and will install a fresh copy of them.
                </div>,
                ""
              ],
              [
                7,
                <code className="highlighter-rouge">lint:check</code>,
                <code className="highlighter-rouge">npm run lint:check</code>,
                "Checks for linting errors",
                <a
                  href="https://eslint.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                8,
                <code className="highlighter-rouge">lint:fix</code>,
                <code className="highlighter-rouge">npm run lint:fix</code>,
                "Fixes linting errors (it may not solve all the linting errors)",
                <a
                  href="https://eslint.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              ],
              [
                9,
                <code className="highlighter-rouge">compile-sass</code>,
                <code className="highlighter-rouge">npm run compile-sass</code>,
                <span>
                  This command will compile the scss files located inside{" "}
                  <code className="highlighter-rouge">src/assets/scss/*</code>{" "}
                  into{" "}
                  <code className="highlighter-rouge">
                    src/assets/css/material-dashboard-pro-react.css
                  </code>
                  .
                </span>,
                ""
              ],
              [
                10,
                <code className="highlighter-rouge">minify-sass</code>,
                <code className="highlighter-rouge">npm run minify-sass</code>,
                <span>
                  This command will compile and minify the scss files located
                  inside{" "}
                  <code className="highlighter-rouge">src/assets/scss/*</code>{" "}
                  into{" "}
                  <code className="highlighter-rouge">
                    src/assets/css/material-dashboard-pro-react.min.css
                  </code>
                  .
                </span>,
                ""
              ],
              [
                11,
                <code className="highlighter-rouge">map-sass</code>,
                <code className="highlighter-rouge">npm run map-sass</code>,
                <span>
                  This command will compile and map the scss files located
                  inside{" "}
                  <code className="highlighter-rouge">src/assets/scss/*</code>{" "}
                  into{" "}
                  <code className="highlighter-rouge">
                    src/assets/css/material-dashboard-pro-react.css.map
                  </code>
                  .
                </span>,
                ""
              ]
            ]}
          />
        </div>
      </>
    );
  }
}

export default BuildTools;
