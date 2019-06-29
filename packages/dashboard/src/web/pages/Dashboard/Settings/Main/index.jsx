// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// import BusinessHours from './BusinessHours';
import Banking from './Banking';
import Social from './Social';
import GoogleLocation from './GoogleLocation';
import Contact from './Contact';
import Image from './Image';
// import Type from './Type';
import Name from './Name';
// import Tags from './Tags';
import Address from './Address';

const Column = styled.div`
  width: 290px;
  display: inline-block;
  vertical-align: top;
`;

const Main = ({ loggedRestaurant }) => {
  if (!loggedRestaurant) return <div />;
  return (
    <div>
      <div>
        <Column>
          <Name name={loggedRestaurant.name} />
          {/*<Tags />*/}
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

export default connect(state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
}))(Main);
