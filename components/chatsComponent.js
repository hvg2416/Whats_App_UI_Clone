import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableNativeFeedback, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createStackNavigator();

class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            done: false,
            toggleModal: false,
            selectedChat: {},
        };
        this.ChatList = this.ChatList.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    ChatList(data) {

        return (
            <FlatList
                data={data}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item) => {
                    let key = new Number(item.chat_id);
                    return key.toString();
                }}
                ItemSeparatorComponent={() => <View style={styles.ItemSeparatorComponent}></View>}
            />
        );
    }

    renderItem(item) {
        return (
            <TouchableNativeFeedback onPress={() => { this.setState({ toggleModal: !this.state.toggleModal, selectedChat: item }) }} >
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

    renderModal() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.toggleModal}
                onRequestClose={() => { this.setState({ toggleModal: !this.state.toggleModal }) }}
            >
                <View style={styles.chatDetailsScreenActionBar}>
                    <View style={styles.chatDetailsScreenBackButtonView}>
                        <TouchableNativeFeedback>
                            <View style={styles.chatDetailsScreenBackButton}>
                                <MaterialIcons name="arrow-back" size={30} color="white" />
                                <Image source={{ uri: this.state.selectedChat.chat_thumbnail }} style={styles.chatDetailsScreenBackButtonImage} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ImageBackground source={{ uri: 'https://i.redd.it/qwd83nc4xxf41.jpg' }} style={styles.chatDetailsScreenBackgroundImage} >

                </ImageBackground>
            </Modal>
        );
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
                <>
                    {this.ChatList(this.state.data)}
                    {this.renderModal()}
                </>
            );
        }
        else {
            return (
                <Text> Loading...</Text>
            )
        }
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
    chatDetailsScreenActionBar: {
        height: 70,
        backgroundColor: '#006156',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    chatDetailsScreenBackButtonView: {
        height: 55,
        width: 70,
        borderRadius: 24
    },
    chatDetailsScreenBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: "100%"
    },
    chatDetailsScreenBackButtonImage: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
});

export default Chats;