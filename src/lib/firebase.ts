import { getAuth, signOut } from 'firebase/auth';
import firebase from 'firebase/app';

import { config } from 'src/config';

firebase.initializeApp(config.firebase);
// firebase.analytics();

export const logout = (): Promise<void> => signOut(getAuth());
