import {Button, StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../navigate";
import {signOut} from "firebase/auth";
import {auth} from "../../App";
import useAuth from "../../hooks/useAuth";

export default function EmptyDate() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {setUser} = useAuth();

    const handleSignOut = async () => {
        await signOut(auth);
        setUser({isAuth: false});
    }

    return (
        <View style={styles.addWorkoutButton}>
            <View style={styles.button}>
                <Button title={'Add workout'} onPress={() => navigation.navigate('Workout')}/>
            </View>
            <View style={styles.button}>
                <Button title={'Sign out'} onPress={handleSignOut}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addWorkoutButton: {
        width: '50%'
    },
    button: {
        marginVertical: 20
    }
});