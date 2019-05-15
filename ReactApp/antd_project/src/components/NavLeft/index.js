import React, { Component } from 'react'
import { Menu, Icon, Row } from 'antd'
import './index.less'
import Sider from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component {

  constructor(props){
    super(props);
    this.state = {
      menuTreeNode:null,
    }
  }


  componentDidMount() {
    //将JSON字符串转为对象.
    let menuList = JSON.parse(sessionStorage.getItem("permissions"));
    console.log(menuList);
    const menuTreeNode = this.renderMenu(menuList);
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
          <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {
              //递归调用
              this.renderMenu(item.children)
            }
          </SubMenu>
        );
      }
      //如果没有，就返回。
      return (
        <Menu.Item key={item.id}>
          <Link to = {"/admin"+item.url}>
            {
              item.icon?<span><Icon type={item.icon} /><span>{item.name}</span></span>
              :
              <span>{item.name}</span>
            }
            
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
            <h1>若邻云管理后台</h1>
          </Row>
        </div>
        <div>
          <Menu className="menu"
            onClick={this.handleClick}
            mode="inline"
            theme="light">
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </Sider>
    )
  }
}
