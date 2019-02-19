/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

import SectionNavbars from "views/ComponentsPage/Sections/SectionNavbars.jsx";

const codeExample = `import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import Settings from "@material-ui/icons/Settings";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";

import image from "assets/img/bg.jpg";
import profileImage from "assets/img/faces/avatar.jpg";

class SectionNavbars extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={\`\${classes.section} cd-section\`} id="navigation">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <div className={classes.title}>
                <h3>Menu</h3>
              </div>
              <Header
                brand="Menu"
                color="primary"
                links={
                  <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                      <Button
                        href="#pablo"
                        className={
                          classes.navLink + " " + classes.navLinkActive
                        }
                        onClick={e => e.preventDefault()}
                        color="transparent"
                      >
                        Link
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Button
                        href="#pablo"
                        className={classes.navLink}
                        onClick={e => e.preventDefault()}
                        color="transparent"
                      >
                        Link
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <CustomDropdown
                        buttonText="Dropdown"
                        dropdownHeader="Dropdown Header"
                        buttonProps={{
                          className: classes.navLink,
                          color: "transparent"
                        }}
                        dropdownList={[
                          "Action",
                          "Another action",
                          "Something else here",
                          { divider: true },
                          "Separated link",
                          { divider: true },
                          "One more separated link"
                        ]}
                      />
                    </ListItem>
                  </List>
                }
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <div className={classes.title}>
                <h3>Menu with Icons</h3>
              </div>
              <Header
                brand="Icons"
                color="info"
                links={
                  <List className={classes.list + " " + classes.mlAuto}>
                    <ListItem className={classes.listItem}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.navLink}
                      >
                        <Email />
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.navLink}
                      >
                        <Face />
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <CustomDropdown
                        left
                        dropdownHeader="Dropdown Header"
                        buttonIcon={Settings}
                        buttonProps={{
                          className: classes.navLink,
                          color: "transparent"
                        }}
                        dropdownList={[
                          "Action",
                          "Another action",
                          "Something else here",
                          { divider: true },
                          "Separated link",
                          { divider: true },
                          "One more separated link"
                        ]}
                      />
                    </ListItem>
                  </List>
                }
              />
            </GridItem>
          </GridContainer>
          <div className={classes.title}>
            <h3>Navigation</h3>
          </div>
        </div>
        <div id="navbar" className={classes.navbar}>
          <div
            className={classes.navigation}
            style={{ backgroundImage: "url(" + image + ")" }}
          >
            <Header
              brand="Brand"
              color="rose"
              links={
                <div className={classes.collapse}>
                  <List className={classes.list + " " + classes.mrAuto}>
                    <ListItem className={classes.listItem}>
                      <Button
                        href="#pablo"
                        className={
                          classes.navLink + " " + classes.navLinkActive
                        }
                        onClick={e => e.preventDefault()}
                        color="transparent"
                      >
                        Link
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Button
                        href="#pablo"
                        className={classes.navLink}
                        onClick={e => e.preventDefault()}
                        color="transparent"
                      >
                        Link
                      </Button>
                    </ListItem>
                  </List>
                  <div className={classes.mlAuto}>
                    <CustomInput
                      white
                      inputRootCustomClasses={classes.inputRootCustomClasses}
                      formControlProps={{
                        className: classes.formControl
                      }}
                      inputProps={{
                        placeholder: "Search",
                        inputProps: {
                          "aria-label": "Search",
                          className: classes.searchInput
                        }
                      }}
                    />
                    <Button color="white" justIcon round>
                      <Search className={classes.searchIcon} />
                    </Button>
                  </div>
                </div>
              }
            />
            <Header
              brand="Info Color"
              color="info"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink + " " + classes.navLinkActive}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Discover
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Profile
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Settings
                    </Button>
                  </ListItem>
                </List>
              }
            />
            <Header
              brand="Primary Color"
              color="primary"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink + " " + classes.navLinkActive}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <Explore /> Discover
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <AccountCircle /> Profile
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <Settings /> Settings
                    </Button>
                  </ListItem>
                </List>
              }
            />
            <Header
              brand="Navbar with notifications"
              color="dark"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Discover
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Wishlist
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.notificationNavLink}
                      onClick={e => e.preventDefault()}
                      color="rose"
                      justIcon
                      round
                    >
                      <Email />
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      left
                      caret={false}
                      hoverColor="dark"
                      dropdownHeader="Dropdown Header"
                      buttonText={
                        <img
                          src={profileImage}
                          className={classes.img}
                          alt="profile"
                        />
                      }
                      buttonProps={{
                        className:
                          classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Me",
                        "Settings and other stuff",
                        "Sign out"
                      ]}
                    />
                  </ListItem>
                </List>
              }
            />
            <Header
              brand="Navbar with profile"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Discover
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Wishlist
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.registerNavLink}
                      onClick={e => e.preventDefault()}
                      color="rose"
                      round
                    >
                      Register
                    </Button>
                  </ListItem>
                </List>
              }
            />
            <Header
              brand="Transparent"
              color="transparent"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      color="transparent"
                      className={
                        classes.navLink + " " + classes.socialIconsButton
                      }
                    >
                      <i
                        className={
                          classes.socialIcons +
                          " " +
                          classes.marginRight5 +
                          " fab fa-twitter"
                        }
                      />{" "}
                      Twitter
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      color="transparent"
                      className={
                        classes.navLink + " " + classes.socialIconsButton
                      }
                    >
                      <i
                        className={
                          classes.socialIcons +
                          " " +
                          classes.marginRight5 +
                          " fab fa-facebook"
                        }
                      />{" "}
                      Facebook
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      color="transparent"
                      className={
                        classes.navLink + " " + classes.socialIconsButton
                      }
                    >
                      <i
                        className={
                          classes.socialIcons +
                          " " +
                          classes.marginRight5 +
                          " fab fa-instagram"
                        }
                      />{" "}
                      Instagram
                    </Button>
                  </ListItem>
                </List>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(navbarsStyle)(SectionNavbars);
`;

const codeProps = `Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  links: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};`;

function Header() {
  return (
    <div>
      <h1>Header / Navbar</h1>
      <p>This is the top navigation of our demo app.</p>
      <p>
        It was made using{" "}
        {
          " "
          // eslint-disable-next-line
        }
        <a href="https://material-ui-next.com/demos/app-bar/" target="_blank">
          Material-UI's AppBar
        </a>
        , but with some custom styling.
      </p>
      <p>
        You will find this component in{" "}
        <code>src/components/Header/Header.jsx</code>. In this component, there
        is just the structure of the navbar. The links can be found in{" "}
        <code>src/components/Header/HeaderLinks.jsx</code>. We've done this
        because on responsive we create a <code>Sidebar</code> /{" "}
        <code>Drawer</code> with all these links, and we wanted to only write
        them once.
      </p>
      <p>
        You can choose between 9 colors by using the <code>color</code>{" "}
        property.
      </p>
      <p>
        If this property is not set, then the Appbar will be <b>white</b>.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/jss/material-kit-pro-react/components/headerStyle.jsx
        </code>
        .
        <br />
        And you will find the styles for the links inside <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx
        </code>
      </p>
      <h2>Examples</h2>
      <div className="border-example">
        <SectionNavbars />
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

export default Header;
