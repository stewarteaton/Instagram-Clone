/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
// React Native libraries
import { View, Text, StyleSheet } from 'react-native';
// import { Image, Dimensions, TouchableOpacity } from 'react-native';
// import config from '../../config';
import { PostFeed } from '../container';

class MainFeed extends Component {

    render(){
        return (
            <View style={{flex: 1, width: 100 + '%', height: 100 + '%'}}>
                <View style={styles.nav} >
                    <Text>Instagram</Text>
                </View>
                <PostFeed />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nav: {
        width: 100 + '%', height: 60, backgroundColor: 'rgb(250,250,250)', marginTop: 40,
        borderBottomColor: 'rgb(220,220,220)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainFeed;
