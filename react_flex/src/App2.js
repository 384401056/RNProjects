import React, { Component } from 'react';

class App2 extends Component {

  render() {

      function testClick() {
          alert("测试事件...");
      }

      return (
          <div>
              <div style={{color: "#ff0000", fontSize: "30px"}}>React 语法基础</div>
              <h2>React Native 事件</h2>
              <button style={{color: "#ff0000"}} onClick={testClick.bind(this)}>点击我</button>
          </div>
      );
  }

}

export default App2;
