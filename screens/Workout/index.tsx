import {Pressable, StyleSheet, Text, View} from 'react-native';
import COLORS from "../../colors";
import {useState} from "react";
import ModalWindow from "../../components/ModalWindow";
import {WorkoutType} from "../../types/workout";
import CheckBox from 'react-native-check-box';

const Workout = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [workout, setWorkout] = useState<Array<WorkoutType>>([
        {
            "muscleGroup": "Ноги",
            "exercises": [
                {
                    "id": 98,
                    "exerciseTitle": "Сгибание ног",
                    "description": "оравыправпвпрв",
                    "weight": "55",
                    "approachCount": "4",
                    "repsCount": "12",
                    "done": false
                }
            ]
        }
    ]);
    const [isToggle, setIsToggle] = useState(false);

    const editWorkout = () => {
        console.log('edited: ', workout);
    }

    const saveWorkout = () => {
        console.log('saved');
    }

    return (
        <View style={styles.container}>
            <View style={styles.editSaveButtons}>
                <Pressable
                    style={styles.button}
                    onPress={editWorkout}>
                    <Text style={styles.textStyle}>Редактировать</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={saveWorkout}>
                    <Text style={styles.textStyle}>Сохранить</Text>
                </Pressable>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Добавить группу мышц и упражнения</Text>
            </Pressable>
            {workout.map((elem, index) => {
                return <View style={styles.muscleGroupBlock} key={`${elem.muscleGroup}_${index}`}>
                    <Text style={styles.muscleGroup}>{elem.muscleGroup}</Text>
                    {elem.exercises.map(exercise => {
                        return <View key={exercise.id} style={styles.exerciseBlock}>
                            <View>
                                <Text style={styles.exerciseTitle}>{exercise.exerciseTitle}</Text>
                                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                            </View>
                            <View style={styles.exerciseTable}>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableHeaderText}>#</Text>
                                    <Text style={styles.tableHeaderText}>Повт</Text>
                                    <Text style={styles.tableHeaderText}>КГ</Text>
                                    <Text style={styles.tableHeaderText}></Text>
                                </View>
                                {
                                    Array.from({length: +exercise.approachCount}, (v, k) => k + 1).map(item => {
                                        return <View  style={styles.approach}>
                                            {item}
                                            <CheckBox
                                                onClick={() => {
                                                    setIsToggle(!isToggle);
                                                    console.log('checkbox');
                                                }}
                                                isChecked={exercise.done}
                                                checkBoxColor={COLORS.lightBlue}
                                            />
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    })}
                </View>
            })}
            <ModalWindow modalVisible={modalVisible} setModalVisible={setModalVisible} workout={workout}
                         setWorkout={setWorkout}/>
        </View>
    );
}

export default Workout;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.darkGray,
        color: COLORS.white,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    editSaveButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: COLORS.blue
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    muscleGroupBlock: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.graphiteGray,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 20
    },
    muscleGroup: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    exerciseBlock: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    exerciseTitle: {
        color: COLORS.white,
        fontWeight: 'bold'
    },
    exerciseDescription: {
        color: COLORS.lightGray
    },
    exerciseTable: {
        width: '100%',
        marginVertical: 10
    },
    tableHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableHeaderText: {
        color: COLORS.gray
    },
    approach: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    }
});