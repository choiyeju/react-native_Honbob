//데이터가 가져와지지 않음
//SectionList 크기가 이상함
import RenderHTML from 'react-native-render-html';
import React, { Component } from 'react';
import { SectionList, FlatList, Button, useWindowDimensions  } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import PropTypes from "prop-types";

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
    justify-content: center;
    align-items: center;
`;

console.log("===");

var ref_user = [];
database().ref('user_pri/user/').on('value', (snapshot) => {
    ref_user = snapshot.val();
    for(var i in ref_user) {
        if (ref_user[i] === "" || ref_user[i] === null || ref_user[i] === undefined) delete ref_user[i];
    }
});

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

function onUserNickname(userId) {
    for(var i in ref_user) {
        if (ref_user[i] === null || ref_user[i] === undefined) continue;
        if (ref_user[i].userId === userId) return ref_user[i].nickname;
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

function Main(navigation, userId, usernickname, password, ref_board4) {
    const user = auth().currentUser;

    if (ref_board4.length === 0)
    return <Container>
        <View style={styles.top_bar}>
            <View style={styles.top_1}>
                { (user?.email === undefined)?
                    <Button title='<-' onPress = {() => navigation.navigate('Login', {moving: ref_user[userId].nickname, moving2: ""})} />:<Button title='<-' onPress = {() => navigation.navigate('Main')} />
                }
            </View>
            <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                <Text style={{fontSize: 20,}}>Board</Text>
            </View>
            <View style={styles.top_2}>
                <Button title='Filter' onPress = {() => navigation.navigate('Board_Filter')} />
            </View>
        </View>
        <View style={styles.center}>
        <Button title='New' onPress = {() => navigation.navigate('Board', {moving: userId, moving2: ""})} />
            <Text>글이 없습니다 새로운 글을 작성해주세요</Text>
        </View>
        <View style={{width: '100%', alignItems: 'flex-end',}}>
            <View style={styles.bottom}>
                <Button title='Add' onPress = {() => navigation.navigate('Board_Add', {moving: userId, moving2: usernickname, moving3: password})} />
            </View>
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
    </Container>;
return <Container>
        <View style={styles.top_bar}>
            <View style={styles.top_1}>
                { (user?.email === undefined)?
                    <Button title='<-' onPress = {() => navigation.navigate('Login', {moving: ref_user[userId].nickname, moving2: ""})} />:<Button title='<-' onPress = {() => navigation.navigate('Main')} />
                }
            </View>
            <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                <Text style={{fontSize: 20,}}>Board</Text>
                <Text>{userId}</Text>
            </View>
            <View style={styles.top_2}>
                <Button title='Filter' onPress = {() => navigation.navigate('Board_Filter')} />
            </View>
        </View>
        <View style={styles.center}>
        <Button title='New' onPress = {() => navigation.navigate('Board', {moving: userId, moving2: ""})} />
        <FlatList
            data={ref_board4}
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
            {/* <Text>{Board_List_Element}</Text>
            <RenderHTML contentWidth={width} source={{html}} /> */}
        </View>
        <View style={{width: '100%', alignItems: 'flex-end',}}>
            <View style={styles.bottom}>
                <Button title='Add' onPress = {() => navigation.navigate('Board_Add', {moving: userId, moving2: usernickname, moving3: password})} />
            </View>
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
    </Container>;
    
}

export default class Two_Board extends Component
{
    render(){
        console.log("===2");
        const {navigation} = this.props;
        var userId = this.props.route.params.moving;
        var password = this.props.route.params.moving2;
        var usernickname = onUserNickname(userId);

        // var ref_board3 = onBoard(ref_board);
        // console.log(ref_board3);

        return (Main(navigation, userId, usernickname, password, ref_board));
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
        height: '71.5%',
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
        // height: '10%',
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

// export default Two_Board;