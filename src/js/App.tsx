import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import * as eva from '@eva-design/eva';

import { ErrorBoundary } from 'js/components/ErrorBoundary';
import { Routes } from 'js/Routes';
import { useTheme } from 'js/hooks/useTheme';
import { ErrorPage } from 'js/pages/ErrorPage';
import { MaterialUIIconsPack } from 'js/components/MaterialUIIconsPack';
import { ServiceProvider } from 'js/components/ServiceProvider';
import { useFirebase } from 'js/hooks/useFirebase';

export const App = (): JSX.Element => {
    useFirebase();

    const [fontsLoaded, theme] = useTheme();

    if (!fontsLoaded) {
        return (<AppLoading />);
    }

    if (theme === undefined) {
        const error = new Error('Failed to load theme');

        return (<ErrorPage error={error} />);
    }

    return (
        <RecoilRoot>
            <ErrorBoundary>
                <IconRegistry icons={MaterialUIIconsPack} />
                <ApplicationProvider {...eva} theme={theme}>
                    <Suspense fallback={AppLoading}>
                        <ServiceProvider>
                            <Routes />
                            {/* eslint-disable-next-line react/style-prop-object */}
                            <StatusBar style="auto" />
                        </ServiceProvider>
                    </Suspense>
                </ApplicationProvider>
            </ErrorBoundary>
        </RecoilRoot>
    );
};
