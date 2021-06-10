import { atomFamily, selectorFamily } from 'recoil';
import {
    getRemoteConfig, fetchAndActivate, getValue,
} from 'firebase/remote-config';

import { defaultConfig } from 'src/config/default';

const remoteConfig = getRemoteConfig();

remoteConfig.defaultConfig = defaultConfig;

function buildConfig(): App.Config {
    return {
        ...defaultConfig,
        services: JSON.parse(getValue(remoteConfig, 'services').asString()),
    } as App.Config;
}

export const currentConfigRequestIDState = atomFamily({
    key: 'CurrentConfigRequestIDState',
    default: '',
});

export const currentConfigQuery = selectorFamily({
    key: 'CurrentConfig',
    get: (accessToken) => async ({ get }): Promise<App.Config> => {
        get(currentConfigRequestIDState(accessToken));

        await fetchAndActivate(remoteConfig);

        return buildConfig();
    },
});
