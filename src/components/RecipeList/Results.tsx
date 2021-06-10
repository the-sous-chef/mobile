import { View } from 'react-native';

import { ZeroState } from 'src/components/RecipeList/ZeroState';

interface PropTypes extends React.ComponentProps<typeof View> {
    search: App.Recipes.Search;
}

export const Result = (props: PropTypes): JSX.Element => {
    const { search, ...rest } = props;

    return (
        <View {...rest}>
            {!search.results.length && (<ZeroState searchTerm={search.term} />)}
        </View>
    );
};
