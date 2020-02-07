import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMenuCategoryView } from '../../../features/menuCategory/selectors';
import { Grid } from '@material-ui/core';
import { useTheme } from '../../../features/ui/selectors';
import MenuItem from './menu-item';
import * as FN from '@dinify/common/src/lib/FN';

export default ({
  menuCategoryId
}: {
  menuCategoryId: string
}) => {
  const theme = useTheme();
  const [divider, setDivider] = useState(false);
  const menuCategory = useMenuCategoryView(menuCategoryId);
  const mobile = FN.isMobile();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (container.current) {
        const box = container.current.getBoundingClientRect();
        if (box.top === 0 && !divider) {
          setDivider(true);
        }
        else if (box.top !== 0 && divider) {
          setDivider(false);
        }
      }

    };
    document.addEventListener('scroll', listener);
    return function cleanup() {
      document.removeEventListener('scroll', listener);
    }
  });
  return <>
    <div ref={container} className="sticky" style={{
      zIndex: 50,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      height: 32,
      padding: '0 16px',
      backgroundColor: theme.palette.background.paper,
      borderBottom: divider ? `1px solid ${theme.palette.divider}` : 'none'
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
    {!mobile && <Grid style={{ padding: 16 }} container spacing={16}>
      {menuCategory.items.map(id => (
        <Grid item xs={6} sm={4} md={6} key={id}>
          <MenuItem style={{ width: '100%' }} menuItemId={id} />
        </Grid>
      ))}
    </Grid>}
  </>;
};
