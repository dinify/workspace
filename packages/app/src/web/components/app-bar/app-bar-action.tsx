import React from 'react';

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CloseRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import DoneIcon from '@material-ui/icons/DoneRounded';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import BackIosIcon from '@material-ui/icons/ArrowBackIosRounded';
import MoreIcon from '@material-ui/icons/MoreVert';
import MoreIosIcon from '@material-ui/icons/MoreHoriz';

import Button from '@material-ui/core/Button';

import { select } from '@dinify/common/src/lib/platform';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { PropTypes } from '@material-ui/core';

type AppBarActionType = 'close' | 'cancel' | 'edit' | 'done' | 'back' | 'more';

const AppBarAction: React.FC<{
  onClick?: () => void,
  type?: AppBarActionType,
  style?: React.CSSProperties,
  color?: PropTypes.Color,
}> = ({
  onClick = () => { },
  children,
  type,
  color,
  ...otherProps
}) => {
    const pe: any = { pointerEvents: 'auto' };
    const { t } = useTranslation();
    const getTextButton = (text: string) => (
      <Button color={color} style={pe} onClick={onClick} {...otherProps}>
        {text}
      </Button>
    );

    const getIconButton = (icon: any) => (
      <IconButton color={color} style={pe} onClick={onClick} {...otherProps}>
        {icon}
      </IconButton>
    );

    const appBarActions: { [key: string]: any } = {
      back: select({
        ios: (
          <Button color={color} style={pe} onClick={onClick} {...otherProps}>
            <BackIosIcon style={{ marginRight: -4 }} />
            {t('appBar.back')} {/* TODO: possibly previous screen name */}
          </Button>
        ),
        standard: getIconButton(<BackIcon />)
      }),
      close: select({
        ios: getTextButton('Close'),
        standard: getIconButton(<CloseIcon />)
      }),
      edit: select({
        ios: getTextButton(t('appBar.edit')),
        standard: getIconButton(<EditIcon />)
      }),
      done: select({
        ios: getTextButton(t('appBar.done')),
        standard: getIconButton(<DoneIcon />)
      }),
      more: select({
        ios: getIconButton(<MoreIosIcon />),
        standard: getIconButton(<MoreIcon />)
      })
    };
    if (!type) {
      return children;
    }
    return appBarActions[type];
  };

export default AppBarAction;