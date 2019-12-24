import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import config from '../../config/index';

export class Register extends Component {

    constructor(){
        super();
        this.state = {
            credentials: {
                email: '',
                password: '',
            },
        };
    }

    updateText(text, field){
        // must assign object because nested
        let newCredentials = Object.assign(this.state.credentials);
        newCredentials[field] = text;
        this.setState({
            credentials: newCredentials,
        });
    }

    register(){
        //send credentials to server
        fetch(config.baseUrl + '/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.credentials),
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            if (jsonResponse.error != null){
                Alert.alert('Error', jsonResponse.error,
                [
                    {text: 'OK', onPress: () => console.log(jsonResponse.error)},
                    ],
                    {cancelable: false},
                );
            }
            if (jsonResponse.confirmation === 'Success!'){
                this.props.navigation.navigate('main');
            }
        })
        .catch(err => {
            // Works on both iOS and Android
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                {text: 'OK', onPress: () => console.log(err)},
                ],
                {cancelable: false},
            );
        });
    }

    render() {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{height: 100 + '%', width: 100 + '%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(75,75,75)'}}>
                <Text style={styles.registerTitle}>Register</Text>
                <TextInput value={this.state.email} onChangeText={text => this.updateText(text, 'email')} placeholder="Email" style={styles.input}/>
                <TextInput value={this.state.password} onChangeText={text => this.updateText(text, 'password')} secureTextEntry placeholder="Password" style={styles.input}/>
                <Button title="Signup" onPress={() =>{this.register();}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 100 + '%',
        paddingHorizontal: 50,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    registerTitle: {
        marginBottom: 20 + '%',
        fontSize: 30,
        color: 'white',
    }
});
export default Register;

