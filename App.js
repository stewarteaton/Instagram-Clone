/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import InstaClone from './src/InstaClone.js';
import store from './src/redux/stores/index.js';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    // Wrap app in redux store
    return (
      <Provider store={store}>
        <InstaClone />
      </Provider>
      // <InstaClone />
    );
  }
}
