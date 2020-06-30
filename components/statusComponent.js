import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

class Status extends Component {

    render() {

        return (
            <View style={styles.statusContainerView}>
                <TouchableNativeFeedback>
                    <View style={styles.statusScreenHeaderSection}>
                        <View style={styles.statusScreenMyStatusSection}>
                            <View style={styles.statusScreenAddStatusButtonSection}>
                                <View style={styles.statusScreenAddStatusButtonView}>
                                    <Ionicons name="ios-add-circle-outline" size={30} color="white" />
                                </View>
                            </View>
                            <View style={styles.statusScreenAddStatusHeaderText}>
                                <Text style={{ fontWeight: "700", fontSize: 18 }} >My status</Text>
                                <Text style={{ color: '#a3a1a4', fontSize: 14 }}>tap to add status update</Text>
                            </View>
                        </View>
                        <View style={styles.statusScreenRecentUpdatesHeaderText}>
                            <Text style={{ fontWeight: 'bold', color: '#008e90', fontSize: 16 }}>Recent updates</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.statusScreenMainSection}>

                </View>
                <View style={styles.statusScreenFABsContainer}>
                    <TouchableOpacity style={styles.statusScreenFAB1}>
                        <MaterialIcons name="edit" size={24} color="#4f7477" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statusScreenFAB2}>
                        <MaterialIcons name="camera-alt" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusContainerView: {
        flex: 1,
    },
    statusScreenHeaderSection: {
        flex: 1.3,
    },
    statusScreenMainSection: {
        flex: 6,
    },
    statusScreenMyStatusSection: {
        flex: 3,
        flexDirection: 'row',
    },
    statusScreenRecentUpdatesHeaderText: {
        flex: 1,
        backgroundColor: '#ced7dd',
        justifyContent: 'center',
        paddingLeft: 18,
    },
    statusScreenAddStatusButtonSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusScreenAddStatusButtonView: {
        backgroundColor: '#02c953',
        width: 65,
        height: 65,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusScreenAddStatusHeaderText: {
        flex: 3,
        justifyContent: 'center'
    },
    statusScreenFABsContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center'
    },
    statusScreenFAB1: {
        height: 40,
        width: 40,
        backgroundColor: '#b9cccd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    statusScreenFAB2: {
        height: 60,
        width: 60,
        backgroundColor: '#02c953',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20
    },
});

export default Status;