import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

// core components
import SectionCarousel from "views/ComponentsPage/Sections/SectionCarousel.jsx";

const exampleCarousel = `import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/coßre components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

function SectionCarousel() {
  const { classes } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <div className={classes.section} id="carousel">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card>
              <Carousel {...settings}>
                <div>
                  <img
                    src={image1}
                    alt="First slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />Yellowstone
                      National Park, United States
                    </h4>
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />Somewhere Beyond,
                      United States
                    </h4>
                  </div>
                </div>
                <div>
                  <img
                    src={image3}
                    alt="Third slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />Yellowstone
                      National Park, United States
                    </h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default withStyles(carouselStyle)(SectionCarousel);`;

function Carousel() {
  return (
    <div>
      <h1>React Slick 0.23.2</h1>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />
        <code>src/assets/scss/plugins/_plugin-react-slick.scss</code>.
      </p>
      <h2>Example</h2>
      <div className="border-example-8">
        <SectionCarousel />
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {exampleCarousel}
      </SyntaxHighlighter>
      <h2>Props</h2>
      <p>
        We've added some extra classes to the default ones from{" "}
        <a href="https://react-slick.neostack.com/">react-slick</a>.
      </p>
      <p>
        These are <code>.slick-image</code> for the image of the slide,{" "}
        <code>.slick-caption</code>, the text that appears over the image and{" "}
        <code>.slick-icons</code>, used for the icon that goes along with the
        text.
      </p>
      <p>
        For more details please refer to{" "}
        <a href="https://react-slick.neostack.com/docs/get-started">
          react-slick's official docs
        </a>
        .
      </p>
    </div>
  );
}

export default Carousel;
