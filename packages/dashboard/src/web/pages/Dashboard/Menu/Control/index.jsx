import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';
import { useTranslation } from 'react-i18next';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { fetchMenuCategoriesInit } from 'ducks/menuCategory/actions';
import ListOfCategories from './ListOfCategories';
import ListOfDishes from './ListOfDishes';
import ItemDetail from './ItemDetail';

const Menucontrol = ({
  selectedRestaurant,
  selectedCategoryId,
  selectedFoodId,
  categoriesMap,
  menuItems,
  fetchMenu
}) => {
  if (selectedRestaurant) {
    useEffect(() => {
      fetchMenu({ subdomain: selectedRestaurant, populateWith: 'categories.items' })
    }, []);
  }
  const { t } = useTranslation();
  const categoriesList = MapToList(categoriesMap).sort(
    (a, b) => a.precedence - b.precedence,
  );
  let categoryId = selectedCategoryId;
  if (categoriesList.length === 1) {
    categoryId = categoriesList[0].id;
  }
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
            selectedCategoryId={categoryId}
          />
        </Grid>

        {categoriesList.length > 0 &&
          [<Grid item xs={3} key="categories-item-1">
            <Typography gutterBottom variant="caption">{t('menu.dishes')}</Typography>
            <ListOfDishes
              categoriesMap={categoriesMap}
              selectedFoodId={selectedFoodId}
              selectedCategoryId={categoryId}
            />
          </Grid>,
          <Grid item xs={6} key="categories-item-2">
            {(categoryId && categoriesMap[categoryId] && menuItems[selectedFoodId]) && [
              <Typography key="typo-dish-detail" gutterBottom variant="caption">{t('menu.dishDetail')}</Typography>,
              <ItemDetail key="dish-detail-container" menuItems={menuItems} selectedFoodId={selectedFoodId} />
            ]}
          </Grid>]
        }

      </Grid>
    </div>
  );
}

export default connect(state => ({
  selectedRestaurant: state.restaurant.selectedRestaurant,
  categoriesMap: state.menuCategory.all,
  selectedCategoryId: state.restaurant.selectedCategoryId,
  selectedFoodId: state.restaurant.selectedFoodId,
  menuItems: state.menuItem.all
}), {
  fetchMenu: fetchMenuCategoriesInit
})(Menucontrol);
