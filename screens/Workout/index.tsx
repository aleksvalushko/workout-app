import {StyleSheet, Text, View} from 'react-native';

 const Workout = () => {

    return (
        <View style={styles.container}>
                <Text style={{width: '100%'}}>Workout</Text>
        </View>
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