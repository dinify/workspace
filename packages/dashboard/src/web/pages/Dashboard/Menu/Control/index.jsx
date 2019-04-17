// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';
import ListOfCategories from './ListOfCategories';
import ListOfDishes from './ListOfDishes';
import ItemDetail from './ItemDetail';
import * as FN from 'lib/FN';


const Menucontrol = ({
  selectedCategoryId,
  selectedFoodId,
  categoriesMap
}) => {
  const { t } = useTranslation();
  const categoriesList = FN.MapToList(categoriesMap).sort(
    (a, b) => a.precedence - b.precedence,
  );
  return (
    <div>
      <Typography gutterBottom variant="h6">{t('nav.menuEditor')}</Typography>
        {categoriesList.length < 1 && <div style={{textAlign: 'center', margin: '20px 0 40px 0'}}>
          <Typography component="h2" variant="display1" gutterBottom>
            {t('menu.startWithCategory')}
          </Typography>
        </div>}
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
                selectedFoodId={selectedFoodId}
                selectedCategoryId={selectedCategoryId}
              />
            </Grid>,
            <Grid item xs={6}>
              <Typography gutterBottom variant="caption">{t('menu.dishDetail')}</Typography>
              <ItemDetail selectedFoodId={selectedFoodId} />
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
