import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export class Camera extends Component {
    login(){
        // navigate to main feed by key when clicked
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <TouchableOpacity style={{height: 100 +'%', width: 100+'%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                onPress={this.login()}>
                <Text>Camera</Text>
            </TouchableOpacity>
        )
    }
}

export default Camera;

