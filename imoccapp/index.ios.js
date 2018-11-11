/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Account from './app/account/index';
import Recording from './app/recording/index';
import Creation from './app/creation/index';

export default class imoccApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "creation"
    }
  }

  _renderContent(color, pageText, num) {
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItemIOS
          // title="creation"
          iconName="ios-videocam-outline"
          selectedIconName="ios-videocam"
          selected={this.state.selectedTab === 'creation'}
          onPress={() => {
            this.setState({
              selectedTab: 'creation',
            });
          }}
        >
        <Creation />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          // title="recording"
          iconName="ios-recording-outline"
          selectedIconName="ios-recording"
          selected={this.state.selectedTab === 'ecording'}
          onPress={() => {
            this.setState({
              selectedTab: 'ecording',
            });
          }}
        >
        <Recording />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          // title="account"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account',
            });
          }}
        >
        <Account />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('imoccApp', () => imoccApp);
