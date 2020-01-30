import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useMenuCategoryView } from '../../../features/menuCategory/selectors';

export default ({
  menuCategoryId
}: {
  menuCategoryId: string
}) => {
  const menuCategory = useMenuCategoryView(menuCategoryId);
  return <>
    <Typography
      gutterBottom
      variant="h6"
    >
      {menuCategory.name}
    </Typography>
  </>;
};
