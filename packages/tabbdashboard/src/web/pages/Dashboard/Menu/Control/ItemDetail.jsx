// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import Dropzone from 'react-dropzone';
import {
  updateMenuitemInitAction,
  uploadItemImageInitAction,
} from 'ducks/restaurantLegacy';
import Progress from 'web/components/Progress';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';

import ItemIngredients from './ItemIngredients';
import ItemAddons from './ItemAddons';
import ItemOptions from './ItemOptions';
import ItemNutrition from './ItemNutrition';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import { withStyles } from '@material-ui/core/styles';

let DetailForm = ({ handleSubmit }) => {
  const style = { height: '64px' };
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Text}
        componentProps={{
          label: 'Name',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="description"
        component={Text}
        componentProps={{
          label: 'Description',
          multiline: true,
          fullWidth: true,
          rows: 2,
          margin: 'normal',
        }}
      />
      <Field
        name="price"
        component={Text}
        componentProps={{
          type: 'number',
          min: 0.0,
          label: 'Price (KD)',
          fullWidth: true,
          step: 0.1,
          margin: 'normal',
          style,
        }}
      />
      <Button type="submit" fullWidth={true}>
        Save
      </Button>
    </form>
  );
};
DetailForm = reduxForm({
  form: 'menu/detail',
  enableReinitialize: true,
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
  let foodImageUrl = '';
  if (selectedFood.images) {
    const images = FN.MapToList(selectedFood.images).sort(
      (a, b) => a.precedence - b.precedence,
    );
    if (images.length > 0) foodImageUrl = images[0].url;
  }
  console.log(foodImageUrl);
  return (
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
          <p>
            Try dropping your photo here, or click to select file to upload.
          </p>
          <p>Only *.jpg and *.png image will be accepted</p>
        </Dropzone>

        <Progress type={'UPDATE_MENUITEM'} />
        <DetailForm
          onSubmit={fields => {
            fields.id = selectedFoodId;
            console.log(fields);
            updateFood({
              ...fields,
              price: {
                amount: Number.parseFloat(fields.price).toFixed(3),
                currency: 'KWD',
              },
            });
          }}
          initialValues={{
            name: selectedFood.name,
            description: selectedFood.description || '',
            price: Number.parseFloat(selectedFood.price.amount).toFixed(3),
          }}
        />

        <ItemOptions selectedFoodId={selectedFoodId} />

        <ItemIngredients selectedFoodId={selectedFoodId} />

        <ItemAddons selectedFoodId={selectedFoodId} />
      </CardContent>
    </Card>
  );
};

ItemDetail = withStyles(styles)(ItemDetail);

export default connect(
  state => ({
    menuItems: state.menuItem.all,
  }),
  {
    updateFood: updateMenuitemInitAction,
    uploadItemImage: uploadItemImageInitAction,
  },
)(ItemDetail);
