// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Field, reduxForm } from 'redux-form';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Text from 'web/components/MaterialInputs/Text';

import { createAddonInit, removeAddonInit } from 'ducks/addon/actions';

let AddAddonForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container spacing={8} alignItems="flex-start" justify="center">
        <Grid item xs={8}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: 'Name of new addon',
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
              placeholder: 'e.g. Extra cheese'
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="price"
            component={Text}
            componentProps={{
              label: 'Price',
              fullWidth: true,
              type: 'number'
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip placement="top" title="Add addon">
            <IconButton type="submit" aria-label="Add addon">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};
AddAddonForm = reduxForm({
  form: 'customizations/addon',
})(AddAddonForm);

const Addons = ({ createAddon, addons, removeAddon, styles }) => {
  const addonsList = FN.MapToList(addons).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <div>
      <List component="nav">
        {addonsList.map((addon) => (
          <div key={addon.id}>
            <ListItem dense style={styles.ListItem}>
              <ListItemText primary={addon.name} />
              {addon.price.amount}KD
              <Tooltip placement="left" title="Delete">
                <IconButton
                  aria-label="Delete addon"
                  onClick={() => removeAddon({ id: addon.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </div>
        ))}
      </List>
      <Card square>
        <CardContent>
          <AddAddonForm onSubmit={createAddon} />
        </CardContent>
      </Card>
    </div>
  );
};

export default connect(
  state => ({
    addons: state.addon.all,
  }),
  {
    createAddon: createAddonInit,
    removeAddon: removeAddonInit,
  },
)(Addons);
