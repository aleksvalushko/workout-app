import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {useState} from "react";
import {CalendarDateType} from "../../types/date";
type IProps = {
    props: CalendarDateType
}

export default function CurrentDate({props}: IProps) {

    const [selectedDate, setSelectedDate] = useState<CalendarDateType>(props);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.workout}>
                <Text>{props.dateString}</Text>
            </View>
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
        backgroundColor: '#fafafa',
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(0, 187, 242)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});