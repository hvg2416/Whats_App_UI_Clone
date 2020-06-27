import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './mainComponent';
import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const Stack = createStackNavigator();

class Root extends Component{

    render(){
        const screenOptions = {
            headerStyle: {
                backgroundColor: '#006156',
            },
            headerTitleStyle: {
                color: 'white'
            }
        };
        return(
            <Stack.Navigator screenOptions={screenOptions} >
                <Stack.Screen name="WhatsApp" component={Main} />
            </Stack.Navigator>
        );
    }
}

export default Root;