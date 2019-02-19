/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const fileStructure = `material-kit-pro-react
.
├── CHANGELOG.md
├── README.md
├── package.json
├── Documentation
│   ├── assets
│   └── tutorial-components.html
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    ├── logo.svg
    ├── routes
    │   └── index.jsx
    ├── assets
    │   ├── img
    │   │   ├── assets-for-demo
    │   │   │   ├── example-pages
    │   │   │   ├── ourClients
    │   │   │   ├── presentationViewSectionComponent
    │   │   │   └── sections
    │   │   ├── examples
    │   │   ├── faces
    │   │   ├── flags
    │   │   └── sections
    │   ├── jss
    │   │   ├── material-kit-pro-react
    │   │   │   ├── components
    │   │   │   └── views
    │   │   │       ├── aboutUsSections
    │   │   │       ├── blogPostSections
    │   │   │       ├── blogPostsSections
    │   │   │       ├── componentsSections
    │   │   │       ├── ecommerceSections
    │   │   │       ├── landingPageSections
    │   │   │       ├── presentationSections
    │   │   │       ├── pricingSections
    │   │   │       └── sectionsSections
    │   │   └── material-kit-pro-react.jsx
    │   └── scss
    │       ├── core
    │       │   ├── mixins
    │       │   └── variables
    │       ├── material-kit-pro-react.scss
    │       └── plugins
    ├── components
    │   ├── Accordion
    │   │   └── Accordion.jsx
    │   ├── Badge
    │   │   └── Badge.jsx
    │   ├── Card
    │   │   ├── Card.jsx
    │   │   ├── CardAvatar.jsx
    │   │   ├── CardBody.jsx
    │   │   ├── CardFooter.jsx
    │   │   └── CardHeader.jsx
    │   ├── Clearfix
    │   │   └── Clearfix.jsx
    │   ├── CustomButtons
    │   │   └── Button.jsx
    │   ├── CustomDropdown
    │   │   └── CustomDropdown.jsx
    │   ├── CustomFileInput
    │   │   └── CustomFileInput.jsx
    │   ├── CustomInput
    │   │   └── CustomInput.jsx
    │   ├── CustomLinearProgress
    │   │   └── CustomLinearProgress.jsx
    │   ├── CustomTabs
    │   │   └── CustomTabs.jsx
    │   ├── CustomUpload
    │   │   └── ImageUpload.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Grid
    │   │   ├── GridContainer.jsx
    │   │   └── GridItem.jsx
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── HeaderLinks.jsx
    │   ├── InfoArea
    │   │   └── InfoArea.jsx
    │   ├── Instruction
    │   │   └── Instruction.jsx
    │   ├── Media
    │   │   └── Media.jsx
    │   ├── NavPills
    │   │   └── NavPills.jsx
    │   ├── Pagination
    │   │   └── Pagination.jsx
    │   ├── Parallax
    │   │   └── Parallax.jsx
    │   ├── Snackbar
    │   │   └── SnackbarContent.jsx
    │   ├── Table
    │   │   └── Table.jsx
    │   └── Typography
    │       ├── Danger.jsx
    │       ├── Info.jsx
    │       ├── Muted.jsx
    │       ├── Primary.jsx
    │       ├── Quote.jsx
    │       ├── Rose.jsx
    │       ├── Small.jsx
    │       ├── Success.jsx
    │       └── Warning.jsx
    └── views
        ├── AboutUsPage
        │   ├── AboutUsPage.jsx
        │   └── Sections
        │       ├── SectionContact.jsx
        │       ├── SectionDescription.jsx
        │       ├── SectionOffice.jsx
        │       ├── SectionServices.jsx
        │       └── SectionTeam.jsx
        ├── BlogPostPage
        │   ├── BlogPostPage.jsx
        │   └── Sections
        │       ├── SectionBlogInfo.jsx
        │       ├── SectionComments.jsx
        │       ├── SectionSimilarStories.jsx
        │       └── SectionText.jsx
        ├── BlogPostsPage
        │   ├── BlogPostsPage.jsx
        │   └── Sections
        │       ├── SectionImage.jsx
        │       ├── SectionInterested.jsx
        │       ├── SectionPills.jsx
        │       └── SubscribeLine.jsx
        ├── ComponentsPage
        │   ├── ComponentsPage.jsx
        │   └── Sections
        │       ├── SectionBasics.jsx
        │       ├── SectionCards.jsx
        │       ├── SectionCarousel.jsx
        │       ├── SectionContentAreas.jsx
        │       ├── SectionFooter.jsx
        │       ├── SectionJavascript.jsx
        │       ├── SectionNavbars.jsx
        │       ├── SectionNotifications.jsx
        │       ├── SectionPills.jsx
        │       ├── SectionPreFooter.jsx
        │       ├── SectionTabs.jsx
        │       └── SectionTypography.jsx
        ├── ContactUsPage
        │   └── ContactUsPage.jsx
        ├── EcommercePage
        │   ├── EcommercePage.jsx
        │   └── Sections
        │       ├── SectionBlog.jsx
        │       ├── SectionLatestOffers.jsx
        │       └── SectionProducts.jsx
        ├── ErrorPage
        │   └── ErrorPage.jsx
        ├── LandingPage
        │   ├── LandingPage.jsx
        │   └── Sections
        │       ├── SectionProduct.jsx
        │       ├── SectionTeam.jsx
        │       └── SectionWork.jsx
        ├── LoginPage
        │   └── LoginPage.jsx
        ├── PresentationPage
        │   ├── PresentationPage.jsx
        │   └── Sections
        │       ├── SectionCards.jsx
        │       ├── SectionComponents.jsx
        │       ├── SectionContent.jsx
        │       ├── SectionDescription.jsx
        │       ├── SectionExamples.jsx
        │       ├── SectionFreeDemo.jsx
        │       ├── SectionOverview.jsx
        │       ├── SectionPricing.jsx
        │       └── SectionSections.jsx
        ├── PricingPage
        │   ├── PricingPage.jsx
        │   └── Sections
        │       ├── SectionFeatures.jsx
        │       └── SectionPricing.jsx
        ├── ProductPage
        │   └── ProductPage.jsx
        ├── ProfilePage
        │   └── ProfilePage.jsx
        ├── SectionsPage
        │   ├── Sections
        │   │   ├── SectionBlogs.jsx
        │   │   ├���─ SectionContacts.jsx
        │   │   ├── SectionFeatures.jsx
        │   │   ├── SectionHeaders.jsx
        │   │   ├── SectionPricing.jsx
        │   │   ├── SectionProjects.jsx
        │   │   ├── SectionTeams.jsx
        │   │   └── SectionTestimonials.jsx
        │   └── SectionsPage.jsx
        ├── ShoppingCartPage
        │   └── ShoppingCartPage.jsx
        └── SignupPage
            └── SignupPage.jsx`;

