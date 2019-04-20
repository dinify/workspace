// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import Dropzone from 'react-dropzone';
import {
  updateMenuitemInitAction,
  uploadItemImageInitAction,
} from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import { useTranslation } from 'react-i18next';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardLabel } from 'web/components/styled/FormBox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';

import ItemIngredients from './ItemIngredients';
import ItemAddons from './ItemAddons';
import ItemOptions from './ItemOptions';
import ItemNutrition from './ItemNutrition';


let DetailForm = ({ handleSubmit }) => {
  const style = { height: '64px' };
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Text}
        componentProps={{
          label: t('menu.dishName'),
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="description"
        component={Text}
        componentProps={{
          label: t('menu.description'),
          multiline: true,
          fullWidth: true,
          rows: 4,
          margin: 'normal',
        }}
      />
      <Field
        name="price"
        component={Text}
        componentProps={{
          type: 'number',
          min: 0,
          label: t('menu.price'),
          fullWidth: true,
          step: 1,
          margin: 'normal',
          style,
        }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        {t('save')}
      </Button>
    </form>
  );
};
DetailForm = reduxForm({
  form: 'menu/detail',
  enableReinitialize: true,
  destroyOnUnmount: false
})(DetailForm);

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 270,
    position: 'relative',
    backgroundColor: 'black',
  },
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
});

let ItemDetail = ({
  selectedFoodId,
  updateFood,
  uploadItemImage,
  menuItems,
  classes,
}) => {
  const selectedFood = menuItems[selectedFoodId];
  if (!selectedFood) return <div />;
  const { t } = useTranslation();
  let foodImageUrl = '';
  if (selectedFood.images) {
    const images = FN.MapToList(selectedFood.images).sort(
      (a, b) => a.precedence - b.precedence,
    );
    if (images.length > 0) foodImageUrl = images[0].url;
  }
  console.log(foodImageUrl);
  return (
    <div>
    <Card>
      <CardMedia
        className={classes.media}
        image={foodImageUrl}
        title={selectedFood.name}
      >
        <MuiThemeProvider theme={theme}>
          <ItemNutrition selectedFoodId={selectedFoodId} />
        </MuiThemeProvider>
      </CardMedia>
      <CardContent>
        <Dropzone
          accept="image/jpg, image/jpeg, image/png"
          onDrop={(accepted, rejected) => {
            if (accepted && accepted.length > 0)
              uploadItemImage({ file: accepted[0], id: selectedFoodId });
          }}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '11px',
            border: '1px dashed #ccc',
            margin: '10px 0',
          }}
        >
          <p>{t('uploadImageGuideDish')}</p>
          <p>{t('uploadImageFormats')}</p>
        </Dropzone>

        <Progress type={'UPDATE_MENUITEM'} />
        <DetailForm
          onSubmit={fields => {
            fields.id = selectedFoodId;
            console.log(fields);
            updateFood({
              ...fields,
              price: {
                amount: Number.parseFloat(fields.price).toFixed(0),
                currency: 'KWD',
              },
            });
          }}
          initialValues={{
            name: selectedFood.name,
            description: selectedFood.description || '',
            price: Number.parseFloat(selectedFood.price.amount).toFixed(0),
          }}
        />
      </CardContent>

      <CardContent>
        <CardLabel>{selectedFood.name} {t('nav.customizations')}</CardLabel>
        <ItemIngredients t={t} selectedFoodId={selectedFoodId} />
        <ItemOptions t={t} selectedFoodId={selectedFoodId} />
        <ItemAddons t={t} selectedFoodId={selectedFoodId} />
      </CardContent>
    </Card>
    </div>
  );
};

ItemDetail = withStyles(styles)(ItemDetail);

export default connect(
  null,
  {
    updateFood: updateMenuitemInitAction,
    uploadItemImage: uploadItemImageInitAction,
  },
)(ItemDetail);
