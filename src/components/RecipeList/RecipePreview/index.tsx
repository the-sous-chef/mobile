import React, { ComponentProps } from 'react';
import { Image } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

import { RatingAndReviews } from 'src/components/RecipeList/RecipePreview/RatingAndReviews';
import styled from '@emotion/native';
import { spacing } from 'src/utils/spacing';

interface PropTypes extends Omit<ComponentProps<typeof Card>, 'header'> {
    recipe: App.Recipes.Recipe;
}

const StyledView = styled.View`
    display: flex;
    justify-content: space-between;
    align-contents: center;
    margin: ${spacing(1)} ${spacing(1)} 0 ${spacing(1)}
`;

export const RecipePreview = (props: PropTypes): JSX.Element => {
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
        <Card
            {...rest}
            header={(headerProps): JSX.Element => (
                <StyledView {...headerProps}>
                    <Text category="label">{name}</Text>
                    <RatingAndReviews difficulty={difficulty} rating={rating} />
                </StyledView>
            )}
        >
            <Image source={{ uri: images[0].uri }} />
        </Card>
    );
};
