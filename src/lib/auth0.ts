import Auth0, { ClearSessionParams } from 'react-native-auth0';
import Config from 'react-native-config';

export const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

export const logout = async (): Promise<void> => {
    await auth0.webAuth.clearSession({} as ClearSessionParams);
};
