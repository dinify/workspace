import React from 'react';
import { compose } from 'redux';
import { withState } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';

import Flag from 'components/Flag';
import languages from 'lib/languages';
import countries from 'lib/countries';

const styles = theme => ({

})

const LanguagePickerDialog = (props) => {
  const {
    classes,
    filter,
    setFilter,
    selectedLang,
    setSelectedLang,
    open = false,
    ...other
  } = props;
  return (
    <Dialog open={open} {...other}>
      <DialogTitle>
        Select language
      </DialogTitle>
      <div style={{padding: '0px 24px'}}>
        <TextField
          fullWidth
          dense
          name="Search"
          label="Search"
          hint="Search"
          variant="filled"
          value={filter}
          onChange={evt => {setFilter(evt.target.text)}}/>
      </div>
      <Divider style={{marginTop: 16}}/>
      <div style={{maxHeight: 240, overflowY: 'scroll', paddingTop: 8, paddingBottom: 8}}>
        {languages.map((lang, i) => {
          const solo = lang[3].length === 1;
          return (
            <ListItem key={i} dense button style={{paddingLeft: 24, paddingRight: 24}}
              onClick={() => { /* TODO: display available regions for language */ }}>
              <ListItemText primary={lang[1]} secondary={lang[2]}/>
              {solo ? <Flag country={lang[3][0][0].split('-')[1]}/> : <ChevronRight style={{opacity: 0.54}}/>}
            </ListItem>
          );
        })}
      </div>
      <Divider />
      <DialogActions>
        <Button  color="primary" onClick={() => {/* TODO: return selected language */}}>
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const enhance = compose(
  withState('filter', 'setFilter'),
  withState('selectedLang', 'setSelectedLang'),
  withStyles(styles)
);

export default enhance(LanguagePickerDialog);
