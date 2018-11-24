import React, { Component } from 'react';
import Header from './comment/header/Header'
import { GlobalStyle } from "./style"
import { Provider } from 'react-redux';
import store from './store/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <GlobalStyle /> {/**全局样式 */}
          <Header />
        </div>
      </Provider>
    );
  }
}

export default App;
