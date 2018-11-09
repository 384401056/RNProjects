/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {

  //初始化属性值
  constructor(props) {
    super(props);
    this.state = {
      times: 0
    }
  }

  //点击事件
  timesPlus() {
    let newTimes = this.state.times;
    newTimes++;
    this.setState(
      {
        times: newTimes
      }
    );
  }

  //生命周期函数
  componentWillMount(){
    console.log("componentWillMount");
  }

  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus.bind(this)}>
          有本事，你点我啊！
        </Text>
        <Text style={styles.welcome}>
          你点了我{this.state.times}次.
        </Text>
      </View>
    );
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUpdate(){
    console.log("componentWillUpdate");
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
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
