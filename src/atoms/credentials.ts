import { atom } from 'recoil';

export const credentialsState = atom<App.Credentials | null>({
    key: 'CredentialsState',
    default: null,
});
