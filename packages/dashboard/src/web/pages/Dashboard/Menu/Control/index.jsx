// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListOfCategories from './ListOfCategories';
import ListOfDishes from './ListOfDishes';
import ItemDetail from './ItemDetail';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';

const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
`;

const H = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

const SolidContainer = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

class Menucontrol extends React.Component {
  render() {
    const { selectedCategoryId, selectedFoodId } = this.props;

    return (
      <div>
        <Typography style={{marginLeft: 10}} gutterBottom variant="h6">Menu Editor</Typography>
        <HeadLine>
          <Grid container spacing={8} alignItems="flex-start" justify="center">
            <Grid item xs={3}>
              <H>Categories</H>
            </Grid>
            <Grid item xs={3}>
              <H>Dishes</H>
            </Grid>
            <Grid item xs={6}>
              <H>Dish Detail</H>
            </Grid>
          </Grid>
        </HeadLine>
        <SolidContainer>
          <Grid container spacing={8} alignItems="flex-start" justify="center">
            <Grid item xs={3}>
              <ListOfCategories selectedCategoryId={selectedCategoryId} />
            </Grid>
            <Grid item xs={3}>
              <ListOfDishes
                selectedFoodId={selectedFoodId}
                selectedCategoryId={selectedCategoryId}
              />
            </Grid>
            <Grid item xs={6}>
              <ItemDetail selectedFoodId={selectedFoodId} />
            </Grid>
          </Grid>
        </SolidContainer>
      </div>
    );
  }
}

export default connect(state => ({
  selectedCategoryId: state.restaurant.selectedCategoryId,
  selectedFoodId: state.restaurant.selectedFoodId,
  menuItems: state.menuItem.all,
}))(Menucontrol);
