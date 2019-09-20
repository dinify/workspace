import React from 'react';
import { ServicesButton } from './services-button';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

const ServicesButtonContainer: React.FC<{
  style?: React.CSSProperties,
  anchor?: number,
  checkedInRestaurant: string|null
}> = ({
  style,
  checkedInRestaurant,
  anchor = 0,
  ...otherProps
}) => {
  return (
    <div style={{
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      bottom: anchor,
      height: 0,
      width: '100%',
      content: '""',
      overflow: 'visible',
      zIndex: 1300,
      ...style
    }}>
      <ServicesButton onClick={() => {}} style={{ marginTop: -28 }} visible={checkedInRestaurant !== null}/>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  })
)(ServicesButtonContainer);