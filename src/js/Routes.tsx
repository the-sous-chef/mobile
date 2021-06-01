import { NativeRouter, Route, Redirect } from 'react-router-native';

import { ErrorPage } from 'js/pages/ErrorPage';
import { RecipePage } from 'js/pages/RecipePage';
import { RecipeListPage } from 'js/pages/RecipeListPage';
import {
    ERROR_PATH,
    HOME_PATH,
    RECIPE_PATH,
    RECIPES_PATH,
} from 'js/utils/routes';

export const Routes = (): JSX.Element => (
    <NativeRouter>
        <Route path={ERROR_PATH} component={ErrorPage} />
        <Route path={RECIPE_PATH} component={RecipePage} />
        <Route path={RECIPES_PATH} component={RecipeListPage} />
        <Redirect path={HOME_PATH} to={RECIPES_PATH} />
    </NativeRouter>
);
