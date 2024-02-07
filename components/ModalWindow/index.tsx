import {
    Modal,
    StyleSheet,
    View,
    Pressable,
    Text,
    TextInput,
    ScrollView
} from 'react-native';
import React, {useState} from "react";
import COLORS from "../../colors";
import {ExerciseType} from "../../types/exercise";
import {APPROACH_COUNT, DESCRIPTION, EXERCISE_TITLE, REPS_COUNT, WEIGHT} from "../../constants";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WorkoutType} from "../../types/workout";

type PropsType = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void
    workout: Array<WorkoutType>;
    setWorkout: (value: Array<WorkoutType>) => void
}

const ModalWindow = ({modalVisible, setModalVisible, workout, setWorkout}: PropsType) => {
    const [muscleGroup, setMuscleGroup] = useState<string>('');
    const [exercise, setExercise] = useState<ExerciseType>({
        id: 0, exerciseTitle: '', description: '', weight: '', approachCount: '', repsCount: '', done: false
    });
    const [exercises, setExercises] = useState<Array<ExerciseType>>([]);
    const [error, setError] = useState<boolean>(false);
    const [isSaveAllDisabled, setIsSaveAllDisabled] = useState<boolean>(true);

    const changeMuscleGroup = (value: string) => {
        setIsSaveAllDisabled(true);
        setMuscleGroup(value);
        if (value) setError(false);

    }

    const changeExercise = (value: string, field: string) => {
        setIsSaveAllDisabled(true);
        setExercise({...exercise, [field]: value, id: exercise.id || Math.floor(Math.random() * 100)});
    }

    const clearExercise = () => {
        setIsSaveAllDisabled(false);
        setExercise({
            id: 0, exerciseTitle: '', description: '', weight: '', approachCount: '', repsCount: '', done: false
        });
    }

    const saveCurrentExercise = () => {
        if (!exercise.exerciseTitle || !exercise.weight.length || !exercise.approachCount || !exercise.repsCount) {
            setError(true);
            return;
        }
        setError(false);
        const currentExerciseIndex = exercises.findIndex(elem => elem.id === exercise.id);
        if (currentExerciseIndex !== -1) {
            const exercisesCopy = [...exercises];
            exercisesCopy.splice(currentExerciseIndex, 1, exercise);
            setExercises([...exercisesCopy]);
        } else {
            setExercises([...exercises, exercise]);
        }
        setExercise({
            id: 0, exerciseTitle: '', description: '', weight: '', approachCount: '', repsCount: '', done: false
        });
        setIsSaveAllDisabled(false);
    }

    const editExercise = (value: ExerciseType) => {
        const currentExercise = exercises.find(elem => elem.id === value.id);
        if (!currentExercise) return;
        setExercise(currentExercise);
    }

    const saveAll = () => {
        if (isSaveAllDisabled || !muscleGroup || error) {
            setError(true);
            return;
        }
        setWorkout([...workout, {muscleGroup: muscleGroup, exercises: exercises}])
        setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.wrapper}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <KeyboardAwareScrollView>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={changeMuscleGroup}
                            value={muscleGroup}
                            placeholder="Группа мышц"
                        />
                        {exercises.map(elem => {
                            return <View style={styles.exercisePreview} key={elem.id}>
                                <View style={styles.exerciseTitleBlock}>
                                    <Text style={styles.exerciseTitle}>{elem.exerciseTitle}</Text>
                                    <Pressable
                                        style={styles.editButton}
                                        onPress={() => editExercise(elem)}>
                                        <Text style={styles.editButtonText}>Редактировать</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.exerciseContent}>
                                    <Text>{elem.weight} кг</Text>
                                    <Text>{elem.approachCount} подх.</Text>
                                    <Text>{elem.repsCount} повт.</Text>
                                </View>
                            </View>
                        })}
                        <ScrollView style={styles.exercisesBlock}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => changeExercise(value, EXERCISE_TITLE)}
                                value={exercise.exerciseTitle}
                                placeholder="Название упражнения"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => changeExercise(value, DESCRIPTION)}
                                value={exercise.description}
                                placeholder="Описание"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => changeExercise(value, WEIGHT)}
                                value={exercise.weight}
                                placeholder="Вес"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => changeExercise(value, APPROACH_COUNT)}
                                value={exercise.approachCount}
                                keyboardType='numeric'
                                placeholder="Количество подходов"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => changeExercise(value, REPS_COUNT)}
                                value={exercise.repsCount}
                                keyboardType='numeric'
                                placeholder="Количество повторений"
                            />
                        </ScrollView>
                        {
                            error ? <Text style={styles.errorStyle}>* все поля обязательные</Text> : ''
                        }
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, isSaveAllDisabled ? styles.disabledButton : null]}
                                disabled={isSaveAllDisabled}
                                onPress={saveAll}>
                                <Text style={[styles.textStyle, isSaveAllDisabled ? styles.disabledTextStyle : null]}>Сохранить все</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={saveCurrentExercise}>
                                <Text style={styles.textStyle}>Сохранить упражнение</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Закрыть</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={clearExercise}>
                                <Text style={styles.textStyle}>Отменить</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        </View>
    );
}

export default ModalWindow;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: COLORS.white,
        marginVertical: 10
    },
    modalView: {
        margin: 20,
        marginTop: 100,
        backgroundColor: COLORS.graphiteGray,
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    exercisePreview: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'space-between',
        borderLeftWidth: 2,
        borderLeftColor: COLORS.lightBlue,
        paddingLeft: 5,
        marginBottom: 10
    },
    exerciseTitleBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    exerciseTitle: {
        maxWidth: 220
    },
    editButton: {
        height: 20
    },
    editButtonText: {
        fontSize: 10,
        fontWeight: 'normal',
        color: COLORS.lightBlue
    },
    exerciseContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exercisesBlock: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 20
    },
    weightBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weightInput: {
        marginRight: 5
    },
    errorStyle: {
        width: '100%',
        color: COLORS.red,
        alignItems: 'center',
        marginBottom: 20
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: COLORS.blue,
        marginVertical: 5
    },
    disabledButton: {
        color: COLORS.lightGray,
        backgroundColor: COLORS.gray
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    disabledTextStyle: {
        color: COLORS.gray
    }
});