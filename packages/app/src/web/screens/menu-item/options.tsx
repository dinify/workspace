import React from 'react';
import { useOptionView } from 'features/option/selectors';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Price from '@dinify/common/src/components/price';
import { selectChoice as selectChoiceAction } from 'features/menuItem/actions';
import { useAction } from '@dinify/common/src/lib/util';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { AppTheme } from '@dinify/common/src/theme';

const styles = (theme: AppTheme) => ({
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 500,
  },
  chipDifference: {
    fontWeight: 400,
    paddingLeft: 12,
    paddingRight: 12,
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: theme.palette.divider,
    borderRadius: 16,
    width: 'auto !important',
    height: '30px !important',
    marginLeft: '0px !important',
  },
  selected: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
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

export default withStyles(styles as any)(
  ({ classes, menuItemId }: { classes: any; menuItemId: string }) => {
    const options = useOptionView(menuItemId);
    const selectChoice = useAction(selectChoiceAction);
    const { t } = useTranslation();
    return (
      <>
        {options.length > 0 && <Typography variant="caption" color="textSecondary">
          {t('cart.requiredChoices')}
        </Typography>}
        {options.map(option => (
          <div key={option.id}>
            <Typography
              style={{ marginTop: 16 }}
              color="primary"
              variant="overline"
            >
              {option.name}
            </Typography>
            <div className={classes.chipContainer}>
              {option.choices.map(choice => (
                <Chip
                  style={{ alignItems: choice.price.amount !== 0 ? 'baseline' : 'center' }}
                  variant="outlined"
                  key={choice.id}
                  avatar={
                    <div
                      style={
                        choice.price.amount !== 0 ? {} : { display: 'none' }
                      }
                      className={classes.chipDifference}
                    >
                      <Typography style={{ height: 15 }} variant="caption">
                        <Price price={choice.price} />
                      </Typography>
                    </div>
                  }
                  classes={{
                    root: choice.selected ? classes.selected : null,
                  }} // add class if selected
                  onClick={() => {
                    selectChoice({
                      menuItemId,
                      optionId: option.id,
                      choiceId: choice.id,
                    });
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
