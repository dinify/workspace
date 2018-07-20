// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Field, reduxForm } from 'redux-form';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';

import InputAndButton from 'web/components/MaterialInputs/InputAndButton';

import {
  collapseOptionInit,
  createOptionInit,
  removeOptionInit,
  createChoiceInit,
  removeChoiceInit,
} from 'ducks/option/actions';

let AddChoiceForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Field
        name="name"
        component={InputAndButton}
        buttonIcon={<AddCircle />}
        componentProps={{
          placeholder: 'Add choice',
          fullWidth: true,
        }}
      />
      <Field
        name="price"
        component={InputAndButton}
        buttonIcon={<AddCircle />}
        componentProps={{
          placeholder: 'Price',
          fullWidth: true,
        }}
      />
    </form>
  );
};
AddChoiceForm = reduxForm({
  form: 'customizations/option/choice',
})(AddChoiceForm);

let AddOptionForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Field
        name="name"
        component={InputAndButton}
        buttonIcon={<AddCircle />}
        componentProps={{
          placeholder: 'Enter option',
          fullWidth: true,
        }}
      />
    </form>
  );
};
AddOptionForm = reduxForm({
  form: 'customizations/option',
})(AddOptionForm);

const Options = ({
  loggedRestaurant,
  createOption,
  createChoice,
  optionsMap,
  collapseOption,
  removeChoice,
  removeOption,
  styles,
}) => {
  const optionsList = FN.MapToList(optionsMap).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <div>
      <List component="nav">
        {optionsList.map((option, i) => (
          <div key={option.id}>
            <ListItem
              button
              onClick={() => collapseOption({ id: option.id })}
              dense={!option.collapsed}
              style={styles.ListItem}
            >
              <ListItemText primary={option.name} />
              <Tooltip placement="left" title="Delete">
                <IconButton
                  aria-label="Delete option"
                  onClick={() => removeOption({ id: option.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              {option.collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={option.collapsed} timeout="auto" unmountOnExit>
              <List component="div">
                {FN.MapToList(option.choices).map(choice => (
                  <ListItem key={choice.id} style={styles.ListItem}>
                    <ListItemIcon>
                      <ChevronRight />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      secondary={
                        <span>
                          {choice.name}{' '}
                          {choice.difference ? choice.difference.amount : ''}KD
                        </span>
                      }
                    />
                    <Tooltip placement="left" title="Delete">
                      <IconButton
                        aria-label="Delete choice"
                        onClick={() =>
                          removeChoice({ id: choice.id, optionId: option.id })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText inset>
                    <AddChoiceForm
                      onSubmit={({ name, price }) =>
                        createChoice({ name, price, optionId: option.id })
                      }
                    />
                  </ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </div>
        ))}
        <ListItem>
          <AddOptionForm onSubmit={createOption} />
        </ListItem>
      </List>
    </div>
  );
};

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    optionsMap: state.option.all,
  }),
  {
    createOption: createOptionInit,
    createChoice: createChoiceInit,
    collapseOption: collapseOptionInit,
    removeChoice: removeChoiceInit,
    removeOption: removeOptionInit,
  },
)(Options);
