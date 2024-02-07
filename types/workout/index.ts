import {ExerciseType} from "../exercise";

export type WorkoutType = {
    muscleGroup: string;
    exercises: Array<ExerciseType>;
}