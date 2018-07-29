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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Text from 'web/components/MaterialInputs/Text';

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
      <Grid container spacing={8} alignItems="flex-end" justify="center">
        <Grid item xs={7}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: 'Name of choice',
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
              placeholder: 'e.g. White bread'
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
        <Grid item xs={2}>
          <Tooltip placement="top" title="Add choice">
            <IconButton type="submit" aria-label="Add choice">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};
AddChoiceForm = reduxForm({
  form: 'customizations/option/choice',
})(AddChoiceForm);

let AddOptionForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container spacing={0} alignItems="flex-end" justify="center">
        <Grid item xs={11}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: 'Name of new option group',
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
              placeholder: 'e.g. Breads'
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip placement="top" title="Add option group">
            <IconButton type="submit" aria-label="Add option">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
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
                  <ListItemText>
                    <Card square>
                      <CardContent>
                        <AddChoiceForm
                          onSubmit={({ name, price }) =>
                            createChoice({ name, price, optionId: option.id })
                          }
                        />
                      </CardContent>
                    </Card>
                  </ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </div>
        ))}
      </List>
      <Card square>
        <CardContent>
          <AddOptionForm onSubmit={createOption} />
        </CardContent>
      </Card>
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
