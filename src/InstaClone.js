import React, { Component } from 'react';
// React Native libraries
// import { View, Text, StyleSheet } from 'react-native';
import { MainFeed, Login, Register, Camera, Profile} from './components/screens';
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

const Tabs = createBottomTabNavigator({
    feed: MainFeed,
    camera: Camera,
    profile: Profile,
});

const IntroStack = createStackNavigator({
    login: {screen: Login },
    register: {screen: Register} ,
});

const MainStack = createSwitchNavigator({
    login: IntroStack,
    main: Tabs,

    // login: {screen: Login},
    // main: {screen: Tabs},
});

const AppContainer = createAppContainer(MainStack);

class InstaClone extends Component {
    render(){
        return (
            // <Login />
            <AppContainer />
        );
    }
}

export default InstaClone;
