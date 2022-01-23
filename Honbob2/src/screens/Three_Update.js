//menu time place age에 값을 안적으면 본래 값이 사라짐
//삭제 기능 안됨
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: flex-start;
    align-items: flex-start;
`;

var nickname = 'b';

var ref_board = []
database().ref('board_pri/board/').on('value', (snapshot) => {
    ref_board = snapshot.val();
});
function UpdateBoard(boardId, boarduserId, boardusernickname, menu, time, place, age) {
    database().ref('board_pri/board/' + boardId).update({
        userId : boarduserId,
        boardId : boardId,
        message : ref_board[boardId].message,
        nickname : boardusernickname,
        menu : (menu === '') ? ref_board[boardId].menu : menu,
        time : (time === '') ? ref_board[boardId].time : time,
        place : (place === '') ? ref_board[boardId].place : place,
        age : (age === '') ? ref_board[boardId].age : age,
    });
}

var userCount = 0;
database().ref('user_pri/userCount/Id').on('value', (snapshot) => {
    userCount = snapshot.val();
});
var ref_chat = []
database().ref('user_pri/chat/').on('value', (snapshot) => {
    ref_chat = snapshot.val();
});
var ref_message = [];
database().ref('user_pri/message/').on('value', (snapshot) => {
    ref_message = snapshot.val();
});
function RemoveBoard(boardId) {
    var ref_chat_board = [[]];
    for (var i = 2; i < userCount+1; i++) {
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
    for (var i = 2; i < userCount+1; i++) {
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

function UpdateBoardF(navigation, boardId, boarduserId, boardusernickname, userId, menu, time, place, age) {
    UpdateBoard(boardId, boarduserId, boardusernickname, menu, time, place, age);
    navigation.navigate('Chat_Private', {moving: boardId, moving2: boarduserId, moving3: boardusernickname, moving4: userId});
}

function RemoveBoardF(navigation, boardId, userId) {
    RemoveBoard(boardId);
    database().ref('board_pri/board/').on('value', (snapshot) => {
        console.log("board");
        ref_board = snapshot.val();
        /*필터*/
        for (var i in ref_board) {
            if (ref_board[i] === "" || ref_board[i] === null || ref_board[i] === undefined){ delete ref_board[i];  continue; }
            if (ref_board[i].message === "t") delete ref_board[i];
        }
        ref_board = Object.values(ref_board);
        ref_board = Object.values(ref_board).reverse();
        navigation.navigate('Board', {moving: userId, moving2: ""});
    });
}

export default class Three_Update extends Component
{
    state = {
        Product_Menu: '',
        Product_Time: '',
        Product_Place: '',
        Product_Age: '',
    }
    
    render(){
    const {navigation} = this.props;
    var boardId = this.props.route.params.moving;
    var boarduserId = this.props.route.params.moving2;
    var boardusernickname = this.props.route.params.moving3;
    var userId = this.props.route.params.moving4;
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                        <Text style={{fontSize: 25,}}>Menu</Text>
                    </View>
                    <TextInput
                        placeholder={ref_board[boardId].menu}
                        onChangeText={(TextInputMenu) => this.setState({Product_Menu : TextInputMenu})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                        <Text style={{fontSize: 25,}}>Time</Text>
                    </View>
                    <TextInput
                        placeholder={ref_board[boardId].time}
                        onChangeText={(TextInputTime) => this.setState({Product_Time : TextInputTime})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start', width: '10%',}}>
                        <Text style={{fontSize: 25,}}>Place</Text>
                    </View>
                    <TextInput
                        placeholder={ref_board[boardId].place}
                        onChangeText={(TextInputPlace) => this.setState({Product_Place : TextInputPlace})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                        <Text style={{fontSize: 25,}}>Age</Text>
                    </View>
                    <TextInput
                        placeholder={ref_board[boardId].age}
                        onChangeText={(TextInputAge) => this.setState({Product_Age : TextInputAge})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-end',}}>
                <View style={styles.bottom}></View>
                <View style={styles.bottom}>
                    <Button title='Update' onPress = {() => UpdateBoardF(navigation, boardId, boarduserId, boardusernickname, userId, this.state.Product_Menu, this.state.Product_Time, this.state.Product_Place, this.state.Product_Age)} />
                </View>
                <View style={styles.bottom}>
                    <Button title='Delete' onPress = {() => RemoveBoardF(navigation, boardId, userId)} />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{flex:1,margin: 20, alignItems: 'flex-start',}}>
                    <Text style={{fontSize: 20,}}>Board</Text>
                </View>
            </View>
        </Container>
    )
    }
}


const styles = StyleSheet.create({
    MainContainer : {
        flex:1,
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    SecondContainer: {
        flexDirection: 'row',
    },
    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'skyblue',
        width: 200,
    },
    bottom : {
        margin: 5,
        width: '30%',
    },
});

// export default Two_Board_Update;