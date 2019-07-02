import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Loading from 'web/components/Loading';

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

import { fetchAddons, createAddonInit, removeAddonInit } from 'ducks/addon/actions';

let AddAddonForm = ({ t, handleSubmit, progress, errorMessage  }) => {
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
                label: t('menu.newAddon'),
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: t('menu.newAddonPlaceholder')
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
          <Grid item xs={1}>
            <Tooltip placement="top" title={t('menu.addAddon')}>
              <IconButton type="submit" aria-label={t('menu.addAddon')}>
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
  createAddon, addons, adddonsLoaded, removeAddon, styles,
  fetchAddons,
  progressMap,
  errorsMap,
}) => {
  const { t } = useTranslation();
  
  const shouldLoad = addons.length < 1 && !adddonsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchAddons()
  }, []);
  if (shouldLoad) return <Loading />;

  const addonsList = addons.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  
  return (
    <div>
      <Card square>
        <CardContent>
          <AddAddonForm
            t={t}
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
              {addon.price.amount} Kč
              <Tooltip placement="left" title={t('delete')}>
                <IconButton
                  aria-label={t('delete')}
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
    addons: MapToList(state.addon.all),
    adddonsLoaded: state.addon.loaded,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    createAddon: createAddonInit,
    removeAddon: removeAddonInit,
    fetchAddons
  },
)(Addons);
