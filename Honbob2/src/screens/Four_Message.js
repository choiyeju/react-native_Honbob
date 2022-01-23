import React, { Component } from 'react';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    useColorScheme,
    View,
    Button,
} from 'react-native';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: center;
    align-items: center;
`;

var boardCount = 0;
database().ref('board_pri/boardCount/Id').on('value', (snapshot) => {
    boardCount = snapshot.val();
});
var userCount = 0;
database().ref('user_pri/userCount/Id').on('value', (snapshot) => {
    userCount = snapshot.val();
});
var ref_board = [];
database().ref('board_pri/board/').on('value', (snapshot) => {
    console.log("message");
    ref_board = snapshot.val();
});
var ref_chat = []
database().ref('user_pri/chat/').on('value', (snapshot) => {
    ref_chat = snapshot.val();
});
var ref_message = []
var ref_message_board = []
var message_len = 0;
database().ref('user_pri/message/').on('value', (snapshot) => {
    ref_message = snapshot.val();
});

function onMessage(ref_message2, userId) {
    if (userId === undefined) return;
    if (ref_message2[userId].board === undefined) return;
    ref_message_board = ref_message2[userId].board.split(',').filter(function(item) {
        return item !== "";
    });
    message_len = ref_message_board.length;
    for (var i in ref_board) {
        if (ref_board[i] === "" || ref_board[i] === null || ref_board[i] === undefined){ delete ref_board[i];  continue; }
    }
    console.log(ref_message_board);
    ref_board = Object.values(ref_board);
    ref_board = ref_board.filter(function(item) {
        var j = '';
        //순서안맞춰짐
        for(var i = 0; i < message_len; i++){
            if (String(item.boardId) === ref_message_board[i]) {
                j = ref_message_board[i];
                break;
            }
        }
        return String(item.boardId) === j;
    });
    console.log(ref_board);
}

function RemoveBoard(ref_chat2, ref_message2, boardId, userId) {
    var ref_chat_board = [[]];
    for (var i = 1; i < userCount+1; i++) {
        if (ref_chat2[i] === null || ref_chat2[i] === undefined) continue;
        var board2 = [];
        board2[i] = "";
        if (ref_chat2[i] === null) continue;
        ref_chat_board[i] = ref_chat2[i].board.split(',');
        ref_chat_board[i] = ref_chat_board[i].filter(function(item) {
            return item !== "";
        });
        if (ref_chat_board[i].length === 0) continue;
        for (var n = 0; n < ref_chat_board[i].length; n++) {
            if (ref_chat_board[i][n] === String(boardId)) continue;
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
        if (ref_message2[i] === null || ref_message2[i] === undefined) continue;
        var board3 = [];
        board3[i] = "";
        if (ref_message2[i] === null) continue;
        ref_message_board[i] = ref_message2[i].board.split(',');
        ref_message_board[i] = ref_message_board[i].filter(function(item) {
            return item !== "";
        });
        if (ref_message_board[i].length === 0) continue;
        for (var n = 0; n < ref_message_board[i].length; n++) {
            if (ref_message_board[i][n] === String(boardId)) continue;
            if (n === 0) board3[i] = String(ref_message_board[i][n]) + ',';
            else board3[i] += String(ref_message_board[i][n]) + ',';
        }
        
        database().ref('user_pri/message/' + i).update({
            userId : i,
            board : board3[i],
        });
    }
    database().ref('board_pri/board/' + boardId).remove();
    database().ref('board_pri/chat_private/' + boardId).remove();
}
function RemoveBoardF(navigation, ref_chat2, ref_message2, boardId, userId) {
    RemoveBoard(ref_chat2, ref_message2, boardId, userId);
    navigation.navigate('Board', {moving: userId, moving2: ""});
}

export default class Four_Message extends Component{
    render() {
    const {navigation} = this.props;
    var userId = this.props.route.params.moving;
    var password = this.props.route.params.moving2;
    console.log("Message " + userId);
    onMessage(ref_message, userId);
    return (
        <Container>
            <View style={styles.top_bar}>
                <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                    <Text style={{fontSize: 20,}}>Message</Text>
                    <Text>{userId}</Text>
                </View>
                <View style={styles.top_1}>
                </View>
                <View style={styles.top_2}>
                </View>
            </View>
            <View style={styles.center}>
            <Button title='New' onPress = {() => navigation.navigate('Message', {moving: userId, moving2: password})} />
            <FlatList
                data={ref_board}
                renderItem={({item}) => 
                <View style={styles.center_1}>
                    <View>
                        <Text>                                                                            </Text>
                        <View style={{flexDirection: 'row',}}>
                            <View style = {styles.center_2}>
                                <Text style={{fontSize: 15, }}>메뉴 </Text>
                            </View>
                            <View style = {styles.center_3}>
                                <Text>{item.menu}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <View style = {styles.center_2}>
                                <Text style={{fontSize: 15, }}>시간 </Text>
                            </View>
                            <View style = {styles.center_3}>
                                <Text>{item.time}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <View style = {styles.center_2}>
                                <Text style={{fontSize: 15, }}>장소 </Text>
                            </View>
                            <View style = {styles.center_3}>
                                <Text>{item.place}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <View style = {styles.center_2}>
                                <Text style={{fontSize: 15, }}>나이 </Text>
                            </View>
                            <View style = {styles.center_3}>
                                <Text>{item.age}</Text>
                            </View>
                        </View>
                    </View>
                    <Text>                                                                            </Text>
                    {(userId === item.userId)?
                        <Button title='Delete' onPress = {() => RemoveBoardF(navigation, ref_chat, ref_message, item.boardId, userId)} />: <Text></Text>
                    }
            </View>
            }
            />
            </View>
            <View style={styles.bottom_real}>
                <View style={{flex:1,margin: 10, width: '30%',}}>
                    <Button title="Board" onPress = {() => navigation.navigate('Board', {moving: userId, moving2: password})} />
                </View>
                <View style={{flex:1,margin: 10, width: '30%',}}>
                    <Button title="Chat" onPress = {() => navigation.navigate('Chat', {moving: userId, moving2: password})} />
                </View>
                <View style={{flex:1,margin: 10, width: '30%',}}>
                    <Button title="Message" onPress = {() => navigation.navigate('Message', {moving: userId, moving2: password})} />
                </View>
            </View>
        </Container>
    );
    }
}

const styles = StyleSheet.create({
    top_bar: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    top_1 : {
        flex:1,
        margin: 5,
        width: '30%',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
    },
    top_2 : {
        flex: 1,
        margin: 5,
        width: '30%',
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
    },
    center : {
        margin: 5,
        width: '100%',
        height: '78.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_1 : {
        flex: 1,
        padding: 5,
        margin: 5,
        width: '97%',
        backgroundColor: 'skyblue',

    },
    center_2 : {
        padding: 5,
        margin: 5,
        flexDirection: 'row',
        width: '15%',
        backgroundColor: 'skyblue',
    },
    center_3 : {
        flex: 1,
        padding: 5,
        margin: 5,
        flexDirection: 'row',
        width: '96%',
        backgroundColor: 'white',
    },
    bottom : {
        margin: 5,
        width: '30%',
    },
    bottom_real : {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// export default Four_Message;