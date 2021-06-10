import { NativeRouter, Route, Redirect } from 'react-router-native';

import { ErrorPage } from 'src/pages/ErrorPage';
import { RecipePage } from 'src/pages/RecipePage';
import { RecipeListPage } from 'src/pages/RecipeListPage';
import {
    ERROR_PATH,
    HOME_PATH,
    RECIPE_PATH,
    RECIPES_PATH,
} from 'src/utils/routes';

export const Routes = (): JSX.Element => (
    <NativeRouter>
        <Route path={ERROR_PATH} component={ErrorPage} />
        <Route path={RECIPE_PATH} component={RecipePage} />
        <Route path={RECIPES_PATH} component={RecipeListPage} />
        <Redirect path={HOME_PATH} to={RECIPES_PATH} />
    </NativeRouter>
);
