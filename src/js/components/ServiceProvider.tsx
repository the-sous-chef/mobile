import {
    ApolloClient, ApolloProvider, InMemoryCache,
} from '@apollo/client';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { currentConfigSelector } from 'js/selectors/currentConfigSelector';

export interface PropTypes {
    children: ReactNode;
}

export const ServiceProvider = (props: PropTypes): JSX.Element => {
    const { children } = props;
    const userId = '';
    const config = useRecoilValue(currentConfigSelector(userId));
    const client = new ApolloClient({
        uri: config.services.recipes.baseURL,
        cache: new InMemoryCache(),
    });

    return (<ApolloProvider client={client}>{children}</ApolloProvider>);
};
