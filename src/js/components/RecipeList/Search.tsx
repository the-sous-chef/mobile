import React, { useState } from 'react';
import { View } from 'react-native';

interface PropTypes extends React.ComponentProps<typeof View> {
    onResults: (search: App.Recipes.Search) => void;
}

const useStyles = makeStyles((theme: UI.Theme) => ({
    form: {
        display: 'flex',
    },
    searchInput: {
        paddingBottom: theme.spacing.units(2),
    },
}));

const Search = (props: PropTypes): JSX.Element => {
    const { onResults, ...rest } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const styles = useStyles();

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
            <Card.Content style={styles.form}>
                <TextInput
                    label="Search recipes"
                    mode="outlined"
                    placeholder="Begin typing to search for recipes"
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={handleChangeText}
                />
                <Button
                    accessibilityLabel="Search Recipes"
                    icon="magnify"
                    mode="contained"
                    onPress={handleOnPress}
                >
                    Search
                </Button>
            </Card.Content>
        </Card>
    );
};

export default Search;
