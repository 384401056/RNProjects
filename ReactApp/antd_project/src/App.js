import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './App.less';
import Header from './components/Header';
import Footer from "./components/Footer";
import NavLeft from './components/NavLeft';
// import 'antd/dist/antd.less';
import './style/common.less';
import Home from './page/home';

import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const { SubMenu } = Menu;
const {
  Content, Sider,
} = Layout;


class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Layout className="container">
          <NavLeft />
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Header />
            <Home />
          </Content>
        </Layout>
        <Layout style={{ textAlign: 'center' }}>
          <Footer />
        </Layout>
      </Layout>



      // <Row className="container">
      //   <Col span="2" className="nav-left">
      //     <NavLeft />
      //   </Col>
      //   <Col span="22" className="main">
      //     <Row>
      //       <Header />
      //     </Row>
      //     <Row className="content">
      //       <Home />
      //     </Row>
      //     <Footer />
      //   </Col>
      // </Row>
    );
  }
}

export default App;
