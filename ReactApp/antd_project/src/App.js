import React, { Component } from 'react';
import { Button, Input } from 'antd';
import './App.less';
// import 'antd/dist/antd.less';

class App extends Component {
  render() {
    return (
      <div className="content">
        Hello Reat！！！
        <Button>点击我</Button>
        <Input></Input>
      </div>
    );
  }
}

export default App;
