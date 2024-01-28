import {StyleSheet, View} from 'react-native';
import {useState} from "react";
import {Calendar} from "react-native-calendars";
import {CalendarDateType} from "../../types/date";
import CurrentDate from "../../components/CurrentDate";
import EmptyDate from "../../components/EmptyDate";

const Main = () => {

    const [selectedDate, setSelectedDate] = useState<CalendarDateType>({});
    const [workout, setWorkout] = useState<string>('');

    const onDateChange = (date: CalendarDateType) => {
        setSelectedDate(date);
    }

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.calendar}>
                <Calendar
                    theme={{
                        calendarBackground: '#2b2d30',
                        dayTextColor: 'rgba(246,247,253,0.4)',
                        monthTextColor: 'white'
                    }}
                    onDayPress={onDateChange}
                    firstDay={1}
                    markedDates={{
                        [selectedDate.dateString ?? '']: {
                            selected: true,
                            selectedColor: 'rgb(33, 150, 243)',
                            marked: !!workout
                        }
                    }}
                />
            </View>
            <View style={styles.content}>
                {
                    !!workout ? <CurrentDate props={selectedDate}/> : <EmptyDate />
                }
            </View>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    calendarContainer: {
        width: '100%',
        backgroundColor: '#2b2d30',
        flex: 1
    },
    calendar: {
        width: '100%',
        height: 350
    },
    content: {
        width: '100%',
        alignItems: 'center'
    }
});