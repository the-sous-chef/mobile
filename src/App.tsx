import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import * as eva from '@eva-design/eva';

import 'src/lib/firebase';
import { AuthBoundary } from 'src/components/AuthBoundary';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { Routes } from 'src/Routes';
import { useTheme } from 'src/hooks/useTheme';
import { ErrorPage } from 'src/pages/ErrorPage';
import { MaterialUIIconsPack } from 'src/components/MaterialUIIconsPack';
import { ServicesProvider } from 'src/components/ServicesProvider';

export const App = (): JSX.Element => {
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
                        <AuthBoundary>
                            {(accessToken: string): JSX.Element => (
                                <ServicesProvider accessToken={accessToken}>
                                    <Routes />
                                    {/* eslint-disable-next-line react/style-prop-object */}
                                    <StatusBar style="auto" />
                                </ServicesProvider>
                            )}
                        </AuthBoundary>
                    </Suspense>
                </ApplicationProvider>
            </ErrorBoundary>
        </RecoilRoot>
    );
};
