import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loading from 'web/components/Loading';
import { selectedRestaurant } from 'features/restaurant/selectors';
// import BusinessHours from './BusinessHours';
import Banking from './Banking';
import Social from './Social';
import GoogleLocation from './GoogleLocation';
import Contact from './Contact';
import Image from './Image';
// import Type from './Type';
import Name from './Name';
import Wifi from './Wifi';
// import Tags from './Tags';
import Features from './Features';


const Column = styled.div`
  width: 290px;
  display: inline-block;
  vertical-align: top;
`;

const Main = ({ restaurant }) => {
  if (!restaurant) return <Loading />;
  return (
    <div>
      <div>
        <Column>
          <Name name={restaurant.name} />
          {/* <Tags /> */}
          {/* <Type type={restaurant.type} /> */}
          <Image restaurant={restaurant} />
          <Features restaurant={restaurant} />
          <Contact contact={restaurant.contact} />
        </Column>

        <Column>
          <GoogleLocation restaurant={restaurant} address={
            restaurant.address ? restaurant.address.business : {}
          }/>
        </Column>

        <Column>
          <Social social={restaurant.social} />
          <Wifi />
          <Banking payout={restaurant.payout} />
        </Column>

        <Column>
          
          {/* <BusinessHours openHours={restaurant.open_hours} /> */}
        </Column>
      </div>
    </div>
  );
};

export default compose(
  connect((state) => ({
    restaurant: selectedRestaurant(state)
  }))
)(Main);
