import { css } from '@emotion/native';
import { Button, Card, Input } from '@ui-kitten/components';
import { useState, ComponentProps } from 'react';
import { View } from 'react-native';

import { spacing } from 'src/js/utils/spacing';

interface PropTypes extends ComponentProps<typeof View> {
    onResults: (search: App.Recipes.Search) => void;
}

const formCss = css({
    display: 'flex',
});

const searchInputCss = css({
    paddingBottom: spacing(2),
});

export const Search = (props: PropTypes): JSX.Element => {
    const { onResults, ...rest } = props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleOnPress = (): void => {
        onResults({
            term: searchTerm,
            results: [],
        });
    };

    const handleChangeText = (value: string): void => {
        setSearchTerm(value);
    };

    return (
        <Card {...rest}>
            <View style={formCss}>
                <Input
                    label="Search recipes"
                    placeholder="Begin typing to search for recipes"
                    style={searchInputCss}
                    value={searchTerm}
                    onChangeText={handleChangeText}
                />
                <Button
                    accessibilityLabel="Search Recipes"
                    // icon="magnify"
                    // mode="contained"
                    onPress={handleOnPress}
                >
                    Search
                </Button>
            </View>
        </Card>
    );
};
