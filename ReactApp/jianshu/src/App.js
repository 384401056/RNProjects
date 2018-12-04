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
          {/** 路由组件 */}
          <BrowserRouter>
            <div>
              <Header /> {/**头部组件 */}
              {/** 路由规则 */}
              <Route path="/" exact component={Home} />
              {/**这是一个可以带参数的路由，可匹配：/detail/132132, 在Detail组件中 params: {id: "132132"}  */}
              <Route path="/detail/:id" exact component={Detail}/>
            </div>
          </BrowserRouter>

        </div>
      </Provider>
    );
  }
}

export default App;
