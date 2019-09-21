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
    
    const getColor = (sw: boolean) => {
        const alpha = (!sw ? 200 : 90) / 255;
        const color = sw ? '0,0,0': '255,255,255';
        return `rgba(${color}, ${alpha})`;
      };
      const appleStyle = {
        backgroundColor: getColor(type === 'dark'),
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `0.5px solid ${getColor(type !== 'dark')}`
      };
      const appBarStyle = select({
        standard: {
            backgroundColor: paper,
            borderBottom: `1px solid ${divider}`
        },
        osx: appleStyle,
        ios: appleStyle
      });
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