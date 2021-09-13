import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import * as eva from '@eva-design/eva';

import { ApolloProvider } from 'src/components/Providers/ApolloProvider';
import { AuthBoundary } from 'src/components/common/AuthBoundary';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { FirebaseProvider } from 'src/components/Providers/FirebaseProvider';
import { Routes } from 'src/Routes';
import { useTheme } from 'src/hooks/useTheme';
import { ErrorPage } from 'src/pages/ErrorPage';
import { MaterialUIIconsPack } from 'src/components/MaterialUIIconsPack';

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
                            <FirebaseProvider>
                                <ApolloProvider>
                                    <Routes />
                                    {/* eslint-disable-next-line react/style-prop-object */}
                                    <StatusBar style="auto" />
                                </ApolloProvider>
                            </FirebaseProvider>
                        </AuthBoundary>
                    </Suspense>
                </ApplicationProvider>
            </ErrorBoundary>
        </RecoilRoot>
    );
};
