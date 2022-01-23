import React, { Component, useEffect, useState } from 'react';
import { Text, AppRegistry, StyleSheet, TextInput, View, Alert, Button } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import One_Sign_Special from './One_Sign_Special';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';

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
    console.log("main");
    ref_user = snapshot.val();
    for(var i = 0 ; i < userCount + 1; i++) {
        if (ref_user[i] === "" || ref_user[i] === null || ref_user[i] === undefined) delete ref_user[i];
    }
});

function onEmailUser(email) {
    for(var i = 1; i < userCount+1; i++) {
        if (ref_user[i] === null || ref_user[i] === undefined) continue;
        if (ref_user[i].id === email) return ref_user[i].id;
    }
    return "";
}

function onUser(id) {
    for(var i = 1; i < userCount+1; i++) {
        if (ref_user[i] === null || ref_user[i] === undefined) continue;
        if (ref_user[i].id === id) return ref_user[i].userId;
    }
    return "";
}

export default function One_Main({navigation}) {
    const user = auth().currentUser;
    const email = user?.email
    var list_email = onEmailUser(email);
    console.log("Main " + email);
    var userId = onUser(email);

    database().ref('user_pri/userCount/Id').on('value', (snapshot) => {
        userCount = snapshot.val();
    });
    database().ref('user_pri/user/').on('value', (snapshot) => {
        console.log("main");
        ref_user = snapshot.val();
        for(var i = 0 ; i < userCount + 1; i++) {
            if (ref_user[i] === "" || ref_user[i] === null || ref_user[i] === undefined) delete ref_user[i];
        }
    });

    const [id, onChangeId] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
            '529512825620-csmc06s0iisl7c32e8bk95g1212cun35.apps.googleusercontent.com'
        });
    }, []);

    useEffect(() => {
        return () => setLoggedIn(false);
    }, []);

    async function onGoogleButtonPress() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    const [loggedIn, setLoggedIn] = useState(false);

    auth().onAuthStateChanged((user) => {
        if (user) {
        setLoggedIn(true);
        } else {
        setLoggedIn(false);
        }
    });

    if (loggedIn) {
        return (
            <Container>
                <View style={styles.MainContainer}>
                    <View style={{width: '50%', marginBottom: 7,}}>
                        { (email === list_email) ? 
                        <Button title="Board" onPress = {() => navigation.navigate('Board', {moving: userId, moving2: ''})} /> : <Button title="Email Sign" onPress = {() => navigation.navigate('Sign_Special', {moving: email, moving2: ''})} />
                        }
                    </View>
                    <View style={{width: '50%', marginBottom: 7,}}>
                        <Button title="Logout" onPress={() => auth().signOut()} />
                    </View>
                </View>
            </Container>
        );
    }
    return (
        <Container>
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder="Id"
                    onChangeText={onChangeId}
                    value={id}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Passworld"
                    onChangeText={onChangePassword}
                    value={password}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Sign" onPress = {() => navigation.navigate('Sign')} />
                </View>
                <View style={{width: '50%', marginBottom: 7,}}>
                    <Button title="Login" onPress={() => navigation.navigate('Login', {moving: id, moving2: password})} />
                </View>
                <GoogleSigninButton onPress={onGoogleButtonPress} />
             </View>
        </Container>
    );
    
    
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
