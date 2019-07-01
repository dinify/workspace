import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

const ListOfCustomizations = ({ list, rmButtonFunction, classes, ActionComponent }) => {
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
                  {customization.name}{' '}
                  {customization.price ? `${customization.price.amount}KD` : ''}
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

export default withStyles(styles)(ListOfCustomizations);
