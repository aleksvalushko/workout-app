import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import React, {useState} from "react";
import {UserType} from "../../types/login";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../App";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../navigate";
import Icon from "react-native-vector-icons/FontAwesome";

const Login = () => {

    const [loginData, setLoginData] = useState<UserType>({});
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const login = async () => {
        if (loginData.email && loginData.password) {
            const response = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            if (!response.user) return;
            navigation.navigate('Main');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBlock}>
                <Text style={styles.label}>E-mail: </Text>
                <TextInput
                    style={styles.input}
                    inputMode='email'
                    onChangeText={email => setLoginData({
                        ...loginData,
                        email
                    })}
                    defaultValue={loginData.email ?? ''}
                />
            </View>
            <View style={styles.inputBlock}>
                <Text style={styles.label}>Password: </Text>
                <View style={styles.passwordBlock}>
                    <Icon style={styles.showPassword} name={isShowPassword ? 'eye' : 'eye-slash'} size={20}
                          onPress={() => setIsShowPassword(!isShowPassword)} color='white'/>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        secureTextEntry={!isShowPassword}
                        onChangeText={password => setLoginData({
                            ...loginData,
                            password
                        })}
                        defaultValue={loginData.password ?? ''}
                    />
                </View>
            </View>
            <Button title={'Login'} onPress={login}/>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2d30'
    },
    inputBlock: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    label: {
        marginRight: 30,
        width: 70,
        color: 'white'
    },
    input: {
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderStyle: 'solid',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white'
    },
    passwordBlock: {
        width: '60%'
    },
    passwordInput: {
        width: '100%'
    },
    showPassword: {
        position: 'absolute',
        right: 10,
        top: 8
    }
});