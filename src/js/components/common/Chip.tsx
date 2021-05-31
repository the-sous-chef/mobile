import {
    AccessibilityState,
    Animated,
    Platform,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import color from 'color';
import { cloneElement, isValidElement, useRef } from 'react';
import { Icon, Text, useTheme } from '@ui-kitten/components';
import { TouchableWeb } from '@ui-kitten/components/devsupport';

import { Surface } from 'src/js/components/common/Surface';

// import type { IconSource } from './Icon';
// import Icon from './Icon';
// import MaterialCommunityIcon from './MaterialCommunityIcon';
// import Surface from './Surface';
// import TouchableRipple from './TouchableRipple/TouchableRipple';
// import { black, white } from '../styles/colors';
// import type { EllipsizeProp } from '../types';

type Props = React.ComponentProps<typeof Surface> & {
    /**
     * Mode of the chip.
     * - `flat` - flat chip without outline.
     * - `outlined` - chip with an outline.
     */
    mode?: 'flat' | 'outlined';
    /**
     * Text content of the `Chip`.
     */
    children: JSX.Element;
    /**
     * Icon to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    icon?: string;
    /**
     * Avatar to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    avatar?: React.ReactNode;
    /**
     * Whether chip is selected.
     */
    selected?: boolean;
    /**
     * Whether to style the chip color as selected.
     */
    selectedColor?: string;
    /**
     * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.
     */
    closeIconAccessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Function to execute on long press.
     */
    onLongPress?: () => void;
    /**
     * Function to execute on close button press. The close button appears only when this prop is specified.
     */
    onClose?: () => void;
    /**
     * Style of chip's text
     */
    textStyle?: any;
    style?: StyleProp<ViewStyle>;
    /**
     * Pass down testID from chip props to touchable for Detox tests.
     */
    testID?: string;
    /**
     * Ellipsize Mode for the children text
     */
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
};

const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 4,
        position: 'relative',
    },
    icon: {
        padding: 4,
        alignSelf: 'center',
    },
    closeIcon: {
        marginRight: 4,
    },
    text: {
        minHeight: 24,
        lineHeight: 24,
        textAlignVertical: 'center',
        marginVertical: 4,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    avatarWrapper: {
        marginRight: 4,
    },
    avatarSelected: {
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: 'rgba(0, 0, 0, .29)',
    },
    closeButtonStyle: {
        position: 'absolute',
        right: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * Chips can be used to display entities in small blocks.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/chip-1.png" />
 *     <figcaption>Flat chip</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/chip-2.png" />
 *     <figcaption>Outlined chip</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
 * );
 *
 * export default MyComponent;
 * ```
 */
export const Chip = (props: Props): JSX.Element => {
    const {
        mode = 'flat',
        children,
        icon,
        avatar,
        selected = false,
        disabled = false,
        accessibilityLabel,
        closeIconAccessibilityLabel = 'Close',
        onPress,
        onLongPress,
        onClose,
        textStyle,
        style,
        testID,
        selectedColor,
        ellipsizeMode,
        ...rest
    } = props;
    const theme = useTheme();

    const { current: elevation } = useRef<Animated.Value>(
        new Animated.Value(0),
    );

    const handlePressIn = (): void => {
        Animated.timing(elevation, {
            toValue: 4,
            duration: 200 * 1.0,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (): void => {
        Animated.timing(elevation, {
            toValue: 0,
            duration: 150 * 1.0,
            useNativeDriver: true,
        }).start();
    };

    const {
        backgroundColor = mode === 'outlined'
            ? theme.surface
            : '#383838',
        borderRadius = 16,
    } = StyleSheet.flatten(style) || {};

    const borderColor = mode === 'outlined'
        ? color(
            selectedColor !== undefined
                ? selectedColor
                : color(theme.white),
        )
            .alpha(0.29)
            .rgb()
            .string()
        : backgroundColor;
    const textColor = disabled
        ? theme['text-disabled-color']
        : color(selectedColor !== undefined ? selectedColor : theme['text-basic-color'])
            .alpha(0.87)
            .rgb()
            .string();
    const iconColor = disabled
        ? theme['text-disabled-color']
        : color(selectedColor !== undefined ? selectedColor : theme['text-basic-color'])
            .alpha(0.54)
            .rgb()
            .string();
    const selectedBackgroundColor = (color(backgroundColor as string).lighten(mode === 'outlined' ? 0.2 : 0.4))
        .rgb()
        .string();

    const accessibilityState: AccessibilityState = {
        selected,
        disabled,
    };

    return (
        <Surface
            style={
                [
                    styles.container,
                    {
                        elevation: Platform.OS === 'android' ? elevation : 0,
                        backgroundColor: selected
                            ? selectedBackgroundColor
                            : backgroundColor,
                        borderColor,
                        borderRadius,
                    },
                    style,
                ] as StyleProp<ViewStyle>
            }
            {...rest}
        >
            <TouchableWeb
                delayPressIn={0}
                style={{ borderRadius }}
                disabled={disabled}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                testID={testID}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={[styles.content, { paddingRight: onClose ? 32 : 4 }]}>
                    {avatar && !icon ? (
                        <View style={[styles.avatarWrapper, disabled && { opacity: 0.26 }]}>
                            {isValidElement(avatar)
                                ? cloneElement(avatar, {
                                    style: [styles.avatar, avatar.props.style],
                                })
                                : avatar}
                        </View>
                    ) : null}
                    {icon || selected ? (
                        <View
                            style={[
                                styles.icon,
                                avatar ? [styles.avatar, styles.avatarSelected] : null,
                            ]}
                        >
                            {icon ? (
                                <Icon
                                    source={icon}
                                    color={avatar ? theme.white : iconColor}
                                    size={18}
                                />
                            ) : (
                                <Icon
                                    name="check"
                                    color={avatar ? theme.white : iconColor}
                                    size={18}
                                    direction="ltr"
                                />
                            )}
                        </View>
                    ) : null}
                    <Text
                        selectable={false}
                        numberOfLines={1}
                        style={[
                            styles.text,
                            {
                                color: textColor,
                                marginRight: onClose ? 0 : 8,
                                marginLeft: avatar || icon || selected ? 4 : 8,
                            },
                            textStyle,
                        ]}
                        ellipsizeMode={ellipsizeMode}
                    >
                        {children}
                    </Text>
                </View>
            </TouchableWeb>
            {onClose ? (
                <View style={styles.closeButtonStyle}>
                    <TouchableWithoutFeedback
                        accessibilityRole="button"
                        accessibilityLabel={closeIconAccessibilityLabel}
                        onPress={onClose}
                    >
                        <View style={[styles.icon, styles.closeIcon]}>
                            <Icon
                                name="close-circle"
                                size={16}
                                color={iconColor}
                                direction="ltr"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ) : null}
        </Surface>
    );
};
