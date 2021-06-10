import { useRecoilValue } from 'recoil';

import { isAuthenticatedQuery } from 'src/selectors/isAuthenticatedQuery';

export interface PropTypes {
    children: (acessToken: string) => JSX.Element;
}

export const AuthBoundary = (props: PropTypes): JSX.Element => {
    const { children } = props;
    const credentials = useRecoilValue(isAuthenticatedQuery('openid profile email'));

    return children(credentials.accessToken);
};
