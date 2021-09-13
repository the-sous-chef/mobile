import { HTMLProps } from 'react';
import { useRecoilValue } from 'recoil';

import 'src/lib/firebase';
import { credentialsState } from 'src/atoms/credentials';
import { firebaseAuthQuery } from 'src/selectors/firebaseAuthQuery';

export const FirebaseProvider = (props: HTMLProps<HTMLElement>): JSX.Element => {
    const { children } = props;
    const credentials = useRecoilValue(credentialsState);
    const firebaseToken = useRecoilValue(firebaseAuthQuery(credentials?.accessToken));

    return (
        <>
            {firebaseToken != null && children}
        </>
    );
};
