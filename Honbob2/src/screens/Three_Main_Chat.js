import React, { Component } from 'react';
import { SectionList,FlatList, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
`;

// console.log("===");

// var ref_board = [];
// database().ref('board_pri/board/').on('value', (snapshot) => {
//     ref_board = snapshot.val();
// });
// var ref_chatprivate = []
// database().ref('board_pri/chat_private/').on('value', (snapshot) => {
//     console.log("ref_chatprivate");
//     ref_chatprivate = snapshot.val();
// });
// var ref_chat = []
// database().ref('user_pri/chat/').on('value', (snapshot) => {
//     console.log("ref_chat");
//     ref_chat = snapshot.val();
// });
// var ref_message = [];
// database().ref('user_pri/message/').on('value', (snapshot) => {
//     ref_message = snapshot.val();
// });

// function updateMessage(navigation, boardId, userId) {
//     var ref_board_user = ref_chatprivate[boardId].user.split(",").filter(function(item) {
//         return item !== "";
//     });
//     for (var i = 0; i < ref_board_user.length; i++) {
//         var boardId2 =ref_message[ref_board_user[i]].board;
//         boardId2 += boardId + ',';
//         database().ref('user_pri/message/'+ref_board_user[i]).update({
//             userId : userId,
//             board : boardId2,
//         });
//     }
//     database().ref('board_pri/board/'+boardId).update({
//         boardId : boardId,
//         userId : ref_board[boardId].userId,
//         message : "t",
//         nickname: ref_board[boardId].nickname,
//         menu : ref_board[boardId].menu,
//         time : ref_board[boardId].time,
//         place : ref_board[boardId].place,
//         age : ref_board[boardId].age,
//     });
    
//     navigation.navigate('Board', {moving: userId, moving2: ""});

// }

// function removeChatPriChatF(navigation, boardId, userId) {
//     console.log("===");
//     var user2 = [];
//     if (boardId === undefined) return;
//     if (ref_chatprivate[boardId].user === undefined) return;
//     var ref_chatprivate_user = ref_chatprivate[boardId].user;
//     ref_chatprivate_user = ref_chatprivate_user.split(',');
//     ref_chatprivate_user = ref_chatprivate_user.filter(function(item) {
//         return item !== "";
//     });
//     for (var i = 0; i < ref_chatprivate_user.length; i++) {
//         if (ref_chatprivate_user[i] === String(userId)) continue;
//         user2 += ref_chatprivate_user[i] + ",";
//     }
//     database().ref('board_pri/chat_private/' + boardId).update({
//         user : user2,
//         boardId : boardId,
//     });
//     var board2 = [];
//     var ref_chat_board = ref_chat[userId].board;
//     ref_chat_board = ref_chat_board.split(',');
//     ref_chat_board = ref_chat_board.filter(function(item) {
//         return item !== "";
//     });
//     for (var i = 0; i < ref_chat_board.length; i++) {
//         if (ref_chat_board[i] === String(boardId)) continue;
//         board2 += ref_chat_board[i] + ",";
//     }
//     database().ref('user_pri/chat/' + userId).update({
//         userId : userId,
//         board : board2,
//     });
//     navigation.navigate('Board', {moving: userId, moving2: ""})
// }

// function onChatprivateF(navigation, boardId, boarduserId, boardusernickname, userId, Product_Conversation) {
//     if (Product_Conversation === "") {
//         return
//     }
//     var conversation_board = ref_chatprivate[boardId].conversation + Product_Conversation + ","
//     var conversation_user = ref_chatprivate[boardId].user_conversation + userId + ","
//     var user = ref_chatprivate[boardId].user
//     database().ref('board_pri/chat_private/' + boardId ).update({
//         boardId : boardId,
//         conversation : conversation_board,
//         user : user,
//         user_conversation : conversation_user,
//     });
//     database().ref('board_pri/chat_private/').on('value', (snapshot) => {
//         console.log("ref_chatprivate2");
//         ref_chatprivate = snapshot.val();
//         navigation.navigate('Chat_Private', {moving: boardId, moving2: boarduserId, moving3: boardusernickname, moving4: userId})
//     });
// }

// function makeList(user_conversation, conversation) {
//     var c = [];
//     for (var i = 0; i < conversation.length; i++) {
//         c[i] = [];
//         c[i][0] = user_conversation[i];
//         c[i][1] = conversation[i];
//     }
//     return c;
// }

export default class Three_Chat_Private extends Component
{
    state = {
        Product_Conversation : "",
    }

    render(){
    console.log("===2");
    // const {navigation} = this.props;
    // var boardId = this.props.route.params.moving;
    // var boarduserId = this.props.route.params.moving2;
    // var boardusernickname = this.props.route.params.moving3;
    // var userId = this.props.route.params.moving4;
    // var boardId = 31
    // var boarduserId = 4
    // var boardusernickname = "b"
    // var userId = 4

    return (
        <Container>
            <Text>Main_Chat</Text>
            {/* <View style={styles.top_bar}>
                <View style={styles.top_1}>
                    <Button title='<-' onPress = {() => navigation.navigate('Board', {moving: userId, moving2: ""})} />                    
                </View>
                <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                    <Text style={{fontSize: 20,}}>ChatPrivate</Text>
                </View>
                <View style={styles.top_2}>
                    { (userId === boarduserId) ?
                        <Button title='Update' onPress = {() => navigation.navigate('Board_Update', {moving: boardId, moving2: boarduserId, moving3: boardusernickname, moving4: userId})}></Button> : <Text></Text>
                    }
                </View>
                <View style={styles.top_2}>
                    { (userId === boarduserId) ?
                    <Button title='Message' onPress = {() => updateMessage(navigation, boardId, userId)}></Button> : <Button title='Out' onPress = {() => removeChatPriChatF(navigation, boardId, userId)}></Button>
                    }
                </View>
            </View>
            <View style={styles.center}>
                <Button title='New' onPress = {() => navigation.navigate('Chat_Private', {moving: boardId, moving2: boarduserId, moving3: boardusernickname, moving4: userId})} /> */}
                    {/* <Text>{this.props.route.params.moving}</Text> */}
                    
                        {/* <FlatList
                            data={makeList(ref_chatprivate[boardId].user_conversation.split(",").filter(function(item) {return item !== "";}), ref_chatprivate[boardId].conversation.split(",").filter(function(item) {return item !== "";}))}
                            renderItem={({item}) => 
                            <View style={styles.center_1}>
                                {(item[0] === String(userId))?<Text style = {styles.center_3}>{item[1]}</Text>:<Text style = {styles.center_2}>{item[0]}</Text>}
                                {(item[0] === String(userId))?<Text style = {styles.center_2}>{item[0]}</Text>:<Text style = {styles.center_3}>{item[1]}</Text>}
                            </View>
                            }
                        />
                
            </View>
            <View style={styles.bottom}>
                <TextInput
                    placeholder="text"
                    onChangeText={(TextInputText) => this.setState({Product_Conversation : TextInputText})}
                    underlineColorAndroid='transparent'
                    style={{textAlign: 'center', borderWidth: 2, borderColor: 'skyblue', marginBottom: 10, width: "80%",}}
                />
                <View style={{margin: 10, alignItems: 'flex-end',}}>
                    <Button title="input" onPress = {() => onChatprivateF(navigation, boardId, boarduserId, boardusernickname, userId, this.state.Product_Conversation)}/>
                </View>
            </View> */}
        </Container>
    )
    }
}

const styles = StyleSheet.create({
    // top_bar: {
    //     width: '100%',
    //     height: '10%',
    //     flexDirection: 'row',
    //     backgroundColor: 'white',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    // },
    // top_1 : {
    //     flex:1,
    //     margin: 5,
    //     width: '30%',
    //     // alignItems: 'flex-start',
    //     // justifyContent: 'flex-start',
    // },
    // top_2 : {
    //     flex: 1,
    //     margin: 5,
    //     width: '30%',
    //     // alignItems: 'flex-end',
    //     // justifyContent: 'flex-end',
    // },
    // center : {
    //     flex: 1,
    //     width: '100%',
    //     backgroundColor: 'skyblue',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // center_1 : {
    //     padding: 5,
    //     margin: 5,
    //     width: '130%',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'flex-start',
    // },
    // center_2 : {
    //     padding: 5,
    //     margin: 5,
    //     width: '20%',
    //     backgroundColor: 'white',
    // },
    // center_3 : {
    //     padding: 5,
    //     margin: 5,
    //     width: '50%',
    //     backgroundColor: 'white',
    // },
    // bottom : {
    //     flexDirection: 'row',
    // },
});

// export default Three_Chat_Private;