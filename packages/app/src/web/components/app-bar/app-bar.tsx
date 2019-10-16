import React from 'react';
import AppBarAction from './app-bar-action';
import AppBarTitle from './app-bar-title';

import { withTheme } from '@material-ui/core/styles';
import { select } from '@dinify/common/src/lib/platform';

interface AppBarProps {
    style?: React.CSSProperties,
    theme?: any,
}

export interface IAppBar extends React.FC<AppBarProps> {
    Action: any,
    Title: any,
}
/**
 * This component is reponsible for rendering a 
 * Top App Bar (android) / Navigation Bar (ios) in a given page.
 * Should be used directly in page view components.
 */
const AppBar: IAppBar = ({
    theme,
    style,
    children,
    ...otherProps
}) => {
    const { palette: { background: { paper }, divider }} = theme;
      const coupertino = {
        backgroundColor: theme.coupertino.backgroundColor,
        WebkitBackdropFilter: theme.coupertino.backdropFilter,
        backdropFilter: theme.coupertino.backdropFilter,
        borderBottom: `1px solid ${theme.coupertino.borderColor}`
      };
      const appBarStyle = select({
        standard: {
            backgroundColor: paper,
            borderBottom: `1px solid ${divider}`
        },
        osx: coupertino,
        ios: coupertino
      });
    return (
        <div style={{
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            height: 56,
            paddingLeft: 16,
            paddingRight: 16,
            ...appBarStyle,
            ...style
        }} {...otherProps}>
            {children}
        </div>
    );
};

AppBar.Action = AppBarAction;
AppBar.Title = AppBarTitle;

export default withTheme()(AppBar);