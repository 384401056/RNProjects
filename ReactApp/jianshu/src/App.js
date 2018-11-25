import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { GlobalStyle } from "./style";

import Header from './components/header/Header';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import store from './store/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <GlobalStyle /> {/**全局样式 */}
          <Header /> {/**头部组件 */}

          {/** 路由组件 */}
          <BrowserRouter>
            <div>
              {/** 路由规则 */}
              <Route path="/" exact component={Home} />
              <Route path="/detail" exact component={Detail}/>
            </div>
          </BrowserRouter>

        </div>
      </Provider>
    );
  }
}

export default App;
