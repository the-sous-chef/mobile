import React from 'react';
import { Rating } from 'react-native-ratings';
import { View } from 'react-native';

interface PropTypes extends React.ComponentProps<typeof View> {
    difficulty: Difficulty;
    rating?: number;
    size: number;
}

const Reviews = (props: PropTypes): JSX.Element => {
    const { rating, ...rest } = props;

    return (
        <View {...rest}>
            {rating && (
                <Rating
                    readonly
                    showRating
                    type="heart"
                    ratingCount={3}
                    imageSize={20}
                />
            )}
        </View>
    );
};

export default Reviews;
