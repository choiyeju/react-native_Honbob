import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: flex-start;
    align-items: flex-start;
`;

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
var ref_chat = [];
database().ref('user_pri/chat/').on('value', (snapshot) => {
    ref_chat = snapshot.val();
});
function onChat(userId) {
    if (ref_chat[userId].board === undefined) return;
    return ref_chat[userId].board;
}
function setBoard(boardId, userId, usernickname, menu, time, place, age) {
    database().ref('board_pri/board/' + (boardId+1)).set({
        boardId : boardId+1,
        userId : userId,
        nickname : usernickname,
        message : "f",
        menu : menu,
        time : time,
        place : place,
        age : age
    });
    database().ref('board_pri/chat_private/' + (boardId+1)).set({
        boardId : boardId+1,
        conversation : "",
        user_conversation : "",
        user : userId+",",
    });
    var board2 = onChat(userId);
    var ref_chat_board = [];
    if (board2 !== null) ref_chat_board = board2.split(',');
    ref_chat_board = ref_chat_board.filter(function(item) {
        return item !== "";
    });
    board2 += (boardId+1) + ',';
    database().ref('user_pri/chat/'+userId).update({
        userId : userId,
        board : board2,
    });
    database().ref('board_pri/boardCount/').update({
        Id: boardId+1
    });
}

function setBoardF(navigation, boardCount, userId, usernickname, menu, time, place, age) {
    setBoard(boardCount, userId, usernickname, menu, time, place, age);

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
        console.log("?");
        navigation.navigate('Board', {moving: userId, moving2: ""});
    });
    // alert('글추가 성공!');
    console.log("===add");
}

export default class Two_Board_Add extends Component
{
    state = {
        Product_Menu: '',
        Product_Time: '',
        Product_Place: '',
        Product_Age: '',
    }
    
    render(){
    const {navigation} = this.props;
    var userId = this.props.route.params.moving;
    var usernickname = this.props.route.params.moving2;
    var password = this.props.route.params.moving3;
    console.log("Add " + userId);
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={styles.top_bar}>
                <View style={styles.top_1}>
                    <Button title='Board' onPress = {() => navigation.navigate('Board', {moving: userId, moving2: password})} />
                </View>
                <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                    <Text style={{fontSize: 20,}}>Add</Text>
                </View>
                <View style={styles.top_2}>
                    <Button title='Filter' onPress = {() => navigation.navigate('Board_Filter')} />
                </View>
            </View>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                        <Text style={{fontSize: 25,}}>Menu</Text>
                    </View>
                    <TextInput
                        placeholder="menu"
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
                        placeholder="time"
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
                        placeholder="place"
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
                        placeholder="age"
                        onChangeText={(TextInputAge) => this.setState({Product_Age : TextInputAge})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
            </View>
            <View style={{width: '100%', alignItems: 'flex-end',}}>
                <View style={styles.bottom}>
                    <Button title='Board_Add' onPress = {() => setBoardF(navigation, boardCount, userId, usernickname, this.state.Product_Menu, this.state.Product_Time, this.state.Product_Place, this.state.Product_Age)} />
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

// export default Two_Board_Add;