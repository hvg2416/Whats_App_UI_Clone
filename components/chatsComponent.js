import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableNativeFeedback, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function renderItem(item, navigation) {
    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate('ChatDetails')} >
            <View style={styles.chatListItem}>
                <View style={styles.chatListItem_ImageView}>
                    <Image source={{ uri: item.chat_thumbnail }} style={styles.chatListItem_Image} />
                </View>
                <View style={styles.chatListItem_MessageView}>
                    <View style={styles.chatListItem_MessageView_ChatName_LastMessageTime}>
                        <Text style={styles.chatListItem_MessageView_ChatName_Text}> {item.chat_name} </Text>
                        <Text style={styles.chatListItem_MessageView_LastMessageTime_Text}> {item.chat_recentChats[0].timestamp} </Text>
                    </View>
                    <View style={styles.chatListItem_MessageView_LastMessage_MessagesBadge}>
                        <Text style={styles.chatListItem_MessageView_LastMessage_Text}> {item.chat_recentChats[0].message} </Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

function ChatList(props) {

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => renderItem(item, props.navigation)}
            keyExtractor={(item) => {
                let key = new Number(item.chat_id);
                return key.toString();
            }}
            ItemSeparatorComponent={() => <View style={styles.ItemSeparatorComponent}></View>}
        />
    );
}

class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            done: false
        };
    }

    componentDidMount() {

        return fetch('http://www.json-generator.com/api/json/get/cfgbQNFFHC?indent=0')
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    data: data,
                    done: true
                });
            })
            .catch(err => {
                alert(err);
            })
    }

    render() {

        if (this.state.done) {
            return (
                <ChatList data={this.state.data} navigation={this.props.navigation} />
            );
        }
        else {
            return (
                <Text> Loading...</Text>
            )
        }
    }
}

function ChatDetails() {

    return(
        <ImageBackground source={{uri: 'https://i.redd.it/qwd83nc4xxf41.jpg'}} style={styles.chatDetailsScreenBackgroundImage} >
        </ImageBackground>
    );
}

class RootChatList extends Component {

    render() {

        return(
            <Stack.Navigator>
                <Stack.Screen name='ChatList' component={Chats} />
                <Stack.Screen name='ChatDetails' component={ChatDetails} />
            </Stack.Navigator>
        );
    }
} 

const styles = StyleSheet.create({
    chatListItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        height: 80
    },
    chatListItem_ImageView: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatListItem_Image: {
        width: 54,
        height: 54,
        borderRadius: 100,
    },
    chatListItem_MessageView: {
        flex: 3,
        paddingRight: 10,
        justifyContent: 'center'
    },
    chatListItem_MessageView_ChatName_LastMessageTime: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatListItem_MessageView_ChatName_Text: {
        fontWeight: "bold",
        fontSize: 18
    },
    chatListItem_MessageView_LastMessage_Text: {
        fontSize: 16
    },
    chatListItem_MessageView_LastMessageTime_Text: {
        fontSize: 11
    },
    chatListItem_MessageView_LastMessage_MessagesBadge: {
        marginTop: 5
    },
    ItemSeparatorComponent: {
        height: 1,
        backgroundColor: '#dedfdc',
        marginLeft: "22%",
        marginRight: 10
    },
    chatDetailsScreenBackgroundImage: {
        height: "100%",
        width: "100%"
    },
});

export default RootChatList;