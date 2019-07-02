import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@dinify/common/dist/components/Typography';
import { useTranslation } from 'react-i18next';

import Addons from './Addons';
import Ingredients from './Ingredients';
import Options from './Options';

const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 0px;
`;

const styles = {
  ListItem: {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: '1px solid rgba(0,0,0,.05)',
  },
};

const Menucontrol = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HeadLine>
        <Grid container spacing={8} alignItems="flex-start" justify="center">
          <Grid item xs={4} style={{position: 'relative'}}>
            <Typography gutterBottom variant="caption">{t('menu.ingredients')}</Typography>
            <Ingredients styles={styles} />
          </Grid>

          <Grid item xs={4} style={{position: 'relative'}}>
            <Typography gutterBottom variant="caption">{t('menu.addons')}</Typography>
            <Addons styles={styles} />
          </Grid>

          <Grid item xs={4} style={{position: 'relative'}}>
            <Typography gutterBottom variant="caption">{t('menu.optionGroups')}</Typography>
            <Options styles={styles} />
          </Grid>
        </Grid>
      </HeadLine>
    </div>
  );
};

export default Menucontrol;
