import {
    ColorValue,
    ImageStyle,
    StyleSheet,
    TextProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MaterialUIIconProps = Omit<TextProps, 'style'> & { name: string, style: ImageStyle & { tintColor?: ColorValue } };

type IconProviderValue = {
    toReactElement: (props: MaterialUIIconProps) => JSX.Element;
};

function MaterialUIIcon(props: MaterialUIIconProps): JSX.Element {
    const { name, style } = props;
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);

    // @ts-ignore
    return (<Icon name={name} size={height} color={tintColor} style={iconStyle} />);
}

const IconProvider = (name: string): IconProviderValue => ({
    toReactElement: (props: MaterialUIIconProps): JSX.Element => MaterialUIIcon({ ...props, name }),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createIconsMap() {
    return new Proxy({}, {
        get(_, name: string): IconProviderValue {
            return IconProvider(name);
        },
    });
}

export const MaterialUIIconsPack = {
    name: 'materialUI',
    icons: createIconsMap(),
};
