import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface PropTypes extends React.ComponentProps<typeof View> {
    error?: Error | null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const ErrorPage = (props: PropTypes): JSX.Element => {
    const { error, ...rest } = props;

    return (
        <>
            {!!error && (
                <View style={styles.container} {...rest}>
                    <Text>{error.message}</Text>
                    {!!error.stack && (<Text>{error.stack}</Text>)}
                </View>
            )}
        </>
    );
};

export default ErrorPage;
