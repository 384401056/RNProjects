/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Account from './app/account/index';
import Recording from './app/recording/index';
import Creation from './app/creation/index';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "creation"
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItemIOS
          // title="creation"
          iconName="ios-videocam"
          selected={this.state.selectedTab === 'creation'}
          onPress={() => {
            this.setState({
              selectedTab: 'creation',
            });
          }}>
          {/* <View style={styles.container}>
            <Text style={styles.instructions} onPress={}>Hello world</Text>
          </View> */}
        <Creation navigate={this.props.navigation}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          // title="recording"
          iconName="ios-recording"
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
          iconName="ios-person"
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
