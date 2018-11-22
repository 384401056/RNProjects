import React, { Component} from 'react';
import Header from './comment/header/Header'
import { GlobalStyle } from "./style"
class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle /> {/**全局样式 */}
        <Header />
      </div>
    );
  }
}

export default App;
