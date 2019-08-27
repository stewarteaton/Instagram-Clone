/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import InstaClone from './src/InstaClone.js';

export default class App extends Component {
  render(){
    return (
        <InstaClone />
    );
  }
}


