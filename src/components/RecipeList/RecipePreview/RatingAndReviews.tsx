import React, { ComponentProps } from 'react';
import { Rating } from 'react-native-ratings';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import styled from '@emotion/native';
import { spacing } from 'src/utils/spacing';

interface PropTypes extends ComponentProps<typeof View> {
    difficulty: Difficulty;
    rating?: number;
    ratingProps?: Omit<ComponentProps<typeof Rating>, 'ratingCount'>;
}

const StyledView = styled.View`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: ${spacing(1)},
`;

export const RatingAndReviews = (props: PropTypes): JSX.Element => {
    const {
        difficulty,
        rating,
        ratingProps = {},
        ...rest
    } = props;

    return (
        <StyledView {...rest}>
            <Text category="c2">{difficulty}</Text>
            {rating && (
                <Rating
                    readonly
                    showRating
                    type="heart"
                    ratingCount={rating}
                    {...ratingProps}
                />
            )}
        </StyledView>
    );
};
