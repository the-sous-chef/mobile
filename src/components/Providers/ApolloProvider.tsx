import {
    ApolloClient,
    ApolloProvider as ApolloClientProvider,
    InMemoryCache,
} from '@apollo/client';
import { HTMLProps } from 'react';
import { useRecoilValue } from 'recoil';
import { credentialsState } from 'src/atoms/credentials';

import { currentConfigQuery } from 'src/selectors/currentConfigQuery';

export const ApolloProvider = (props: HTMLProps<HTMLElement>): JSX.Element => {
    const { children } = props;
    const credentials = useRecoilValue(credentialsState);
    const config = useRecoilValue(currentConfigQuery(credentials?.accessToken));

    return (
        <>
            {config != null && (
                <ApolloClientProvider
                    client={new ApolloClient({
                        uri: config.services.recipes.prefixUrl,
                        cache: new InMemoryCache(),
                    })}
                >
                    {children}
                </ApolloClientProvider>
            )}
        </>
    );
};
