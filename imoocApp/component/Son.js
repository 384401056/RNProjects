/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Son extends Component {

  //初始化属性值
  constructor(props) {
    super(props);
    this.state = {
      sonTimes: 0
    }
  }

  //生命周期函数
  componentWillMount() {
    console.log("Son componentWillMount");
  }

    //点击子组件时，执行的方法，这里执行的是props中传过来的方法
    click(){
      this.props.click();
    }

  render() {
    console.log("Son render");
    return (
      <View>
        <Text style={styles.welcome} onPress={this.click.bind(this)}>
          我是一个子组件....{this.state.sonTimes}
        </Text>
      </View>
    );
  }

  //接收到新的属性值时，执行此方法
  componentWillReceiveProps(newProps) {
    console.log("Son componentWillReceiveProps")
    console.log(newProps);
    //将子组件的状态值sonTimes修改为父组件传过来的值.
    this.setState({
      sonTimes: newProps.times
    })
  }

  componentDidMount() {
    console.log("Son componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("Son shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    console.log("Son componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("Son componentDidUpdate");
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
