import React from 'react';
import Main from './pages/Main';
import Workout from './pages/Workout'
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

const Navigate = () => {
return <NavigationContainer></NavigationContainer>
}

export default Navigate;