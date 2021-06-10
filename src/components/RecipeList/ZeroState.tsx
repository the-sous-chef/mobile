import { css } from '@emotion/native';
import { Card, Text } from '@ui-kitten/components';
import { ComponentProps } from 'react';
import { View, ViewProps } from 'react-native';

interface PropTypes extends ComponentProps<typeof Card> {
    searchTerm?: string;
}

const cardCss = css({
    alignItems: 'center',
});

const searchTermCss = css({
    fontStyle: 'italic',
});

const Header = (props?: ViewProps): JSX.Element => (
    <View {...props}>
        <Text category="h5">No Results</Text>
    </View>
);

export const ZeroState = (props: PropTypes): JSX.Element => {
    const { searchTerm, style, ...rest } = props;

    return (
        <Card {...rest} style={[cardCss, style]} header={Header}>
            <Text>No recipes found</Text>
            {!!searchTerm && (
                <>
                    <Text>for</Text>
                    <Text style={searchTermCss}>
                        {searchTerm}
                    </Text>
                </>
            )}
        </Card>
    );
};
