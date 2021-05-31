/* eslint-disable react/style-prop-object */
import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import ErrorBoundary from 'src/js/components/ErrorBoundary';
import Routes from 'src/js/Routes';
import useTheme from 'src/js/hooks/useTheme';
import ErrorPage from 'src/js/pages/ErrorPage';
import { MaterialUIIconsPack } from 'src/js/components/MaterialUIIconsPack';

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
        <>
            <IconRegistry icons={MaterialUIIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
                <ErrorBoundary>
                    <Routes />
                    <StatusBar style="auto" />
                </ErrorBoundary>
            </ApplicationProvider>
        </>
    );
};

export default App;
