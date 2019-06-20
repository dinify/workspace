// @flow
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';
import { useTranslation } from 'react-i18next';
import * as FN from 'lib/FN';
import ListOfCategories from './ListOfCategories';
import ListOfDishes from './ListOfDishes';
import ItemDetail from './ItemDetail';


const Menucontrol = ({
  selectedCategoryId,
  selectedFoodId,
  categoriesMap,
  menuItems,
}) => {
  const categoriesList = FN.MapToList(categoriesMap).sort(
    (a, b) => a.precedence - b.precedence,
  );
  if (categoriesList.length === 1) {
    selectedCategoryId = categoriesList[0].id;
  }
  const { t } = useTranslation();
  return (
    <div>
        {categoriesList.length < 1 && <div style={{textAlign: 'center', margin: '20px 0 40px 0'}}>
          <Typography component="h2" variant="display1" gutterBottom>
            {t('menu.startWithCategory')}
          </Typography>
        </div>}
        {/* categoriesList.length > 0 && <Button variant="contained" color="primary" type="submit">
          Translate menu
          </Button> */}
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
    </div>
  );
}

export default connect(state => ({
  categoriesMap: state.menuCategory.all,
  selectedCategoryId: state.restaurant.selectedCategoryId,
  selectedFoodId: state.restaurant.selectedFoodId,
  menuItems: state.menuItem.all,
}))(Menucontrol);
