import { HTMLProps, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { credentialsState } from 'src/atoms/credentials';
import { isAuthenticatedQuery } from 'src/selectors/isAuthenticatedQuery';

export const AuthBoundary = (props: HTMLProps<HTMLElement>): JSX.Element => {
    const { children } = props;
    const credentials = useRecoilValue(isAuthenticatedQuery('openid profile email'));
    const credentialsSetState = useSetRecoilState(credentialsState);

    useEffect(() => {
        if (credentials) {
            credentialsSetState(credentials);
        }
    }, [credentials, credentialsSetState]);

    return (
        <>
            {credentials !== null && children}
        </>
    );
};
