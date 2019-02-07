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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Text from 'web/components/MaterialInputs/Text';

import { createAddonInit, removeAddonInit } from 'ducks/addon/actions';

let AddAddonForm = ({ handleSubmit, progress, errorMessage  }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl
        error={progress === 'ERROR'}
        aria-describedby="name-error-text"
        fullWidth
      >
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
        {progress === 'ERROR' ? (
          <FormHelperText>{errorMessage}</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>
    </form>
  );
};
AddAddonForm = reduxForm({
  form: 'customizations/addon',
})(AddAddonForm);

const Addons = ({
  createAddon, addons, removeAddon, styles,
  progressMap,
  errorsMap,
}) => {
  const addonsList = FN.MapToList(addons).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <div>
      <Card square>
        <CardContent>
          <AddAddonForm
            progress={progressMap['CREATE_ADDON']}
            errorMessage={errorsMap['CREATE_ADDON']}
            onSubmit={({ name, price }) => createAddon({
              name,
              price,
              form: 'customizations/addon'
            })}
          />
        </CardContent>
      </Card>
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
    </div>
  );
};

export default connect(
  state => ({
    addons: state.addon.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    createAddon: createAddonInit,
    removeAddon: removeAddonInit,
  },
)(Addons);
