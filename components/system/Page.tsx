import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import AOS from 'aos';
import getTheme from 'theme';
import Main from 'layouts/Main';
import { useRouter } from 'next/router';
import DashboardMain from 'layouts/DashboardMain';
import { DataProvider } from 'contexts/data';
import { CartProvider } from 'react-use-cart';

export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string) => {
    try {
      window.localStorage.setItem('themeMode', mode);
    } catch {
      /* do nothing */
    }

    setTheme(mode);
  };

  const themeToggler = (): void => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem('themeMode');
      localTheme ? setTheme(localTheme) : setMode('light');
    } catch {
      setMode('light');
    }

    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

interface Props {
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const isDashboard = router.asPath.startsWith('/dashboard');

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent, themeMode]);

  return (
    <MuiThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Paper elevation={0}>
          {isDashboard ? (
            <DashboardMain>{children}</DashboardMain>
          ) : (
            <DataProvider>
              <CartProvider>
                <Main>{children}</Main>
              </CartProvider>
            </DataProvider>
          )}
        </Paper>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Page;
