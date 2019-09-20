import React from 'react';

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CloseRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import DoneIcon from '@material-ui/icons/DoneRounded';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import BackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

import { select } from '../../../lib/platform';
import { Typography } from '../../components/typography'

type AppBarActionType = 'close' | 'cancel' | 'edit' | 'done' | 'back';

const AppBarAction: React.FC<{
  onClick?: () => void,
  type: AppBarActionType,
}> = ({
  onClick = () => { },
  type,
  ...otherProps
}) => {
    const getTextButton = (text: string) => (
      <Button onClick={onClick} {...otherProps}>
        <Typography color="primary" variant="button2">
          {text}
        </Typography>
      </Button>
    );

    const getIconButton = (icon: any) => (
      <IconButton onClick={onClick} {...otherProps}>
        {icon}
      </IconButton>
    );

    const appBarActions: {[key: string]: any} = {
      back: select({
        ios: (
          <Button onClick={onClick} {...otherProps}>
            <BackIosIcon/>
            <Typography color="primary" variant="button2">
              Back {/* TODO: previous screen name */}
            </Typography>
          </Button>
        ),
        standard: getIconButton(<BackIcon/>)
      }),
      close: select({
        ios: getTextButton('Cancel'),
        standard: getIconButton(<CloseIcon/>)
      }),
      edit: select({
        ios: getTextButton('Edit'),
        standard: getIconButton(<EditIcon/>)
      }),
      done: select({
        ios: getTextButton('Done'),
        standard: getIconButton(<DoneIcon/>)
      })
    };
    return appBarActions[type];
  };

export default AppBarAction;