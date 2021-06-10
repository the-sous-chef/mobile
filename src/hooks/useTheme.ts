/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';
import {
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';

import { theme } from 'src/lib/theme';

type UseThemeTuple = [
    boolean,
    App.Theme | undefined,
];

export const useTheme = (): UseThemeTuple => {
    const [completeTheme, setCompleteTheme] = useState<App.Theme | undefined>();
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        OpenSans_300Light,
        OpenSans_400Regular,
        OpenSans_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            setCompleteTheme(theme);
        }
    }, [fontsLoaded]);

    return [fontsLoaded, completeTheme];
};
