import React, { Component } from 'react';
import { Button } from 'react-native';
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
} from 'react-native';
import { render } from 'express/lib/response';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: center;
    align-items: center;
`;

var userCount = 0;
database().ref('user_pri/userCount/Id').on('value', (snapshot) => {
    userCount = snapshot.val();
});
var ref_chat = []
var ref_chat_board = []
var chat_len = 0;
database().ref('user_pri/chat/').on('value', (snapshot) => {
    ref_chat = snapshot.val();
});

var ref_board = [];
database().ref('board_pri/board/').on('value', (snapshot) => {
    console.log("chat");
    ref_board = snapshot.val();
});

function onChat(userId) {
    console.log(userId);
    ref_chat_board = ref_chat[userId].board;
    ref_chat_board = ref_chat_board.split(',');
    ref_chat_board = ref_chat_board.filter(function(item) {
        return item !== "";
    });
    chat_len = ref_chat_board.length;
    for (var i in ref_board) {
        if (ref_board[i] === "" || ref_board[i] === null || ref_board[i] === undefined){ delete ref_board[i];  continue; }
        if (ref_board[i].message === "t") delete ref_board[i];
    }
    ref_board = Object.values(ref_board);
    console.log(ref_chat_board);
    ref_board = ref_board.filter(function(item) {
        var j = '';
        //순서안맞춰짐
        for(var i = 0; i < chat_len; i++){
            if (String(item.boardId) === ref_chat_board[i]) {
                j = ref_chat_board[i];
                break;
            }
        }
        return String(item.boardId) === j;
    });
    ref_board.reverse();
}

export default class Three_Chat extends Component {
    render() {
    const {navigation} = this.props;
    var userId = this.props.route.params.moving;
    var password = this.props.route.params.moving2;

    console.log("Chat " + userId);
    onChat(userId);
    return (
        <Container>
            <View style={styles.top_bar}>
                <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                    <Text style={{fontSize: 20,}}>Chat</Text>
                    <Text>{userId}</Text>
                </View>
                <View style={styles.top_1}>
                </View>
                <View style={styles.top_2}>
                </View>
            </View>
            <View style={styles.center}>
            <Button title='New' onPress = {() => navigation.navigate('Chat', {moving: userId, moving2: ""})} />
            <FlatList
                data={ref_board}
                renderItem={({item}) => 
                <View style={styles.center_1}>
                    <Button title={item.nickname} onPress = {() =>  navigation.navigate('Chat_Private', {moving: item.boardId, moving2: item.userId, moving3: item.nickname, moving4: userId})}/>
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
        width: '96%',
        flexDirection: 'row',
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

// export default Three_Chat;