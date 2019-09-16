import React from 'react';
import AppBarAction from './app-bar-action';
import AppBarTitle from './app-bar-title';

import { withTheme } from '@material-ui/core/styles';
import { select } from '../../../lib/platform';

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
    const { palette: { type, background: { paper }, divider }} = theme;
    
    const appBarStyle = select({
        standard: {
            backgroundColor: paper,
            borderBottom: `1px solid ${divider}`
        },
        ios: {
            backgroundColor: `rgba(${type === 'dark' ? '0,0,0': '255,255,255'}, ${90 / 255})`,
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `0.5px solid rgba(0, 0, 0, ${(type === 'dark' ? 180 : 90) / 255})`,
        }
    })
    return (
        <div style={{
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            height: 56,
            padding: 8,
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