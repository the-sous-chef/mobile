import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';

import RatingAndReviews from 'js/components/RecipeList/RecipePreview/RatingAndReviews';

type RightProps = {
    size: number;
};

interface PropTypes extends React.ComponentProps<typeof View> {
    recipe: App.Recipes.Recipe;
}

const RecipePreview = (props: PropTypes): JSX.Element => {
    const {
        recipe: {
            difficulty,
            images,
            name,
            rating,
        },
        ...rest
    } = props;

    return (
        <Card {...rest}>
            <Card.Cover source={{ uri: images[0].uri }} />
            <Card.Title
                title={name}
                right={(rightProps: RightProps): JSX.Element => (
                    <RatingAndReviews difficulty={difficulty} rating={rating} {...rightProps} />
                )}
            />
        </Card>
    );
};

export default RecipePreview;
