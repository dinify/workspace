import React from 'react';

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

import { select } from '../../../lib/platform';
import { Typography } from '../../components/typography'

type AppBarActionType = 'close' | 'done';

const AppBarAction: React.FC<{
  onClick?: () => void,
  type: AppBarActionType,
}> = ({
  onClick = () => { },
  type,
  ...otherProps
}) => {
    const appBarActions: {[key: string]: any} = {
      close: select({
        ios: (
          <Button onClick={onClick} {...otherProps}>
            <Typography color="primary" variant="button2">
              Cancel
            </Typography>
          </Button>
        ),
        standard: (
          <IconButton onClick={onClick} {...otherProps}>
            <CloseIcon />
          </IconButton>
        )
      }),
      done: select({
        ios: (
          <Button onClick={onClick} {...otherProps}>
            <Typography color="primary" variant="button2">
              Done
            </Typography>
          </Button>
        ),
        standard: (
          <Button onClick={onClick} {...otherProps}>
            <Typography variant="button">
              Save
            </Typography>
          </Button>
        )
      })
    };
    return appBarActions[type];
  };

export default AppBarAction;