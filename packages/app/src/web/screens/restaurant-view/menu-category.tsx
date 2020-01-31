import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useMenuCategoryView } from '../../../features/menuCategory/selectors';
import { Grid } from '@material-ui/core';
import { useTheme } from '../../../features/ui/selectors';

export default ({
  menuCategoryId
}: {
  menuCategoryId: string
}) => {
  const theme = useTheme();
  const menuCategory = useMenuCategoryView(menuCategoryId);
  return <>
    <div className="sticky" style={{
      top: 0,
      display: 'flex',
      alignItems: 'center',
      height: 32,
      padding: '0 16px',
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`
    }}>
      <Typography variant="h6">
        {menuCategory.name}
      </Typography>
    </div>
    <div className="hide-scrollbar" style={{
      display: 'none',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100%',
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
          <div>
            {id}
          </div>
        </div>
      ))}
    </div>
    <Grid container spacing={16}>
      {menuCategory.items.map(id => (
        <Grid item xs={6} sm={4} md={6} key={id}>
          <code style={{ height: 100, display: 'block' }}>
            {id}
          </code>
        </Grid>
      ))}
    </Grid>
  </>;
};
