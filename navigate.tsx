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
                <RootStack.Navigator initialRouteName="Main">
                    <RootStack.Screen name='Main' component={Main} options={{
                        title: 'Main', headerStyle: {
                            backgroundColor: COLORS.darkGray
                        },
                        headerTitleStyle: {
                            color: COLORS.white
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: COLORS.white
                    }}/>
                    <RootStack.Screen name='Workout' component={Workout} options={{
                        title: 'Workout', headerStyle: {
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
                        title: 'Login', headerStyle: {
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