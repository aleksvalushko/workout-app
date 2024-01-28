import {StyleSheet, Button, View} from 'react-native';
import {useState} from "react";
type AddWorkoutType = {
    addWorkout: () => void
}

export default function EmptyDate({addWorkout}: AddWorkoutType) {

    const [selectedDate, setSelectedDate] = useState();

    return (
        <View style={styles.container}>
                <Button title={'Add workout'} onPress={addWorkout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    workout: {
        width: '100%',
        height: 150,
        backgroundColor: '#fafafa',
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(0, 187, 242)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});