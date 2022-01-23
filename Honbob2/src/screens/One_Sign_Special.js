//회원탈퇴할 때 Chat, Message 안열리게 해야함
import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
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

function Login(navigation, userCount, Nickname, Age, id, Password) {
    setSign(userCount, Nickname, Age, id, Password);
    navigation.navigate('Login_Email', {moving: id, moving2: ""});
}

function LoginOut(navigation, id) {
    auth().signOut()
    try{
        navigation.navigate('Main');
    } catch {
        alert('회원가입성공!');
        navigation.navigate('Main');
    }
}

export default class One_Sign_Special extends Component {
    state = {
        Product_Nickname: '',
        Product_Age: '',
        Product_Password: '',
    }
    render(){
    const {navigation} = this.props;
    var id = this.props.route.params.moving;
    var password = this.props.route.params.moving2;
    console.log("Sign_Special " + id);
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
                    placeholder="Password"
                    onChangeText={(TextInputPassword) => this.state.Product_Password = TextInputPassword}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 7,}}>
                    <View style={{flex: 1,}}><Button title="Sign" onPress={() => Login(navigation, userCount, this.state.Product_Nickname, this.state.Product_Age, id, this.state.Product_Password)} /></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 7,}}>
                   <View style={{flex: 1,}}><Button title="Logout" onPress={() => LoginOut(navigation, id)} /></View>
                </View>
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