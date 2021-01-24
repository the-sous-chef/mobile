import React from 'react';
import { View } from 'react-native';

import ZeroState from 'src/js/components/RecipeList/ZeroState';

interface PropTypes extends React.ComponentProps<typeof View> {
    search: App.Recipes.Search;
}

const Result = (props: PropTypes): JSX.Element => {
    const { search, ...rest } = props;

    return (
        <View {...rest}>
            {!search.results.length && (<ZeroState searchTerm={search.term} />)}
        </View>
    );
};

export default Result;
