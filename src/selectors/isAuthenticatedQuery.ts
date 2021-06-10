import { Credentials } from 'react-native-auth0';
import { atomFamily, selectorFamily } from 'recoil';

import { auth0 } from 'src/lib/auth0';

const currentAuthScopeRequestIDState = atomFamily({
    key: 'CurrentAuthScopeRequestID',
    default: 0,
});

export const isAuthenticatedQuery = selectorFamily<Credentials, string>({
    key: 'IsAuthenticated',
    get: (scope) => async ({ get }): Promise<Credentials> => {
        get(currentAuthScopeRequestIDState(scope));
        const credentials = await auth0.webAuth.authorize({ scope });

        return credentials;
    },
});
