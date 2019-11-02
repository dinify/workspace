import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from '@dinify/common/src/lib/i18n';

export const Separator = ({ classes }: any) => {
  
  const { t } = useTranslation();

  return (
    <div style={{marginBottom: 16}} className={classes && classes.flex}>
      <Divider className={classes && classes.grow} />
      <div style={{height: 0, display: 'flex', alignItems: 'center'}}>
        <Typography
          variant="caption"
          component="span"
          color="textSecondary"
          style={{ paddingLeft: 8, paddingRight: 8 }}>
          {t('auth.or')}
        </Typography>
      </div>
      <Divider className={classes && classes.grow} />
    </div>
  );
}