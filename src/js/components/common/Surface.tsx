import {
    Animated,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { useTheme } from '@ui-kitten/components';

import shadow from 'js/lib/styles/shadow';
import overlay from 'js/lib/styles/overlay';

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Content of the `Surface`.
     */
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

/**
 * Surface is a basic container that can give depth to an element with elevation shadow.
 * On dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay
 * over a component surface.
 * See [Dark Theme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.
 * Overlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.
 *
 * <div class="screenshots">
 *   <img src="screenshots/surface-1.png" />
 *   <img src="screenshots/surface-2.png" />
 *   <img src="screenshots/surface-3.png" />
 * </div>
 *
 * <div class="screenshots">
 *   <img src="screenshots/surface-dark-1.png" />
 *   <img src="screenshots/surface-dark-2.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Surface, Text } from 'react-native-paper';
 * import { StyleSheet } from 'react-native';
 *
 * const MyComponent = () => (
 *   <Surface style={styles.surface}>
 *      <Text>Surface</Text>
 *   </Surface>
 * );
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   surface: {
 *     padding: 8,
 *     height: 80,
 *     width: 80,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     elevation: 4,
 *   },
 * });
 * ```
 */
export const Surface = (props: Props): JSX.Element => {
    const { style, ...rest } = props;
    const flattenedStyles = StyleSheet.flatten(style) || {};
    const { elevation = 4 }: ViewStyle = flattenedStyles;
    const theme = useTheme();

    return (
        // @ts-ignore
        <Animated.View
            {...rest}
            style={[
                {
                    backgroundColor: overlay(elevation, theme.surface),
                },
                elevation && shadow(elevation),
                style,
            ]}
        />
    );
};
