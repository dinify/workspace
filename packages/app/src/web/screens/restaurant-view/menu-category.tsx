import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMenuCategoryView } from 'features/menuCategory/selectors';
import { Grid, Divider } from '@material-ui/core';
import { useTheme } from 'features/ui/selectors';
import MenuItem from './menu-item';
// import * as FN from '@dinify/common/src/lib/FN';

export default ({
  menuCategoryId
}: {
  menuCategoryId: string
}) => {
  const theme = useTheme();
  const menuCategory = useMenuCategoryView(menuCategoryId);
  const mobile = false; // FN.isMobile();
  const container = useRef<HTMLDivElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <Divider className="sticky" style={{
        zIndex: 50,
        top: 40
      }} />
      <div ref={container} className="sticky" style={{
        top: 0,
        zIndex: 50,
        height: 41,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.background.paper}`,
        transform: 'translate(0, -1px)'
      }}>
        <Typography variant="h6">
          {menuCategory.name}
        </Typography>
      </div>
      {mobile && <div className="hide-scrollbar" style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        paddingTop: 16,
        paddingBottom: 32,
        WebkitScrollSnapType: 'mandatory',
        scrollSnapType: 'x mandatory',
        WebkitScrollSnapPointsX: 'repeat(100%)',
        scrollSnapPointsX: 'repeat(100%)',
        WebkitOverflowScrolling: 'touch',
        whiteSpace: 'nowrap',
      }}>
        {menuCategory.items.map((id, i, arr) => (
          <div
            key={id}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapAlign: 'start',
              display: 'inline-block',
              width: 'calc(50% - 16px)',
              paddingLeft: 16,
              marginRight: arr.length - 1 === i ? 16 : 0,
            }}
          >
            <MenuItem style={{ width: '100%' }} menuItemId={id} />
          </div>
        ))}
      </div>}
      {!mobile && <div style={{
        width: '100%',
        overflow: 'hidden',
      }}>
        <Grid style={{ padding: 16 }} container spacing={2}>
          {menuCategory.items.map(id => (
            <Grid key={id} item xs={6} sm={4} >
              <MenuItem style={{ width: '100%' }} menuItemId={id} />
            </Grid>
          ))}
        </Grid>
      </div>}
    </div>
  );
};
