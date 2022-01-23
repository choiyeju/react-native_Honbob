import React, { Component, useEffect, useState } from 'react';
import { Text, AppRegistry, StyleSheet, TextInput, View, Alert, Button } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: center;
    align-items: center;
`;

function onUser(id) {
    for(var i = 1; i < userCount+1; i++) {
        if (ref_user[i] === null || ref_user[i] === undefined) continue;
        if (ref_user[i].id === id) return ref_user[i].userId;
    }
    return "";
}

export default class One_Login_Email extends Component {
    render() {
    const {navigation} = this.props;
    var id = this.props.route.params.moving;
    var password = this.props.route.params.moving2;
    var userId = onUser(id);
    console.log(id);
    console.log(userId);
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Board" onPress = {() => navigation.navigate('Board', {moving: userId, moving2: ''})} />
                </View>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Logout" onPress={() => auth().signOut()} />
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