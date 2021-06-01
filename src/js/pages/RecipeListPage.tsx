import { ComponentProps, useState } from 'react';
import { Layout, StyleType, useTheme } from '@ui-kitten/components';
import { css } from '@emotion/native';

import { Search } from 'js/components/RecipeList/Search';
import { Result } from 'js/components/RecipeList/Results';
import { spacing } from 'js/utils/spacing';

const INITIAL_STATE: App.Recipes.Search = {
    term: '',
    results: [],
};

const containerCss = (theme: App.Theme): StyleType => css({
    backgroundColor: theme['color-primary-500'],
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
});

const searchCss = css({
    flexGrow: 1,
    marginBottom: spacing(4),
});

export const RecipeListPage = (props: ComponentProps<typeof Layout>): JSX.Element => {
    const [search, setSearch] = useState<App.Recipes.Search>(INITIAL_STATE);
    const theme = useTheme();

    return (
        <Layout style={containerCss(theme)} {...props}>
            <Search style={searchCss} onResults={setSearch} />
            <Result search={search} />
        </Layout>
    );
};
