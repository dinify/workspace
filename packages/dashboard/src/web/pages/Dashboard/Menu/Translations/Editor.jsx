// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MapToList } from 'lib/FN';
import { connect } from 'react-redux';
import R from 'ramda';
import types from './types';
import Text from 'web/components/MaterialInputs/Text';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Done from '@material-ui/icons/Done';
import Save from '@material-ui/icons/Save';
import GTranslate from '@material-ui/icons/GTranslate';

import CircularProgress from '@material-ui/core/CircularProgress';
import { suggestTranslation } from 'ducks/translation/actions';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fab: {

  },
  fabProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  table: {
    minWidth: 300,
  },
});



class Editor extends React.Component {

  render() {
    const {
      originalsList,
      type,
      classes = {},
      handleSubmit,
      progressMap,
      selectedLocale,
      defaultLocale,
      suggestTranslation
    } = this.props;

    const loading = progressMap['SAVE_TRANSLATION'] === 'PENDING';

    return (
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Original Name</TableCell>
              <TableCell>Translation</TableCell>
              {type === 'MenuItem' && <TableCell>Description</TableCell>}
              {type === 'MenuItem' && <TableCell>Translation</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {originalsList.map(original => (
              <TableRow key={original.id}>
                <TableCell component="th" scope="row">
                  {original.name}
                </TableCell>
                <TableCell>
                  <Tooltip title="Suggest Translation" aria-label="Save">
                    <IconButton
                      component="span"
                      type="button"
                      onClick={() => suggestTranslation({
                        form: `translations/editor/${selectedLocale}/${type}`,
                        field: original.id,
                        text: original.name,
                        from: defaultLocale,
                        to: selectedLocale
                      })}
                    >
                      <GTranslate />
                    </IconButton>
                  </Tooltip>
                  <Field
                    name={original.id}
                    component={Text}
                    componentProps={{
                      //fullWidth: true,
                      variant: 'outlined',
                      placeholder: '',
                      style: {
                        minWidth: '150px',
                        maxWidth: '500px'
                      },
                      inputProps: {
                        style: { padding: '14px' }
                      }
                    }}
                  />
                </TableCell>
                {type === 'MenuItem' &&
                  <TableCell>
                    {original.description}
                  </TableCell>
                }
                {type === 'MenuItem' &&
                  <TableCell>
                    <Tooltip title="Suggest Translation" aria-label="Save">
                      <IconButton
                        component="span"
                        type="button"
                        onClick={() => suggestTranslation({
                          form: `translations/editor/${selectedLocale}/${type}`,
                          field: original.id+'_description',
                          text: original.description,
                          from: defaultLocale,
                          to: selectedLocale
                        })}
                      >
                        <GTranslate />
                      </IconButton>
                    </Tooltip>
                    <Field
                      name={original.id+'_description'}
                      component={Text}
                      componentProps={{
                        multiline: true,
                        rows: 4,
                        variant: 'outlined',
                        //fullWidth: true,
                        placeholder: '',
                        style: {minWidth: '300px'},
                        InputProps: {
                          style: { padding: '14px' }
                        }
                      }}
                    />
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Tooltip title={loading ? 'Saving...' : 'Save'} aria-label="Save">
          <div className={classes.wrapper}>
            <Fab className={classes.fab} color="primary" type="submit">
              {loading ? <Save /> : <Done />}
            </Fab>
            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
        </Tooltip>
      </form>
    );
  }
}


Editor = connect(
  state => ({
    progressMap: state.ui.progressMap
  }),
  {suggestTranslation}
)(withStyles(styles)(Editor));


class DynamicEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.EditorComponent = reduxForm({
      form: `translations/editor/${props.selectedLocale}/${props.type}`,
      enableReinitialize: true
    })(Editor)
  }
  render() {
    const EditorComponent = this.EditorComponent
    console.log(this.props);
    return <EditorComponent {...this.props} />
  }
}

export default DynamicEditorComponent;
