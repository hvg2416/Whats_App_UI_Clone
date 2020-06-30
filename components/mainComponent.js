import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './chatsComponent';
import Status from './statusComponent';
import Calls from './callsComponent';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

class Main extends Component{

    render(){
        const tabBarOptions = {
            activeTintColor: 'white',
            inactiveTintColor: '#5e9481',
            indicatorStyle: {
                backgroundColor:'white',
                shadowColor:'black',
                shadowOffset:{width: 0,height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 5,
            },
            style: {
                backgroundColor: '#006156',
                alignContent: 'center',
                justifyContent: 'center',
            },
            labelStyle: {
                fontWeight: 'bold'
            },
            showIcon: true
        };
        
        return(
            <Tab.Navigator tabBarOptions={tabBarOptions} initialRouteName="ChatsScreen" >
                <Tab.Screen name="Camera" component={Status} options={{title: '',tabBarIcon: () => {return <FontAwesome style={{position: 'relative', top: 20, right: 10}} name="camera" size={22} color="#5e9481" />}}} />
                <Tab.Screen name="ChatsScreen" component={Chats} options={{title: "CHATS"}} />
                <Tab.Screen name="StatusScreen" component={Status} options={{title: "STATUS"}} />
                <Tab.Screen name="CallsScreen" component={Calls} options={{title: "CALLS"}} />
            </Tab.Navigator>
        );
    }
}

export default Main;