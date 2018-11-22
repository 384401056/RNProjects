import React, { Component } from 'react'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button
} from './style';

import {
  Icon
} from 'antd';

class Header extends Component {
  render() {
    return (
      <div>
        <HeaderWrapper>
          <Logo href='/' />
          <Nav>
            <NavItem className="left active">首页</NavItem>
            <NavItem className="left">下载App</NavItem>
            <NavItem className="right">登录</NavItem>
            <NavItem className="right">Aa</NavItem>
            <NavSearch></NavSearch><Icon type="search" style={{fontSize:'15px', marginLeft:'5px'}}/>
            <Addition>
              <Button className="write">
                <Icon type="edit" style={{fontSize:'20px', marginRight:'5px'}}/>
                写文章
              </Button>
              <Button className="reg">注册</Button>
            </Addition>
          </Nav>
        </HeaderWrapper>
      </div>
    )
  }
}

export default Header