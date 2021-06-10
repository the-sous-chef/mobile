import {
    ApolloClient, ApolloProvider, InMemoryCache,
} from '@apollo/client';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { currentConfigQuery } from 'src/selectors/currentConfigQuery';

export interface PropTypes {
    accessToken: string;
    children: ReactNode;
}

export const ServicesProvider = (props: PropTypes): JSX.Element => {
    const { accessToken, children } = props;
    const config = useRecoilValue(currentConfigQuery(accessToken));
    const client = new ApolloClient({
        uri: config.services.recipes.baseURL,
        cache: new InMemoryCache(),
    });

    return (<ApolloProvider client={client}>{children}</ApolloProvider>);
};
