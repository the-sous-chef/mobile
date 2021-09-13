import { atomFamily, selectorFamily } from 'recoil';
import { getAuth, signInWithCustomToken, UserCredential } from 'firebase/auth';

export const firebaseAuthRequestIDState = atomFamily({
    key: 'FirebaseAuthRequestIDState',
    default: '',
});

export const firebaseAuthQuery = selectorFamily({
    key: 'FirebaseAuth',
    get: (accessToken: string | undefined) => async ({ get }): Promise<UserCredential | null> => {
        if (accessToken) {
            get(firebaseAuthRequestIDState(accessToken));

            const auth = getAuth();
            const credentials = await signInWithCustomToken(auth, accessToken);

            return credentials;
        }

        return null;
    },
});
