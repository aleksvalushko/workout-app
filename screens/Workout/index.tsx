import {StyleSheet, Text} from 'react-native';

const Workout = () => {

    return (
        <Text style={styles.container}>Workout</Text>
    );
}

export default Workout;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    }
});