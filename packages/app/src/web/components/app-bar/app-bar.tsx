import React from 'react';
import AppBarAction from './app-bar-action';
import AppBarTitle from './app-bar-title';
import Gradient from './gradient';

import { select } from '@dinify/common/src/lib/platform';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from '../../../features/ui/selectors';

interface AppBarProps {
    style?: React.CSSProperties,
    invert?: boolean,
    type?: 'filled' | 'gradient'
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
    style,
    children,
    type = 'filled',
    invert = false,
    ...otherProps
}) => {
    const theme = useTheme({ type: type === 'gradient' ? 'dark' : undefined, invert: false });
    const { palette: { background: { paper }, divider } } = theme;
    const coupertino = {
        backgroundColor: theme.coupertino.backgroundColor,
        WebkitBackdropFilter: theme.coupertino.backdropFilter,
        backdropFilter: theme.coupertino.backdropFilter,
        borderBottom: `1px solid ${theme.coupertino.borderColor}`
    };
    let appBarStyle = select({
        standard: {
            backgroundColor: paper,
            borderBottom: `1px solid ${divider}`
        },
        osx: coupertino,
        ios: coupertino
    });
    if (type === 'gradient') {
        appBarStyle = {
            position: 'relative',
        };
    }
    return (
        <MuiThemeProvider theme={theme}>
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
                {type === 'gradient' && <Gradient style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                }} />}
                {children}
            </div>
        </MuiThemeProvider>

    );
};

AppBar.Action = AppBarAction;
AppBar.Title = AppBarTitle;

export default AppBar;