// @flow
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';
import Button from '@material-ui/core/Button';
import ListOfCategories from './ListOfCategories';
import ListOfDishes from './ListOfDishes';
import ItemDetail from './ItemDetail';
import * as FN from 'lib/FN';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const SolidContainer = styled.div`
  min-width: 800px;
  padding-bottom: 50px;
  margin: 14px 10px;
`;

const Menucontrol = ({
  selectedCategoryId,
  selectedFoodId,
  categoriesMap,
  menuItems,
  classes
}) => {
  const categoriesList = FN.MapToList(categoriesMap).sort(
    (a, b) => a.precedence - b.precedence,
  );
  if (categoriesList.length === 1) {
    selectedCategoryId = categoriesList[0].id;
  }
  const { t } = useTranslation();
  console.log(classes, 'sdsd');
  return (
    <div>
      <SolidContainer>
        {categoriesList.length < 1 && <div style={{textAlign: 'center', margin: '20px 0 40px 0'}}>
          <Typography component="h2" variant="display1" gutterBottom>
            {t('menu.startWithCategory')}
          </Typography>
        </div>}
        {/*categoriesList.length > 0 && <Button variant="contained" color="primary" type="submit">
          Translate menu
  </Button>*/}
        <Grid container spacing={8} alignItems="flex-start" justify="center">
          <Grid item xs={3}>
            <Typography gutterBottom variant="caption">{t('menu.categories')}</Typography>
            <ListOfCategories
              categoriesList={categoriesList}
              selectedCategoryId={selectedCategoryId}
            />
          </Grid>

          {categoriesList.length > 0 &&
            [<Grid item xs={3}>
              <Typography gutterBottom variant="caption">{t('menu.dishes')}</Typography>
              <ListOfDishes
                categoriesMap={categoriesMap}
                selectedFoodId={selectedFoodId}
                selectedCategoryId={selectedCategoryId}
              />
            </Grid>,
            <Grid item xs={6}>
              {(selectedCategoryId && categoriesMap[selectedCategoryId] && menuItems[selectedFoodId]) && [
                <Typography gutterBottom variant="caption">{t('menu.dishDetail')}</Typography>,
                <ItemDetail menuItems={menuItems} selectedFoodId={selectedFoodId} />
              ]}
            </Grid>]    
          }

        </Grid>
      </SolidContainer>
    </div>
  );
}

export default connect(state => ({
  categoriesMap: state.menuCategory.all,
  selectedCategoryId: state.restaurant.selectedCategoryId,
  selectedFoodId: state.restaurant.selectedFoodId,
  menuItems: state.menuItem.all,
}))(Menucontrol);
