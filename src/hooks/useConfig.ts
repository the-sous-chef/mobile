import { useRecoilValue } from 'recoil';

import { credentialsState } from 'src/atoms/credentials';
import { currentConfigQuery } from 'src/selectors/currentConfigQuery';

export const useConfig = (): App.Config | null => {
    const credentials = useRecoilValue(credentialsState);
    const config = useRecoilValue(currentConfigQuery(credentials?.firebaseToken));

    return config;
};
