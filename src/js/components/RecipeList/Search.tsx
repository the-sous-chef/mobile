import { css } from '@emotion/native';
import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { View } from 'react-native';

import { spacing } from 'src/js/utils/spacing';

interface PropTypes extends React.ComponentProps<typeof View> {
    onResults: (search: App.Recipes.Search) => void;
}

const formCss = css({
    display: 'flex',
});

const searchInputCss = css({
    paddingBottom: spacing(2),
});

const Search = (props: PropTypes): JSX.Element => {
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
            <Card.Content style={formCss}>
                <TextInput
                    label="Search recipes"
                    mode="outlined"
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
            </Card.Content>
        </Card>
    );
};

export default Search;
