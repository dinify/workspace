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


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});


class Editor extends React.Component {

  render() {
    const { originalsList, type, classes = {}, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Original Name</TableCell>
            <TableCell align="left">Translation</TableCell>
            {type === 'MenuItem' && <TableCell align="left">Description</TableCell>}
            {type === 'MenuItem' && <TableCell align="right">Translation</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {originalsList.map(original => (
            <TableRow key={original.id}>
              <TableCell component="th" scope="row">
                {original.name}
              </TableCell>
              <TableCell align="left">
                <Field
                  name={original.id}
                  component={Text}
                  componentProps={{
                    //fullWidth: true,
                    placeholder: '',
                    style: {minWidth: '150px', maxWidth: '300px'}
                  }}
                />
              </TableCell>
              {type === 'MenuItem' &&
                <TableCell align="left">
                  {original.description}
                </TableCell>
              }
              {type === 'MenuItem' &&
                <TableCell align="right">
                  <Field
                    name={original.id+'_description'}
                    component={Text}
                    componentProps={{
                      multiline: true,
                      rows: 4,
                      //fullWidth: true,
                      placeholder: '',
                      style: {minWidth: '300px'}
                    }}
                  />
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
      </form>
    );
  }
}


//Editor = connect(
//  state => ({})
//)(withStyles(styles)(Editor));


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
