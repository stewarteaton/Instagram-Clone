import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button} from 'react-native';


export class Login extends Component {
    login(){
        // navigate to main feed by key when clicked
        this.props.navigation.navigate('register');
    }

    render() {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <TouchableOpacity style={{height: 100 +'%', width: 100 + '%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                onPress={this.login()}>
                <Text>New User?</Text>
            </TouchableOpacity>
        );
    }
}

export default Login;

