import React from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'emotion-theming';
import { StatusBar } from 'expo-status-bar';

import { Container } from 'src/js/ui';
import ErrorBoundary from 'src/js/components/ErrorBoundary';
import Routes from 'src/js/Routes';
import useTheme from 'src/js/hooks/useTheme';
import ErrorPage from 'src/js/pages/ErrorPage';

const App = (): JSX.Element => {
    const [fontsLoaded, theme] = useTheme();

    if (!fontsLoaded) {
        return (<AppLoading />);
    }

    if (theme === undefined) {
        const error = new Error('Failed to load theme');

        return (<ErrorPage error={error} />);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ErrorBoundary>
                    <Routes />
                    <StatusBar style="auto" />
                </ErrorBoundary>
            </Container>
        </ThemeProvider>
    );
};

export default App;