function Tutorial() {
  return (
    <div>
      <h1>Tutorial</h1>
      <h2>License</h2>
      <p>
        Copyright (c) 2018{" "}
        <a
          href="https://creative-tim.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Tim
        </a>
        .
      </p>
      <p>
        When you purchase an item from Creative Tim, you are actually purchasing
        a license to use that item. All our free items are under MIT license.
        All our premium items are covered by our Personal and Developer
        licenses. In order to understand the rights and restrictions that come
        with your purchase, please read the details from our{" "}
        <a
          href="https://www.creative-tim.com/license?ref=license-page-material-kit-pro-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official License Page
        </a>
        .
      </p>
      <h2>Getting started</h2>
      <p>
        <b>Material Kit Pro React</b> is built on top of{" "}
        <a href="https://material-ui-next.com/" target="_blank">
          Material UI
        </a>{" "}
        using{" "}
        <a
          href="https://github.com/facebook/create-react-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          create-react-app
        </a>{" "}
        (at the moment, we do not support TypeScript with React).
      </p>
      <p>
        You can convert our theme to TypeScript support by{" "}
        <a
          href="https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues/14"
          target="_blank"
          rel="noopener noreferrer"
        >
          reading this thread
        </a>
        .
      </p>
      <h3>Local Development</h3>
      <ul>
        <li>
          Install NodeJs from{" "}
          <a href="https://nodejs.org/en/" target="_blank">
            NodeJs Official Page
          </a>
        </li>
        <li>
          Go to{" "}
          <a href="https://creative-tim.com" target="_blank">
            creative tim website
          </a>{" "}
          and login into your account
        </li>
        <li>
          Go to{" "}
          <a href="https://www.creative-tim.com/downloads" target="_blank">
            downloads
          </a>{" "}
          section on creative tim website (be sure to be logged into your
          account) - after you've bought the theme
        </li>
        <li>
          Press the download button near <b>Material Kit Pro React</b> product
          (this will download onto your computer a zip file)
        </li>
        <li>Unzip the downloaded file to a folder in your computer</li>
        <li>Open Terminal</li>
        <li>Go to your file project (where you've unzipped the product)</li>
        <li>Run in terminal</li>
        <pre className="code">
          <code>npm install</code>
        </pre>
        <li>
          Then run
          <pre className="code">
            <code>npm start</code>
          </pre>
        </li>
        <li>
          Alternatively you can run{" "}
          <SyntaxHighlighter
            language="jsx"
            style={prism}
          >{`npm run install:clean`}</SyntaxHighlighter>{" "}
          which will delete <code>node_modules</code>,{" "}
          <code>package-lock.json</code>, automatically run <code>install</code>{" "}
          script and <code>start</code> script
        </li>
        <li>
          <div>
            If you have an error something containing
            <SyntaxHighlighter
              language="jsx"
              style={prism}
            >{`Module not found`}</SyntaxHighlighter>
            You should check if in your root project folder you have a file
            named <code>.env</code>.
            <br />
            If you do not have it, then create it and add this line in it:{" "}
            <code>NODE_PATH=./src</code>
            <br />
            If that does not work, you need to do the following
            <SyntaxHighlighter
              language="jsx"
              style={prism}
            >{`npm install --g cross-env`}</SyntaxHighlighter>
            then change the <code>script</code> inside <code>package.json</code>{" "}
            by adding <code>NODE_PATH=./src</code> inside it. For example, the
            start script would be changed from
            <SyntaxHighlighter
              language="jsx"
              style={prism}
            >{`"start": "react-scripts start",`}</SyntaxHighlighter>
            to
            <SyntaxHighlighter
              language="jsx"
              style={prism}
            >{`"start": "NODE_PATH=./src react-scripts start",`}</SyntaxHighlighter>
          </div>
        </li>
        <li>
          <div>
            <p>
              If you have an error about <code>props.history is undefined</code>
              , than you're probably not sending inside the <code>Header</code>{" "}
              component the props that come from the routes (everywhere{" "}
              <code>Header</code> is rendered - we pass the{" "}
              <code>{`{...rest}`}</code> to it).
            </p>
            <p>
              You can also read more about{" "}
              <a
                href="https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues/70"
                target="_blank"
                rel="noopener noreferrer"
              >
                this issue here
              </a>
              .
            </p>
          </div>
        </li>
        <li>
          (Optional) You can create a new react application like this
          <ul>
            <li>
              Run in terminal
              <pre className="code">
                <code>npm install -g create-react-app</code>
              </pre>
            </li>
            <li>Go to the folder where you want to create your app</li>
            <li>
              Run in terminal
              <pre className="code">
                <code>create-react-app your-app-name</code>
              </pre>
            </li>
            <li>
              Navigate to <code>your-app-name</code>
            </li>
            <li>
              Run in terminal
              <pre className="code">
                <code>npm start</code>
              </pre>
            </li>
            <li>
              More information →
              <a
                href="https://github.com/facebook/create-react-app"
                target="_blank"
              >
                create-react-app
              </a>
            </li>
          </ul>
        </li>
        <li>
          Navigate to →
          <a href="https://localhost:3000" target="_blank">
            {" "}
            https://localhost:3000
          </a>
        </li>
        <li>
          More information →{" "}
          <a href="https://reactjs.org/" target="_blank">
            react
          </a>
        </li>
      </ul>
      <h3>Live Production</h3>
      <ul>
        <li>
          <a
            href="https://blog.heroku.com/deploying-react-with-zero-configuration"
            target="_blank"
          >
            tutorial for deploying on heroku
          </a>
        </li>
        <li>
          <a
            href="https://medium.freecodecamp.org/surge-vs-github-pages-deploying-a-create-react-app-project-c0ecbf317089"
            target="_blank"
          >
            tutorial for deploying on github pages and surge
          </a>
        </li>
        <li>
          <a
            href="https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af"
            target="_blank"
          >
            tutorial for deploying on S3 and CloudFront
          </a>
        </li>
      </ul>
      <h2>Files and Folders structure</h2>
      <SyntaxHighlighter language="http" style={prism}>
        {fileStructure}
      </SyntaxHighlighter>
    </div>
  );
}
export default Tutorial;
