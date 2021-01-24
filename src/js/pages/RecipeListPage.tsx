import React, { useState } from 'react';
import { View } from 'react-native';

import makeStyles from 'src/js/lib/makeStyles';
import Search from 'src/js/components/RecipeList/Search';
import Result from 'src/js/components/RecipeList/Results';

const INITIAL_STATE: App.Recipes.Search = {
    term: '',
    results: [],
};

const useStyles = makeStyles((theme: Styles.Theme) => ({
    container: {
        // marginTop: units(8),
        // marginHorizontal: units(2),
        backgroundColor: theme.colors.primary,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        flexGrow: 1,
        marginBottom: theme.spacing.units(4),
    },
}));

const RecipeListPage = (): JSX.Element => {
    const [search, setSearch] = useState<App.Recipes.Search>(INITIAL_STATE);
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Search style={styles.search} onResults={setSearch} />
            <Result search={search} />
        </View>
    );
};

export default RecipeListPage;
