import React from 'react';
import { Text, AppRegistry, StyleSheet, TextInput, View, Alert, Button } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    backgroundColor: ivory;
    justify-content: center;
    align-items: center;
`;

const Two_Board_Filter = () => {
    return (
        <Container>
            <View style={styles.MainContainer}>
                <View style={styles.SecondContainer}>
                    <View style={{flex:1,margin: 10, alignItems: 'flex-start',}}>
                        <Text style={{fontSize: 25,}}>Menu</Text>
                    </View>
                    <TextInput
                        placeholder="menu"
                        onChangeText={TextInputName => this.setState({TextInputName})}
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
                        onChangeText={TextInputEmail => this.setState({TextInputEmail})}
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
                        onChangeText={TextInputPhoneNumber => this.setState({TextInputPhoneNumber})}
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
                        onChangeText={TextInputPhoneNumber => this.setState({TextInputPhoneNumber})}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyleClass}
                    />
                    <View style={{flex:1,}}></View>
                </View>
            </View>
            <View style={{width: '100%', alignItems: 'flex-end',}}>
                <View style={styles.bottom}>
                    <Button title='Board_Filter' onPress = {() => navigation.navigate('Board_Add')} />
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

export default Two_Board_Filter;