import React, { Component, useEffect, useState } from 'react';
import { Text, AppRegistry, StyleSheet, TextInput, View, Alert, Button } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

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
var ref_user = [];
database().ref('user_pri/user/').on('value', (snapshot) => {
    ref_user = snapshot.val();
    for(var i = 0 ; i < userCount + 1; i++) {
        if (ref_user[i] === "" || ref_user[i] === null || ref_user[i] === undefined) delete ref_user[i];
    }
});
function onUser(id) {
    for(var i = 1; i < userCount+1; i++) {
        if (ref_user[i] === null || ref_user[i] === undefined) continue;
        if (ref_user[i].id === id) return ref_user[i].userId;
    }
    return "";
}

var ref_board = [];
database().ref('board_pri/board/').on('value', (snapshot) => {
    console.log("board");
    ref_board = snapshot.val();
    /*필터*/
    for (var i in ref_board) {
        if (ref_board[i] === "" || ref_board[i] === null || ref_board[i] === undefined){ delete ref_board[i];  continue; }
        if (ref_board[i].message === "t") delete ref_board[i];
    }
    ref_board = Object.values(ref_board);
    ref_board = Object.values(ref_board).reverse()
});

export default class One_Login extends Component {
    render() {
    const {navigation} = this.props;
    var id = this.props.route.params.moving;
    var password = this.props.route.params.moving2;
    var userId = onUser(id);
    if (userId === "")
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Sign" onPress = {() => navigation.navigate('Sign')} />
                </View>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Main" onPress={() => navigation.navigate('Main')} />
                </View>
            </View>
        </Container> 
    );
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Board" onPress = {() => navigation.navigate('Board', {moving: userId, moving2: password})} />
                </View>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Logout" onPress={() => navigation.navigate('Main')} />
                </View>
            </View>
        </Container> 
    );
    }
}

 
const styles = StyleSheet.create({
    MainContainer :{
        margin: 10,
        width: '100%',
        alignItems: 'center',
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

// export default One_Login;