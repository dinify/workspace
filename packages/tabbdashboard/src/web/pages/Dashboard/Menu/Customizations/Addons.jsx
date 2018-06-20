// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Field, reduxForm } from 'redux-form';

import List, { ListItem, ListItemText } from 'material-ui/List';

import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import InputAndButton from 'web/components/MaterialInputs/InputAndButton';

import { createAddonInit, removeAddonInit } from 'ducks/addon/actions';

let AddAddonForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Field
        name="name"
        component={InputAndButton}
        buttonIcon={<AddCircle />}
        componentProps={{
          placeholder: 'Enter addon',
          fullWidth: true,
        }}
      />
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
        {addonsList.map((addon, i) => (
          <div key={addon.id}>
            <ListItem dense style={styles.ListItem}>
              <ListItemText primary={<span>{addon.name}</span>} />
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
        <ListItem>
          <AddAddonForm onSubmit={createAddon} />
        </ListItem>
      </List>
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
