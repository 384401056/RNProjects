import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './App.less';
import Header from './components/Header';
import Footer from "./components/Footer";
import NavLeft from './components/NavLeft';
// import 'antd/dist/antd.less';
import './style/common.less';
import {
    Layout
} from 'antd';
const {
    Content, Sider,
} = Layout;

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAuth: false,
        }
    }

    componentDidMount() {
        this.setState({
            hasAuth: global.constants.checkToken(),
        })
    }


    render() {
        const { hasAuth } = this.state;
        if (hasAuth) {
            return (
                <Layout className="app">
                    <Layout className="admin_wrap">
                        <Sider>
                            <NavLeft />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Header />
                            {/* <Home /> */}
                            {this.props.children}
                        </Content>
                    </Layout>
                    <Layout style={{ textAlign: 'center' }}>
                        <Footer />
                    </Layout>
                </Layout>
            )
        }
        return (
            <div>
                无访问权限
            </div>
        )
    }
}

export default Admin
