import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { usePaletteType } from 'features/ui/selectors';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { getTheme } from '@dinify/common/src/theme';

export const Provider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const type = usePaletteType();
  const locale = useIntl(context => context.state.locale);
  const theme = getTheme({ type, locale });
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};