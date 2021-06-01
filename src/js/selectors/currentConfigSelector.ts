import { atomFamily, selectorFamily } from 'recoil';
import {
    getRemoteConfig, fetchAndActivate, getValue,
} from 'firebase/remote-config';

import { defaultConfig } from 'js/config/default';

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
    default: 0,
});

export const currentConfigSelector = selectorFamily({
    key: 'currentConfig',
    get: (userId) => async ({ get }): Promise<App.Config> => {
        get(currentConfigRequestIDState(userId));

        await fetchAndActivate(remoteConfig);

        return buildConfig();
    },
});
