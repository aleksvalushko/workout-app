import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView} from 'react-native';
import Navigate from "./navigate";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCXY4rgI5oq55Dff5nzQBwEPzbD8AYWbc",
    authDomain: "workout-app-e0c26.firebaseapp.com",
    databaseURL: "https://workout-app-e0c26-default-rtdb.firebaseio.com",
    projectId: "workout-app-e0c26",
    storageBucket: "workout-app-e0c26.appspot.com",
    messagingSenderId: "514017648372",
    appId: "1:514017648372:web:535337740a795f2cee08a1",
    measurementId: "G-GBQJNNT339"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const App = () => {

    const db = getDatabase(app, 'https://workout-app-e0c26-default-rtdb.firebaseio.com');
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log('data: ', data)
    });

    return (
        <SafeAreaView style={styles.container}>
            <Navigate />
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    }
});