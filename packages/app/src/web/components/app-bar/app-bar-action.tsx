import React from 'react';

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CloseRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import DoneIcon from '@material-ui/icons/DoneRounded';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import BackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

import { select } from '@dinify/common/src/lib/platform';
import { useTranslation } from '@dinify/common/src/lib/i18n';

type AppBarActionType = 'close' | 'cancel' | 'edit' | 'done' | 'back';

const AppBarAction: React.FC<{
  onClick?: () => void,
  type?: AppBarActionType,
  style?: React.CSSProperties,
}> = ({
  onClick = () => { },
  children,
  type,
  ...otherProps
}) => {
    const pe: any = { pointerEvents: 'auto' };
    const { t } = useTranslation();
    const getTextButton = (text: string) => (
      <Button style={pe} onClick={onClick} {...otherProps}>
        {text}
      </Button>
    );

    const getIconButton = (icon: any) => (
      <IconButton style={pe} onClick={onClick} {...otherProps}>
        {icon}
      </IconButton>
    );

    const appBarActions: { [key: string]: any } = {
      back: select({
        ios: (
          <Button style={pe} onClick={onClick} {...otherProps}>
            <BackIosIcon style={{ marginRight: -8 }} />
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
      })
    };
    if (!type) {
      return children;
    }
    return appBarActions[type];
  };

export default AppBarAction;