import React, { Component } from 'react'
import { Menu, Icon, Row } from 'antd'
import menuConfig from './../../resource/menu'
import './index.less'
import Sider from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component {

  componentWillMount() {
    const menuTreeNode = this.renderMenu(menuConfig)

    this.setState({
      menuTreeNode
    })
  }
  /**
   * 菜单渲染
   */
  renderMenu = (data) => {
    return data.map((item) => {
      //如果有子菜单就递归
      if (item.children) {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              //递归调用
              this.renderMenu(item.children)
            }
          </SubMenu>
        );
      }
      //如果没有，就返回。
      return (
        <Menu.Item key={item.key}>
          <Link to = {"/admin"+item.key}>
            <span><Icon type={item.icon} /><span>{item.title}</span></span>
          </Link>
        </Menu.Item>
      );
    });
  }


  render() {
    return (
      <Sider>
        <div className="logo">
          <Row>
            <img src="/assets/logo-ant.svg" alt="" />
          </Row>
          <Row>
            <h1>若邻云报销管理后台</h1>
          </Row>
        </div>
        <div>
          <Menu className="menu"
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light">
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </Sider>
    )
  }
}
