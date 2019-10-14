import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { getT } from '@dinify/common/src/lib/translation.ts';
import { connect } from 'react-redux';

export const Customizations = styled.div`
  margin-top: 10px;
`;

const customItemColors = [
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63',
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63',
];
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const ListOfCustomizations = ({ list, rmButtonFunction, classes, ActionComponent, lang }) => {
  if (list && list.length > 0) {
    return (
      <MuiThemeProvider theme={theme}>
        <Customizations>
          {list.map((customization, i) => (
            <Chip
              style={{background: customItemColors[i] || 'black'}}
              key={i}
              label={
                <span style={{ whiteSpace: 'nowrap' }}>
                  {getT(customization.translations, lang)}{' '}
                  {customization.price ? `${customization.price.amount}${customization.price.currency}` : ''}
                  {ActionComponent ? <ActionComponent ingredient={customization} /> : ''}
                </span>
              }
              onDelete={() => rmButtonFunction(customization)}
              className={classes.chip}
            />
          ))}
        </Customizations>
      </MuiThemeProvider>
    );
  }
  return null;
};

export default connect(
  (state) => ({
    lang: state.restaurant.defaultLanguage,
  })
)(withStyles(styles)(ListOfCustomizations));
