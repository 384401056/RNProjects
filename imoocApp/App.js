/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Son from './component/Son';

export default class App extends Component {

  //初始化属性值
  constructor(props) {
    super(props);
    this.state = {
      times: 0,
      hit: false
    }
  }

  //点击事件
  timesPlus() {
    let newTimes = this.state.times;
    newTimes++;
    this.setState(
      {
        hit: true,
        times: newTimes
      }
    );
  }

  //重置times数量
  timesClear() {
    console.log("App Click");
    this.setState(
      {
        times: 0
      }
    );
  }

  //生命周期函数
  componentWillMount() {
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
        {
          //根据hit值决定是否显示子组件.同设置传递给子组件的属性值。
          //这里传递了状态值和方法.传的方法加了.bind(this),是因为此方法在子类中执行时,方法中的this关键字，作用域变了.加了就不会变.
          this.state.hit ? <Son times={this.state.times} click={this.timesClear.bind(this)}/> : null
        }
      </View>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
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
