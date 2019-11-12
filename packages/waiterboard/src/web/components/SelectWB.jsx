import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectWaiterboard } from 'features/app/actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { MapToList, getInitials } from '@dinify/common/src/lib/FN';
import { withFirebase } from 'react-redux-firebase';
import { FormBox, FormBoxHead, FormBoxBody } from './styled/FormBox';

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const styles = {
  card: {
    maxWidth: '500px',
    margin: '50px auto',
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '2px'
  },
  title: {
    fontSize: 18,
  },
  listItem: {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '2px'
  },
  actionItem: {
    background: 'rgba(255,255,255,0.07)',
    borderTop: '1px solid rgba(255,255,255,0.1)',

    '& button': {
      margin: '0 auto'
    }
  }
};

const SelectWB = ({ 
  selectWaiterboard,
  managedRestaurants,
  firebase,
  classes
}) =>
  (<Content>
    <FormBox className="vhs-pop">
      <FormBoxHead>
        Select waiterboard
      </FormBoxHead>
      <FormBoxBody>

        <List className={classes.root}>
          {managedRestaurants.map((restaurant) => 
            <ListItem className={classes.listItem} key={`r-item-${restaurant.id}`}>
              <Avatar
                src={Object.keys(restaurant.images).length  ? MapToList(restaurant.images)[0].url : ''}
              >
                {getInitials(restaurant.name)}
              </Avatar>
              <ListItemText primary={restaurant.name} />
              <Button
                color="primary"
                variant="contained"
                onClick={() => selectWaiterboard({
                  id: MapToList(restaurant.waiterboards)[0].id,
                  restaurantId: restaurant.id
                })}
              >
                ENTER
              </Button>
            </ListItem>
          )}
          <ListItem className={classes.actionItem}>
            <Button
                color="default"
                variant="outlined"
                onClick={() => firebase.logout()}
              >
                Log out
            </Button>
          </ListItem>
        </List>

      </FormBoxBody>
    </FormBox>
  </Content>);

const enhance = compose(
  withFirebase,
  withStyles(styles),
  connect(state => ({
    managedRestaurants: state.restaurant.managedRestaurants
  }), {
    selectWaiterboard
  })
)

export default enhance(SelectWB);
