import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

type RightProps = {
    size: number;
};

interface PropTypes extends React.ComponentProps<typeof View> {
    cookTimeInMs: number;
    name: string;
    rating?: number;
}

const Title = (props: PropTypes): JSX.Element => {
    const {
        cookTimeInMs,
        name,
        rating,
    } = props;

    return (
        <Card.Title
            title={name}
            right={(rightProps: RightProps): JSX.Element => (
                rating && (
                    <Rating
                        readonly
                        showRating
                        type="heart"
                        ratingCount={3}
                        imageSize={20}
                    />
                )
            )}
        />
    );
};

export default Title;
