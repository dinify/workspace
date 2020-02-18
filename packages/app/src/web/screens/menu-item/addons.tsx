import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircleRounded';
import RemoveCircle from '@material-ui/icons/RemoveCircleRounded';
import Price from '@dinify/common/src/components/price';
import { incAddonQty as incAddonQtyAction } from 'features/menuItem/actions';
import { useAddonView } from 'features/addon/selectors';
import { useAction } from '@dinify/common/src/lib/util';

export default ({ menuItemId }: { menuItemId: string }) => {
  const { t } = useTranslation();
  const incAddonQty = useAction(incAddonQtyAction);
  const addons = useAddonView(menuItemId);
  return (
    <div>
      <Typography style={{ marginTop: 16 }} color="primary" variant="overline">
        {t('addons')}
      </Typography>
      {addons.map(addon => (
        <Grid
          key={addon.id}
          container
          wrap="nowrap"
          style={{ marginTop: 8, alignItems: 'center' }}
          spacing={2}
        >
          <Grid item>
            <IconButton
              onClick={() => {
                if (addon.amount > 0) {
                  incAddonQty({
                    menuItemId,
                    addonId: addon.id,
                    inc: -1,
                  });
                }
              }} // remove addon if amount > 0
              disabled={addon.amount < 1}
            >
              <RemoveCircle />
            </IconButton>
          </Grid>
          <Grid item style={{ flex: 1 }}>
            <Typography color="textSecondary" variant="overline">
              <Price price={addon.price} />
            </Typography>
            <Typography>{addon.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {addon.amount ? `× ${addon.amount}` : ''}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                incAddonQty({
                  menuItemId,
                  addonId: addon.id,
                  inc: 1,
                });
              }} // add addon if amount < max - 1
              disabled={addon.amount >= addon.maximum && addon.maximum !== null}
            >
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};
