import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// import BusinessHours from './BusinessHours';
import Banking from './Banking';
import Social from './Social';
import GoogleLocation from './GoogleLocation';
import Contact from './Contact';
import Image from './Image';
// import Type from './Type';
import Name from './Name';
// import Tags from './Tags';

const Column = styled.div`
  width: 290px;
  display: inline-block;
  vertical-align: top;
`;

const styles = () => ({
  progress: {
    color: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: '50%',
    top: '100px',
  },
});

const Main = ({ loggedRestaurant, classes }) => {
  if (!loggedRestaurant) return <CircularProgress className={classes.progress} />;
  return (
    <div>
      <div>
        <Column>
          <Name name={loggedRestaurant.name} />
          {/* <Tags /> */}
          {/* <Type type={loggedRestaurant.type} /> */}
          <Image loggedRestaurant={loggedRestaurant} />
          <Contact contact={loggedRestaurant.contact} />
        </Column>

        <Column>
          <GoogleLocation loggedRestaurant={loggedRestaurant} address={
            loggedRestaurant.address ? loggedRestaurant.address.business : {}
          }/>
        </Column>

        <Column>
          <Social social={loggedRestaurant.social} />
          <Banking payout={loggedRestaurant.payout} />
        </Column>

        <Column>
          {/* <BusinessHours openHours={loggedRestaurant.open_hours} /> */}
        </Column>
      </div>
    </div>
  );
};

export default compose(
  withStyles(styles),
  connect((state) => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  }))
)(Main);
