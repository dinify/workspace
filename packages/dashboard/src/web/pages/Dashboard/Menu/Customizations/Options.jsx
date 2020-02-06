import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MapToList } from '@dinify/common/src/lib/FN';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from '@dinify/common/src/lib/i18n';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
import { getT } from '@dinify/common/src/lib/translation.ts';

import {
  fetchOptionsAsync,
  collapseOptionInit,
  createOptionAsync,
  removeOptionAsync,
  createChoiceAsync,
  removeChoiceAsync,
} from 'features/option/actions.ts';
import { listOfOptions } from 'features/option/selectors';

import { getCurrencySymbol } from './util';


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
  fetchOptions,
  optionsList,
  // optionsLoaded,
  collapseOption,
  removeChoice,
  removeOption,
  styles,
  progressMap,
  errorsMap,
  lang
}) => {
  const { t } = useTranslation();

  // const shouldLoad = optionsList.length < 1 && !optionsLoaded;
  useEffect(() => {
    fetchOptions();
  }, []);
  // if (shouldLoad) return <Loading />;

  return (
    <React.Fragment>
      <Card square>
        <CardContent>
          <AddOptionForm t={t} onSubmit={({ name }) => createOption({
            name,
            form: 'customizations/option'
          })} />
        </CardContent>
      </Card>
      <List component="nav">
        {optionsList.map((option) => (
          <React.Fragment key={option.id}>
            <ListItem
              button
              onClick={() => collapseOption({ id: option.id })}
              dense={!option.collapsed}
              style={styles.ListItem}
            >
              <ListItemText primary={getT(option.translations, lang)} />
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
                {MapToList(option.choices).map(choice => (
                  <ListItem key={choice.id} style={styles.ListItem}>
                    <ListItemText
                      inset
                      secondary={
                        <span>
                          {getT(choice.translations, lang)}{' '}
                          {choice.price ?
                          `${Number.parseFloat(choice.price.amount).toFixed(2)} ${getCurrencySymbol(choice.price)}`
                          : ''}
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
                          progress={progressMap.CREATE_CHOICE}
                          errorMessage={errorsMap.CREATE_CHOICE}
                          onSubmit={({ name, price }) =>
                            createChoice({
                              name, 
                              price,
                              optionId: option.id,
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
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
};

export default connect(
  state => ({
    optionsList: listOfOptions(state),
    optionsLoaded: state.option.loaded,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
    lang: state.restaurant.defaultLanguage
  }),
  {
    fetchOptions: fetchOptionsAsync.request,
    createOption: createOptionAsync.request,
    createChoice: createChoiceAsync.request,
    collapseOption: collapseOptionInit,
    removeChoice: removeChoiceAsync.request,
    removeOption: removeOptionAsync.request,
  },
)(Options);
