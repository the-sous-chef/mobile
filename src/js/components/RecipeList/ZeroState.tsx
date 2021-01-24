import React from 'react';
import {
    Card,
    Text,
    Title,
    Paragraph,
} from 'react-native-paper';
import { View } from 'react-native';

import makeStyles from 'src/js/lib/makeStyles';

interface PropTypes extends React.ComponentProps<typeof View> {
    searchTerm?: string;
}

const useStyles = makeStyles({
    card: {
        alignItems: 'center',
    },
    searchTerm: {
        fontStyle: 'italic',
    },
});

const ZeroState = (props: PropTypes): JSX.Element => {
    const { searchTerm, style, ...rest } = props;
    const styles = useStyles();

    return (
        <Card {...rest} style={[styles.card, style]}>
            <Card.Content>
                <Title>No Results</Title>
                <Paragraph>
                    <Text>No recipes found</Text>
                    {!!searchTerm && (
                        <>
                            <Text>for</Text>
                            <Text style={styles.searchTerm}>{searchTerm}</Text>
                        </>
                    )}
                </Paragraph>
            </Card.Content>
        </Card>
    );
};

export default ZeroState;
