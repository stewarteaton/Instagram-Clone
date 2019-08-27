import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import config from '../../config/index';

export class Register extends Component {

    constructor(){
        super();
        this.state = {
            credentials: {
                login: '',
                password: '',
            }
        };
    }

    updateText(text, field){  
        // must assign object because nested
        let newCredentials = Object.assign(this.state.credentials);
        newCredentials[field] = text;
        this.setState({
            credentials: newCredentials,
        })
    }

    register(){
        //send credentials to server
        fetch(config.baseUrl + '/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.credentials)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(JSON.stringify(jsonResponse));
        }).catch(err => {
            alert('error');
        })
        
    }

    render() {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{height: 100 + '%', width: 100 + '%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(100,100,100)'}}
                                >
                <Text>REGISTER PAGE</Text>
                <TextInput value={this.state.login} onChangeText={text => this.updateText(text, 'login')} placeholder="Username" style={styles.input}/>
                <TextInput value={this.state.login} onChangeText={text => this.updateText(text, 'password')} secureTextEntry placeholder="Password" style={styles.input}/>
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
    }
});
export default Register;

