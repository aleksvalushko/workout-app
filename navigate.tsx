import React from 'react';
import Main from './screens/Main';
import Workout from './screens/Workout'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import useAuth from "./hooks/useAuth";

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Workout: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigate = () => {
    const {user} = useAuth();
    if (user) {
        return (
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="Main">
                    <RootStack.Screen name='Login' component={Login} options={{
                        title: 'Login', headerStyle: {
                            backgroundColor: '#2b2d30'
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: 'white'
                    }}/>
                    <RootStack.Screen name='Main' component={Main} options={{
                        title: 'Main', headerStyle: {
                            backgroundColor: '#2b2d30'
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: 'white'
                    }}/>
                    <RootStack.Screen name='Workout' component={Workout} options={{
                        title: 'Workout', headerStyle: {
                            backgroundColor: '#2b2d30'
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: 'white'
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
                            backgroundColor: '#2b2d30'
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: 'white'
                    }}/>
                </RootStack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigate;