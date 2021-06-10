import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { css } from '@emotion/native';

const container = css`
    flex: 1;
    alignItems: center;
    justifyContent: center;
`;

export const RecipePage = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

    return (
        <View style={container}>
            <Text>{`Recipe ${id} here`}</Text>
        </View>
    );
};
