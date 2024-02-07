import React from 'react';
import Main from './screens/Main';
import Workout from './screens/Workout'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import useAuth from "./hooks/useAuth";
import COLORS from "./colors";

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Workout: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigate = () => {
    const {user} = useAuth();
    if (user?.isAuth) {
        return (
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="Workout">
                    <RootStack.Screen name='Workout' component={Workout} options={{
                        title: 'Упражнения', headerStyle: {
                            backgroundColor: COLORS.darkGray
                        },
                        headerTitleStyle: {
                            color: COLORS.white
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: COLORS.white
                    }}/>
                    <RootStack.Screen name='Main' component={Main} options={{
                        title: 'Главная', headerStyle: {
                            backgroundColor: COLORS.darkGray
                        },
                        headerTitleStyle: {
                            color: COLORS.white
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: COLORS.white
                    }}/>
                </RootStack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="Login">
                    <RootStack.Screen name='Login' component={Login} options={{
                        title: 'Войти', headerStyle: {
                            backgroundColor: COLORS.darkGray
                        },
                        headerTitleStyle: {
                            color: COLORS.white
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: COLORS.white
                    }}/>
                </RootStack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigate;