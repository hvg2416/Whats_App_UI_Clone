import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableNativeFeedback, ImageBackground, Modal, TouchableOpacity, KeyboardAvoidingView, TextInput, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            done: false,
            toggleModal: false,
            selectedChat: {},
            chat_message_input: '',
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
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f2f2f2', true)} onPress={() => { this.setState({ toggleModal: !this.state.toggleModal }) }}>
                            <View style={styles.chatDetailsScreenBackButton}>
                                <MaterialIcons name="arrow-back" size={30} color="white" />
                                <Image source={{ uri: this.state.selectedChat.chat_thumbnail }} style={styles.chatDetailsScreenBackButtonImage} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.chatDetailsScreenHeader}>
                        <View>
                            <Text style={styles.chatDetailsScreenHeaderTitle}> {this.state.selectedChat.chat_name} </Text>
                            <Text style={styles.chatDetailsScreenHeaderSubTitle}> online </Text>
                        </View>
                        <View style={styles.chatDetailsScreenHeaderIconsView}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f2f2f2', true)}>
                                <View>
                                    <MaterialIcons name="videocam" size={26} color="white" />
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f2f2f2', true)}>
                                <View>
                                    <MaterialIcons name="call" size={24} color="white" />
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f2f2f2', false)}>
                                <View>
                                    <FontAwesome5 name="ellipsis-v" size={16} color="white" />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView behavior="height" style={styles.chatDetailsScreenKeyboardAvoidingView} keyboardVerticalOffset={31}>
                    <ImageBackground source={{ uri: 'https://i.redd.it/qwd83nc4xxf41.jpg' }} style={styles.chatDetailsScreenBackgroundImage}>
                        <View style={styles.chatDetailsScreenMessagesView}>
                            <Text>Messages</Text>
                        </View>
                        <View style={styles.chatDetailsScreenInputView}>
                            <View style={styles.chatDetailsScreenTextInputBoxView}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('', true)}>
                                    <View style={{ borderRadius: 24, height: 30, width: 38, justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialIcons name="insert-emoticon" size={40} color="#c4c4c4" />
                                    </View>
                                </TouchableNativeFeedback>
                                <TextInput style={styles.chatDetailsScreenTextInput} value={this.state.chat_message_input} onChange={(text) => { this.setState({ chat_message_input: text }) }} placeholder="Type a message" />
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('', true)}>
                                    <View style={{ borderRadius: 24, marginRight: 7, height: 30, width: 38, justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="attachment" size={24} color="#c4c4c4" style={{ transform: [{ rotateY: "180deg" }] }} />
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('', true)}>
                                    <View style={{ borderRadius: 24, height: 30, width: 38, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name="md-camera" size={30} color="#c4c4c4" />
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.chatDetailsScreenVoiceRecIconView}>
                                <MaterialIcons name="keyboard-voice" size={28} color="white" />
                            </View>
                        </View>
                    </ImageBackground>
                </KeyboardAvoidingView>
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
        width: "100%",
        backgroundColor: '#efe6dd'
    },
    chatDetailsScreenActionBar: {
        height: 55,
        backgroundColor: '#006156',
        flexDirection: 'row'
    },
    chatDetailsScreenBackButtonView: {
        flex: 1,
        height: 55,
        width: 70,
        borderRadius: 24,
        justifyContent: 'center'
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
    chatDetailsScreenHeader: {
        flex: 4,
        flexDirection: 'row',
        marginLeft: 5,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'space-between',
    },
    chatDetailsScreenHeaderTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    },
    chatDetailsScreenHeaderSubTitle: {
        fontSize: 12,
        color: 'white',
    },
    chatDetailsScreenHeaderIconsView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 124,
        marginRight: 10
    },
    chatDetailsScreenKeyboardAvoidingView: {
        marginBottom: Dimensions.get('screen').height - Dimensions.get('window').height,
    },
    chatDetailsScreenMessagesView: {
        height: "90%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatDetailsScreenInputView: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    chatDetailsScreenTextInputBoxView: {
        width: "85%",
        height: 50,
        backgroundColor: 'white',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    chatDetailsScreenTextInput: {
        marginLeft: 10,
        fontSize: 18,
        marginRight: 40,
    },
    chatDetailsScreenVoiceRecIconView: {
        backgroundColor: '#058679',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        marginLeft: 10
    },
});

export default Chats;