import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import Accordion from "components/Accordion/Accordion.jsx";

import SectionPreFooter from "views/ComponentsPage/Sections/SectionPreFooter.jsx";
import SectionFooter from "views/ComponentsPage/Sections/SectionFooter.jsx";

const codeExamplePreFooter = `import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import bg7 from "assets/img/bg7.jpg";

import styles from "assets/jss/material-kit-pro-react/views/componentsSections/preFooter.jsx";

function SectionPreFooter(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.title}>
          <h3>Pre-Footer Areas</h3>
        </div>
      </div>
      <div
        className={classNames(
          classes.socialLine,
          classes.textCenter,
          classes.white
        )}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={12}>
              <h4 className={classes.title}>Thank you for your support!</h4>
            </GridItem>
            <Button
              color="twitter"
              round
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-twitter" /> Twitter · 2.5K
            </Button>
            <Button
              color="facebook"
              round
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-facebook" /> Facebook · 3.2k
            </Button>
            <Button
              color="google"
              round
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-google-plus-g" /> Google · 1.2k
            </Button>
            <Button
              color="dribbble"
              round
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-dribbble" /> Dribbble · 1.8k
            </Button>
          </GridContainer>
        </div>
      </div>
      <br />
      <br />
      <div
        className={classNames(
          classes.socialLine,
          classes.textCenter,
          classes.white,
          classes.bigIcons
        )}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="twitter"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-twitter" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="facebook"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="google"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-google-plus-g" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="dribbble"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-dribbble" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="youtube"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-youtube" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="instagram"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-instagram" />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <br />
      <div
        className={classNames(
          classes.socialLine,
          classes.textCenter,
          classes.dark,
          classes.bigIcons
        )}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-twitter" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-google-plus-g" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-dribbble" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-youtube" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-instagram" />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <br />
      <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{ backgroundImage: \`url(\${bg7})\` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <div className={classes.textCenter}>
                <h3 className={classes.title}>Subscribe to our Newsletter</h3>
                <p className={classes.description}>
                  Join our newsletter and get news in your inbox every week! We
                  hate spam too, so no worries about this.
                </p>
              </div>
              <Card raised className={classes.card}>
                <CardBody className={classes.cardBody}>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailPreFooter"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.cardForm
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Your Email..."
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="primary"
                          block
                          className={classes.subscribeButton}
                        >
                          subscribe
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <br />
      <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineWhite
        )}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h3 className={classes.title}>Get Tips & Tricks every Week!</h3>
              <p className={classes.description}>
                Join our newsletter and get news in your inbox every week! We
                hate spam too, so no worries about this.
              </p>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card plain>
                <CardBody>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailPreFooter2"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.formFix
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Your Email..."
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="rose"
                          round
                          block
                          className={classes.subscribeButton}
                        >
                          subscribe
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(SectionPreFooter);
`;
const codeExampleFooter = `import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Footer from "components/Footer/Footer.jsx";

import face1 from "assets/img/faces/card-profile6-square.jpg";
import face2 from "assets/img/faces/christian.jpg";
import face3 from "assets/img/faces/card-profile4-square.jpg";
import face4 from "assets/img/faces/card-profile1-square.jpg";
import face5 from "assets/img/faces/marc.jpg";
import face6 from "assets/img/faces/kendall.jpg";
import face7 from "assets/img/faces/card-profile5-square.jpg";
import face8 from "assets/img/faces/card-profile2-square.jpg";

import styles from "assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.jsx";

function SectionFooter(props) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h3>Footer Areas</h3>
        </div>
      </div>
      <div>
        <Footer
          theme="white"
          content={
            <div>
              <div className={classes.left}>
                <a
                  href="https://www.creative-tim.com/product/material-kit-pro-react"
                  className={classes.footerBrand}
                >
                  Material Kit PRO React
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/about-us"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <a href="https://twitter.com/CreativeTim">
                      <i
                        className={
                          "fab fa-twitter" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnTwitter
                        }
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://dribbble.com/creativetim">
                      <i
                        className={
                          "fab fa-dribbble" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnDribbble
                        }
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/CreativeTimOfficial">
                      <i
                        className={
                          "fab fa-instagram" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnInstagram
                        }
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
        <br />
        <br />
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/about-us"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className={classes.aClasses}
                >
                  Creative Tim
                </a>{" "}
                for a better web.
              </div>
            </div>
          }
        />
        <br />
        <br />
        <Footer
          theme="dark"
          content={
            <div>
              <div className={classes.left}>
                <a
                  href="https://www.creative-tim.com/product/material-kit-pro-react"
                  className={classes.footerBrand}
                >
                  Material Kit PRO React
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="http://blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      Presentation
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#pablito"
                      onClick={e => e.preventDefault()}
                      className={classes.block}
                    >
                      Discover
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#pablito"
                      onClick={e => e.preventDefault()}
                      className={classes.block}
                    >
                      Payment
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/contact-us"
                      className={classes.block}
                    >
                      Contact us
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <a href="https://twitter.com/CreativeTim">
                      <i
                        className={
                          "fab fa-twitter" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnTwitter
                        }
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://dribbble.com/creativetim">
                      <i
                        className={
                          "fab fa-dribbble" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnDribbble
                        }
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/CreativeTimOfficial">
                      <i
                        className={
                          "fab fa-instagram" +
                          " " +
                          classes.iconSocial +
                          " " +
                          classes.btnInstagram
                        }
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
        <br />
        <br />
        <Footer
          theme="dark"
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/about-us"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                Copyright &copy; {1900 + new Date().getYear()}{" "}
                <a
                  href="https://www.creative-tim.com"
                  className={classes.aClasses}
                >
                  Creative Tim
                </a>{" "}
                All Rights Reserved.
              </div>
            </div>
          }
        >
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <h5>About Us</h5>
              <p>
                Creative Tim is a startup that creates design tools that make
                the web development process faster and easier.{" "}
              </p>
              <p>
                We love the web and care deeply for how users interact with a
                digital product. We power businesses and individuals to create
                better looking web projects around the world.{" "}
              </p>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <h5>Social Feed</h5>
              <div className={classes.socialFeed}>
                <div>
                  <i className="fab fa-twitter" />
                  <p>How to handle ethical disagreements with your clients.</p>
                </div>
                <div>
                  <i className="fab fa-twitter" />
                  <p>The tangible benefits of designing at 1x pixel density.</p>
                </div>
                <div>
                  <i className="fab fa-facebook-square" />
                  <p>
                    A collection of 25 stunning sites that you can use for
                    inspiration.
                  </p>
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <h5>Instagram Feed</h5>
              <div className={classes.galleryFeed}>
                <img
                  src={face1}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face2}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face3}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face4}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face5}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face6}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face7}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
                <img
                  src={face8}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt="..."
                />
              </div>
            </GridItem>
          </GridContainer>
        </Footer>
        <br />
        <br />
        <Footer
          theme="white"
          content={
            <div className={classNames(classes.pullCenter, classes.copyRight)}>
              Copyright &copy; {1900 + new Date().getYear()}{" "}
              <a href="https://www.creative-tim.com">Creative Tim</a> All Rights
              Reserved.
            </div>
          }
        >
          <div className={classes.footer}>
            <GridContainer>
              <GridItem xs={12} sm={2} md={2}>
                <h5>About Us</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#pablo">Blog</a>
                  </li>
                  <li>
                    <a href="#pablo">About us</a>
                  </li>
                  <li>
                    <a href="#pablo">Presentation</a>
                  </li>
                  <li>
                    <a href="#pablo">Contact Us</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>Market</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#pablo">Sales FAQ</a>
                  </li>
                  <li>
                    <a href="#pablo">How to register</a>
                  </li>
                  <li>
                    <a href="#pablo">Sell goods</a>
                  </li>
                  <li>
                    <a href="#pablo">Receive Payment</a>
                  </li>
                  <li>
                    <a href="#pablo">Transactions issues</a>
                  </li>
                  <li>
                    <a href="#pablo">Affiliates program</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <h5>Social Feed</h5>
                <div className={classes.socialFeed}>
                  <div>
                    <i className="fab fa-twitter" />
                    <p>
                      How to handle ethical disagreements with your clients.
                    </p>
                  </div>
                  <div>
                    <i className="fab fa-twitter" />
                    <p>
                      The tangible benefits of designing at 1x pixel density.
                    </p>
                  </div>
                  <div>
                    <i className="fab fa-facebook-square" />
                    <p>
                      A collection of 25 stunning sites that you can use for
                      inspiration.
                    </p>
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <h5>Follow Us</h5>
                <ul className={classes.socialButtons}>
                  <li>
                    <Button justIcon simple href="#pablo" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                  </li>
                  <li>
                    <Button justIcon simple href="#pablo" color="facebook">
                      <i className="fab fa-facebook-square" />
                    </Button>
                  </li>
                  <li>
                    <Button justIcon simple href="#pablo" color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                  </li>
                  <li>
                    <Button justIcon simple href="#pablo" color="google">
                      <i className="fab fa-google-plus-g" />
                    </Button>
                  </li>
                  <li>
                    <Button justIcon simple href="#pablo" color="instagram">
                      <i className="fab fa-instagram" />
                    </Button>
                  </li>
                </ul>
                <h5>Numbers Don't Lie</h5>
                <h4>
                  14.521 <small>Freelancers</small>
                </h4>
                <h4>
                  1.423.183 <small>Transactions</small>
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </Footer>
        <br />
        <br />
        <Footer
          theme="white"
          content={
            <div>
              <ul className={classes.socialButtons}>
                <li>
                  <Button justIcon simple href="#pablo" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#pablo" color="facebook">
                    <i className="fab fa-facebook-square" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#pablo" color="dribbble">
                    <i className="fab fa-dribbble" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#pablo" color="google">
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#pablo" color="youtube">
                    <i className="fab fa-youtube" />
                  </Button>
                </li>
              </ul>
              <div
                className={classNames(classes.pullCenter, classes.copyRight)}
              >
                Copyright &copy; {1900 + new Date().getYear()}{" "}
                <a href="https://www.creative-tim.com">Creative Tim</a> All
                Rights Reserved.
              </div>
            </div>
          }
        >
          <div className={classes.footer}>
            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                <a href="#pablo">
                  <h5>Material Kit PRO</h5>
                </a>
                <p>
                  Probably the best UI Kit in the world! We know you've been
                  waiting for it, so don't be shy!
                </p>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>About</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#pablo">Blog</a>
                  </li>
                  <li>
                    <a href="#pablo">About us</a>
                  </li>
                  <li>
                    <a href="#pablo">Presentation</a>
                  </li>
                  <li>
                    <a href="#pablo">Contact us</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>About</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#pablo">Sales FAQ</a>
                  </li>
                  <li>
                    <a href="#pablo">How to register</a>
                  </li>
                  <li>
                    <a href="#pablo">Sell Goods</a>
                  </li>
                  <li>
                    <a href="#pablo">Receive Payment</a>
                  </li>
                  <li>
                    <a href="#pablo">Transactions Issues</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>About</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#pablo">Transactions FAQ</a>
                  </li>
                  <li>
                    <a href="#pablo">Terms & conditions</a>
                  </li>
                  <li>
                    <a href="#pablo">Licenses</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <h5>Subscribe to Newsletter</h5>
                <p>
                  Join our newsletter and get news in your inbox every week! We
                  hate spam too, so no worries about this.
                </p>
                <form>
                  <CustomInput
                    id="footeremail"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      placeholder: "Your Email..."
                    }}
                  />
                  <Button color="primary" justIcon>
                    <Mail />
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default withStyles(styles)(SectionFooter);
`;

