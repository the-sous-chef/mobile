import React from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { View, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

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

export const ErrorPage = (props: PropTypes): JSX.Element => {
    const { error, ...rest } = props;

    return (
        <>
            {!!error && (
                <Layout style={styles.container} {...rest}>
                    {/* TODO cool image */}
                    <Text category="h4">Whoops! That&apos;s an error</Text>
                    <Text category="s1">{error.message}</Text>
                    {!!error.stack && (
                        <SyntaxHighlighter language="javascript">
                            {error.stack}
                        </SyntaxHighlighter>
                    )}
                </Layout>
            )}
        </>
    );
};
