// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';

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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Text from 'web/components/MaterialInputs/Text';

import {
  collapseOptionInit,
  createOptionInit,
  removeOptionInit,
  createChoiceInit,
  removeChoiceInit,
} from 'ducks/option/actions';

let AddChoiceForm = ({ t, handleSubmit, progress, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl
        error={progress === 'ERROR'}
        aria-describedby="name-error-text"
        fullWidth
      >
      <Grid container spacing={8} alignItems="flex-end" justify="center">
        <Grid item xs={7}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: t('menu.newChoice'),
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
              placeholder: t('menu.newChoicePlaceholder')
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="price"
            component={Text}
            componentProps={{
              label: t('menu.price'),
              fullWidth: true,
              type: 'number'
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Tooltip placement="top" title={t('menu.addChoice')}>
            <IconButton type="submit" aria-label={t('menu.addChoice')}>
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
AddChoiceForm = reduxForm({
  form: 'customizations/option/choice',
})(AddChoiceForm);

let AddOptionForm = ({ handleSubmit, t }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container spacing={0} alignItems="flex-end" justify="center">
        <Grid item xs={11}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: t('menu.newOption'),
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
              placeholder: t('menu.newOptionPlaceholder')
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip placement="top" title={t('menu.addOption')}>
            <IconButton type="submit" aria-label={t('menu.addOption')}>
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
  createOption,
  createChoice,
  optionsMap,
  collapseOption,
  removeChoice,
  removeOption,
  styles,
  progressMap,
  errorsMap,
}) => {
  const optionsList = FN.MapToList(optionsMap).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const { t } = useTranslation();
  return (
    <div>
      <Card square>
        <CardContent>
          <AddOptionForm t={t} onSubmit={({ name }) => createOption({
            name,
            form: 'customizations/option'
          })} />
        </CardContent>
      </Card>
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
              <Tooltip placement="left" title={t('delete')}>
                <IconButton
                  aria-label={t('delete')}
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
                    <ListItemText
                      inset
                      secondary={
                        <span>
                          {choice.name}{' '}
                          {choice.difference ? Number.parseFloat(choice.difference.amount).toFixed(2) : ''} Kč
                        </span>
                      }
                    />
                    <Tooltip placement="left" title={t('delete')}>
                      <IconButton
                        aria-label={t('delete')}
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
                          t={t}
                          progress={progressMap['CREATE_CHOICE']}
                          errorMessage={errorsMap['CREATE_CHOICE']}
                          onSubmit={({ name, price }) =>
                            createChoice({
                              name, price, optionId: option.id,
                              form: 'customizations/option/choice'
                            })
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
    </div>
  );
};

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    optionsMap: state.option.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    createOption: createOptionInit,
    createChoice: createChoiceInit,
    collapseOption: collapseOptionInit,
    removeChoice: removeChoiceInit,
    removeOption: removeOptionInit,
  },
)(Options);
