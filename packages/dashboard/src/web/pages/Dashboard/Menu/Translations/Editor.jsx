import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Text from 'web/components/MaterialInputs/Text';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';
import Done from '@material-ui/icons/Done';
import Save from '@material-ui/icons/Save';
import GTranslate from '@material-ui/icons/GTranslate';

import CircularProgress from '@material-ui/core/CircularProgress';
import { suggestTranslation, suggestAllTranslations } from 'ducks/translation/actions';

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
  cell: {
    padding: 10
  },
  firstCell: {
    padding: '10px 10px 10px 24px'
  },
  lastCell: {
    padding: '10px 24px 10px 10px'
  }
});

let Editor = ({
  originalsList,
  type,
  classes = {},
  handleSubmit,
  progressMap,
  selectedLocale,
  defaultLocale,
  suggestTranslation,
  languageName,
  t
}) => {

  const loading = progressMap['SAVE_TRANSLATION'] === 'PENDING';

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Table className={classes.table} padding="none">
        <TableHead>
          <TableRow>
            <TableCell className={classes.firstCell}>{t('menu.dishName')}</TableCell>
            <TableCell></TableCell>
            <TableCell className={classes.cell}>{languageName}</TableCell>
            {type === 'MenuItem' && <TableCell className={classes.cell}>{t('menu.description')}</TableCell>}
            {type === 'MenuItem' && <TableCell></TableCell>}
            {type === 'MenuItem' && <TableCell className={classes.cell}>{languageName}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {originalsList.map(original => (
            <TableRow key={original.id}>
              <TableCell className={classes.firstCell} style={{fontSize: 14}} scope="row">
                {original.name}
              </TableCell>
              <TableCell style={{width: '50px'}}>
                {original.name && original.name.length > 0 ?
                  <Tooltip title="Suggest Translation" aria-label="Save">
                    <IconButton
                      component="span"
                      type="button"
                      onClick={() => original.name && suggestTranslation({
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
                  : ''
                }
              </TableCell>
              <TableCell className={classes.cell}>
                <Field
                  name={original.id}
                  component={Text}
                  componentProps={{
                    // fullWidth: true,
                    variant: 'outlined',
                    placeholder: '',
                    style: {
                      minWidth: '150px',
                      maxWidth: '500px',
                      width: '100%'
                    },
                    inputProps: {
                      style: { padding: '10px' }
                    }
                  }}
                />
              </TableCell>
              {type === 'MenuItem' &&
                <TableCell className={classes.cell}>
                  {original.description}
                </TableCell>
              }
              {type === 'MenuItem' &&
              <TableCell style={{width: '50px'}}>
                {original.description && original.description.length > 0 ?
                  <Tooltip title="Suggest Translation" aria-label="Save">
                    <IconButton
                      component="span"
                      type="button"
                      onClick={() => suggestTranslation({
                        form: `translations/editor/${selectedLocale}/${type}`,
                        field: `${original.id}_description`,
                        text: original.description,
                        from: defaultLocale,
                        to: selectedLocale
                      })}
                    >
                      <GTranslate />
                    </IconButton>
                  </Tooltip>
                  : ''
                }
              </TableCell>
              }
              {type === 'MenuItem' &&
                <TableCell className={classes.lastCell}>
                  <Field
                    name={`${original.id}_description`}
                    component={Text}
                    componentProps={{
                      multiline: true,
                      rows: 6,
                      variant: 'outlined',
                      // fullWidth: true,
                      placeholder: '',
                      style: {minWidth: '300px', margin: '10px'},
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


Editor = connect(
  state => ({
    progressMap: state.ui.progressMap
  }),
  {
    suggestTranslation,
    suggestAllTranslations
  }
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
    return <EditorComponent {...this.props} />
  }
}

export default DynamicEditorComponent;
