import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class Calls extends Component {

    render() {
        return (
            <View style={styles.callsContainerView}>
                <Text style={styles.callsScreenInfoText}>
                    <Text>To start calling contacts who have WhatsApp, tap </Text>
                    <MaterialIcons name="call" size={24} color="grey" />
                    <Text> at the bottom of your screen.</Text>
                </Text>
                <TouchableOpacity style={styles.callsScreenFAB}>
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    callsContainerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    callsScreenInfoText: {
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
    },
    callsScreenFAB: {
        height: 60,
        width: 60,
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#02c953',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
});

export default Calls;