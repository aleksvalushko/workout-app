import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {CalendarDateType} from "../../types/date";
import COLORS from "../../colors";

type IProps = {
    props: CalendarDateType
}

export default function CurrentDate({props}: IProps) {

    // const [selectedDate, setSelectedDate] = useState<CalendarDateType>(props);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.workout}>{props.dateString}</Text>
            <StatusBar style="auto"/>
        </SafeAreaView>
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
        borderLeftWidth: 3,
        borderLeftColor: COLORS.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    }
});