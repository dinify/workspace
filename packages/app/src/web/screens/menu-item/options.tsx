import React from 'react';
import { useOptionView } from '../../../ducks/option/selectors';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles, StyleRulesCallback } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Price from '../../components/Price';
import { useDispatch } from 'react-redux';
import { selectChoice } from '../../../ducks/menuItem/actions';

const styles: StyleRulesCallback = theme => ({
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chipDifference: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: theme.palette.divider,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 16,
  },
  selected: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    '&:hover, &:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.24),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: fade(theme.palette.primary.main, 0.38),
    },
  },
  excluded: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(
  ({ classes, menuItemId }: { classes: any; menuItemId: string }) => {
    const options = useOptionView(menuItemId);
    const dispatch = useDispatch();
    return (
      <>
        {options.map(option => (
          <div key={option.id}>
            <Typography
              style={{ marginTop: 32 }}
              color="textSecondary"
              variant="overline"
            >
              {option.name}
            </Typography>
            <div className={classes.chipContainer}>
              {option.choices.map(choice => (
                <Chip
                  variant="outlined"
                  key={choice.id}
                  avatar={
                    <div
                      style={
                        choice.price.amount !== 0 ? {} : { display: 'none' }
                      }
                      className={classes.chipDifference}
                    >
                      <Typography variant="caption">
                        <Price price={choice.price} />
                      </Typography>
                    </div>
                  }
                  classes={{
                    root: choice.selected ? classes.selected : null,
                  }} // add class if selected
                  onClick={() => {
                    dispatch(
                      selectChoice({
                        menuItemId,
                        optionId: option.id,
                        choiceId: choice.id,
                      }),
                    );
                  }} // select choice
                  className={classes.chip}
                  label={choice.name}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  },
);
