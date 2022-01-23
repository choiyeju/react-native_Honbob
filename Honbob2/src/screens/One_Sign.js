//회원탈퇴할 때 Chat, Message 안열리게 해야함
import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: center;
    align-items: center;
`;

function setSign(userId, nickname, age, id, password) {
    database().ref('user_pri/user/' + (userId+1)).set({
        userId : userId+1,
        nickname : nickname,
        age : age,
        id : id,
        password : password,
    });
    database().ref('user_pri/message/'+(userId+1)).set({
        userId: userId+1,
        board: '',
    });
    database().ref('user_pri/chat/'+(userId+1)).set({
        userId: userId+1,
        board: '',
    });
    database().ref('user_pri/userCount/').set({
        Id: userId+1
    });
    alert('회원가입성공!');
}

var boardCount = 0;
database().ref('board_pri/boardCount/Id').on('value', (snapshot) => {
    boardCount = snapshot.val();
});
var ref_board = [];
database().ref('board_pri/board/').on('value', (snapshot) => {
    ref_board = snapshot.val();
});
var userCount = 0;
database().ref('user_pri/userCount/Id').on('value', (snapshot) => {
    userCount = snapshot.val();
});
var ref_user = [];
database().ref('user_pri/user/').on('value', (snapshot) => {
    ref_user = snapshot.val();
});
var ref_chatprivate = [];
database().ref('board_pri/chat_private/').on('value', (snapshot) => {
    ref_chatprivate = snapshot.val();
});
var ref_chat = [];
database().ref('user_pri/chat/').on('value', (snapshot) => {
    ref_chat = snapshot.val();
});
var ref_message = [];
database().ref('user_pri/message/').on('value', (snapshot) => {
    ref_message = snapshot.val();
});
function removeSign(userCount, id, password) {
    console.log(id);
    for(var k = 1; k < userCount+1; k++) {
        if (ref_user[k] === null || ref_user[k] === undefined) continue;
        var k_userId = ref_user[k].userId;
        if (ref_user[k].id === id && ref_user[k].password === password) {
            for (var j = 1; j < boardCount+1; j++){
                if (ref_board[j] === null || ref_board[j] === undefined) continue;
                if (ref_board[j].userId === k_userId){
                    /*removeChatpriChatMessageElement*/
                    var k_boardId = ref_board[j].boardId;

                    var ref_chatprivate_user = [[]];
                    for (var i = 1; i < boardCount+1; i++) {
                        if (k_boardId === i) continue;
                        if (ref_chatprivate[i] === null || ref_chatprivate[i] === undefined) continue;
                        var user2 = [];
                        user2[i] = "";
                        if (ref_chatprivate[i] === null) continue;
                        ref_chatprivate_user[i] = ref_chatprivate[i].user.split(',');
                        ref_chatprivate_user[i] = ref_chatprivate_user[i].filter(function(item) {
                            return item !== "";
                        });
                        if (ref_chatprivate_user[i].length === 0) continue;
                        for (var n = 0; n < ref_chatprivate_user[i].length; n++) {
                            if (ref_chatprivate_user[i][n] === String(k_userId)) continue;
                            if (n === 0) user2[i] = String(ref_chatprivate_user[i][n]) + ',';
                            else user2[i] += String(ref_chatprivate_user[i][n]) + ',';
                        }
                        database().ref('board_pri/chat_private/' + i).update({
                            user : user2[i],
                            boardId : i,
                        });
                    }
                    var ref_chat_board = [[]];
                    for (var i = 1; i < userCount+1; i++) {
                        if (k_userId === i) continue;
                        if (ref_chat[i] === null || ref_chat[i] === undefined) continue;
                        var board2 = [];
                        board2[i] = "";
                        if (ref_chat[i] === null) continue;
                        ref_chat_board[i] = ref_chat[i].board.split(',');
                        ref_chat_board[i] = ref_chat_board[i].filter(function(item) {
                            return item !== "";
                        });
                        if (ref_chat_board[i].length === 0) continue;
                        for (var n = 0; n < ref_chat_board[i].length; n++) {
                            if (ref_chat_board[i][n] === String(k_boardId)) continue;
                            if (n === 0) board2[i] = String(ref_chat_board[i][n]) + ',';
                            else board2[i] += String(ref_chat_board[i][n]) + ',';
                        }
                        database().ref('user_pri/chat/' + i).update({
                            userId : i,
                            board : board2[i],
                        });
                    }
                    var ref_message_board = [[]];
                    for (var i = 1; i < userCount+1; i++) {
                        if (k_userId === i) continue;
                        if (ref_message[i] === null || ref_message[i] === undefined) continue;
                        var board3 = [];
                        board3[i] = "";
                        if (ref_message[i] === null) continue;
                        ref_message_board[i] = ref_message[i].board.split(',');
                        ref_message_board[i] = ref_message_board[i].filter(function(item) {
                            return item !== "";
                        });
                        if (ref_message_board[i].length === 0) continue;
                        for (var n = 0; n < ref_message_board[i].length; n++) {
                            if (ref_message_board[i][n] === String(k_boardId)) continue;
                            if (n === 0) board3[i] = String(ref_message_board[i][n]) + ',';
                            else board3[i] += String(ref_message_board[i][n]) + ',';
                        }
                        
                        database().ref('user_pri/message/' + i).update({
                            userId : i,
                            board : board3[i],
                        });
                    }
                    /*removeBoardChatpri*/
                    database().ref('board_pri/board/' + ref_board[j].boardId).remove();
                    database().ref('board_pri/chat_private/' + ref_board[j].boardId).remove();
                    database().ref('user_pri/user/' + k_userId).remove();
                    database().ref('user_pri/chat/' + k_userId).remove();
                    database().ref('user_pri/message/' + k_userId).remove();
                }
            }

            /*removeUserChatMessage*/


            alert('회원탈퇴성공!');
            break;
        }
    }
}

export default class One_Sign extends Component {
    state = {
        Product_Nickname: '',
        Product_Age: '',
        Product_Id: '',
        Product_Password: '',
    }
    render(){
    return (
        <Container>
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder="Nickname"
                    onChangeText={(TextInputNickname) => this.state.Product_Nickname = TextInputNickname}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Age"
                    onChangeText={(TextInputAge) => this.state.Product_Age = TextInputAge}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Id"
                    onChangeText={(TextInputId) => this.state.Product_Id = TextInputId}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(TextInputPassword) => this.state.Product_Password = TextInputPassword}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{flex: 1, marginBottom: 7,}}><Button title="Sign" onPress={() => setSign(userCount, this.state.Product_Nickname, this.state.Product_Age, this.state.Product_Id, this.state.Product_Password)} /></View>
                    
                </View>
                <View style={styles.TextInputStyleClass}><Button title="Signout" onPress={() => removeSign(userCount, this.state.Product_Id, this.state.Product_Password)} /></View>
            </View>
        </Container>
    );
    }
}

 
const styles = StyleSheet.create({
    MainContainer :{
        flex:1,
        margin: 10,
        justifyContent: 'center',
    },
    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 2,
        borderColor: 'skyblue',
        width: 200,
    }
});

// export default One_Sign;