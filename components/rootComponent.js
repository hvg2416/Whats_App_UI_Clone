import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './mainComponent';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();

class Root extends Component{

    render(){
        const screenOptions = {
            headerStyle: {
                backgroundColor: '#006156',
            },
            headerTitleStyle: {
                color: 'white'
            },
            headerRight: () => {
                return (
                    <View style={styles.headerRightIconsView}>
                        <EvilIcons name="search" size={27} color="white" />
                        <FontAwesome5 name="ellipsis-v" size={18} color="white" />
                    </View>
                );
            },
        };
        return(
            <Stack.Navigator screenOptions={screenOptions} >
                <Stack.Screen name="WhatsApp" component={Main} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    headerRightIconsView: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
        marginRight: 16
    },
});

export default Root;