const codeProps = `Footer.propTypes = {
  theme: PropTypes.oneOf(["dark", "white", "transparent"]),
  big: PropTypes.bool,
  content: PropTypes.node.isRequired
};`;

function Footer() {
  return (
    <div>
      <h1>Footer</h1>
      <p>This is the bottom navigation of our demo app.</p>
      <h2>Styles</h2>
      <p>You will find the styles for this component in</p>
      <p>
        <code>
          src/assets/jss/material-kit-pro-react/components/footerStyle.jsx
        </code>
      </p>
      <h2>Examples</h2>
      <h3>Pre-Footers</h3>
      <div className="border-example" style={{ backgroundColor: "#f2f2f2" }}>
        <SectionPreFooter />
        <br />
        <br />
      </div>
      <Accordion
        collapses={[
          {
            title: "View Example Code",
            content: (
              <SyntaxHighlighter language="jsx" style={prism}>
                {codeExamplePreFooter}
              </SyntaxHighlighter>
            )
          }
        ]}
      />
      <h3>Footers</h3>
      <div className="border-example" style={{ backgroundColor: "#f2f2f2" }}>
        <SectionFooter />
      </div>
      <Accordion
        collapses={[
          {
            title: "View Example Code",
            content: (
              <SyntaxHighlighter language="jsx" style={prism}>
                {codeExampleFooter}
              </SyntaxHighlighter>
            )
          }
        ]}
      />
      <h2>Props</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
    </div>
  );
}

export default Footer;
