import React from 'react';
import { NativeRouter, Route, Redirect } from 'react-router-native';

import ErrorPage from 'src/js/pages/ErrorPage';
import RecipePage from 'src/js/pages/RecipePage';
import RecipeListPage from 'src/js/pages/RecipeListPage';
import {
    ERROR_PATH,
    HOME_PATH,
    RECIPE_PATH,
    RECIPES_PATH,
} from 'src/js/utils/routes';

const Routes = (): JSX.Element => (
    <NativeRouter>
        <Route path={ERROR_PATH} component={ErrorPage} />
        <Route path={RECIPE_PATH} component={RecipePage} />
        <Route path={RECIPES_PATH} component={RecipeListPage} />
        <Redirect path={HOME_PATH} to={RECIPES_PATH} />
    </NativeRouter>
);

export default Routes;
