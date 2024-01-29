import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import React, {useState} from "react";
import {LoginDataType} from "../../types/login";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../colors";

const Login = () => {

    const [loginData, setLoginData] = useState<LoginDataType>({});
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');

    // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const login = async () => {
        if (loginData.email && loginData.password) {
            try {
                const response = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
                if (!response.user) return;
                setLoginError('');
            } catch (error: any) {
                setLoginError(error.code.split('/')[1]);
                console.log("error: ", error.code)
            }

        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.inputsBlock}>
                <View style={styles.logoImageWrapper}>
                    <Image
                        style={styles.logoImage}
                        source={require('../../assets/bull.png')}
                    />
                </View>
                <View style={styles.inputBlock}>
                    <Text style={styles.label}>E-mail: </Text>
                    <TextInput
                        style={styles.input}
                        autoFocus={false}
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
                    <View>
                        <Icon style={styles.showPassword} name={isShowPassword ? 'eye' : 'eye-slash'} size={20}
                              onPress={() => setIsShowPassword(!isShowPassword)} color={COLORS.white}/>
                        <TextInput
                            style={styles.input}
                            autoFocus={false}
                            secureTextEntry={!isShowPassword}
                            onChangeText={password => setLoginData({
                                ...loginData,
                                password
                            })}
                            defaultValue={loginData.password ?? ''}
                        />
                    </View>
                </View>
                {
                    loginError ? <Text style={styles.validationError}>Error: {loginError}</Text> : ''
                }
                <View style={styles.loginButton}>
                    <Button title={'Login'} onPress={login} color='black'/>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.darkGray
    },
    logoImageWrapper: {
      width: '100%',
        alignItems: 'center'
    },
    logoImage: {
        width: 225,
        height: 200,
        marginVertical: 50
    },
    inputsBlock: {
        width: '100%',
        paddingHorizontal: '10%'
    },
    inputBlock: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 10
    },
    label: {
        marginRight: 30,
        width: 70,
        color: COLORS.white
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderStyle: 'solid',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: COLORS.white
    },
    showPassword: {
        position: 'absolute',
        right: 10,
        top: 8,
        zIndex: 1
    },
    validationError: {
        width: '100%',
        color: COLORS.red,
        alignItems: 'flex-start'
    },
    loginButton: {
        width: '100%',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.blue
    }
});