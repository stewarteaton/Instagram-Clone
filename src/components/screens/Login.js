import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, Button} from 'react-native';
import config from '../../config/index';
import actions from '../../redux/actions';
import { connect } from 'react-redux';


export class Login extends Component {
    constructor(){
        super();
        this.state = {
            credentials: {
                email: '',
                password: '',
            },
        };
    }

    updateText(text, field) {
        // must assign object because nested
        let newCredentials = Object.assign(this.state.credentials);
        newCredentials[field] = text;
        this.setState({
            credentials: newCredentials,
        });
    }

    login(){
        //send credentials to server
        fetch(config.baseUrl + '/login', {
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
                // dispatch user data to redux store
                console.log(jsonResponse);
                this.props.userRecieved(jsonResponse);
                this.props.navigation.navigate({routeName: 'main', params: {user: jsonResponse}});
            }
        })
        .catch(err => {
            console.log(err.error);
        //     Alert.alert('Error', err.error,
        //             [
        //             {text: 'OK', onPress: () => console.log(err.error)},
        //             ],
        //             {cancelable: false},
        //         );
        });
    }

    render() {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{height: 100 + '%', width: 100 + '%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(75,75,75)'}}>
                <Text style={styles.loginTitle}>Login</Text>
                <TextInput autoCapitalize="none" value={this.state.email} onChangeText={text => this.updateText(text, 'email')} placeholder="Email" style={styles.input}/>
                <TextInput autoCapitalize="none" value={this.state.password} onChangeText={text => this.updateText(text, 'password')} secureTextEntry placeholder="Password" style={styles.input}/>
                <Button title="Login" onPress={() =>{this.login();}} />
                <Button title="New User? Sign up here" onPress={() => this.props.navigation.navigate('register')} />
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
    loginTitle: {
        marginBottom: 20 + '%',
        fontSize: 30,
        color: 'white',
    }
});

const mapStateToProps = state => {
    return {

    }
}

const dispatchToProps = dispatch => {
    return {
        userRecieved: (user) => dispatch(actions.userRecieved(user)),
    };
}


export default connect(mapStateToProps, dispatchToProps)(Login);

