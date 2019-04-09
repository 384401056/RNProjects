import React, { Component } from 'react'
import { Row, Col, Layout } from 'antd'
import './index.less'
import axios from 'axios';
import utils from '../../utils/utils';

export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName:'', //用户名
      sysTime:'', //系统时间
    };
  }

  componentWillMount() {
    this.setState({
      userName: '河畔一角'
    })

    //发送post请求。
    // let fd = new FormData();
    // fd.append('addressCode', "rl");
    // fd.append('userName', "gaoyb");
    // fd.append('password', "1");
    // axios({
    //   method: 'post',
    //   url: '/user/login',
    //   data: fd,
    //   headers: {'Content-Type': 'application/json;charset=UTF-8',}
    // }).then((res)=>{
    //   console.log(res.data);
    // });

    //定时获取系统时间
    setInterval(() => {
      let currentTime = utils.formatDate(new Date());
      this.setState({
        sysTime:currentTime
      })
    }, 1000);

  }

  render() {
    return (
      <Layout className="header">
        <Row className="header-top">
          <Col span={20}>
            <span>欢迎, {this.state.userName}</span>
          </Col>
          <Col span={4}>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4}>
            {/* 首页 */}
          </Col>
          <Col span={20} className="breadcrumb-weather">
            <span style={{paddingRight:20}}>{this.state.sysTime}</span>
            <span>晴转多云 18-20度</span>
          </Col>
        </Row> 
      </Layout>
    )
  }
}
