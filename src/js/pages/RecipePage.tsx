import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';

const useStyles = makeStyles({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const RecipePage = (): JSX.Element => {
    const { id } = useParams();
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text>{`Recipe ${id} here`}</Text>
        </View>
    );
};

export default RecipePage;
