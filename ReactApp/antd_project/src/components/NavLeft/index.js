import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import menuConfig from './../../resource/menuConfig'
import './index.less'

const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component {

  componentWillMount(){
    const menuTreeNode = this.renderMenu(menuConfig)

    this.setState({
      menuTreeNode
    })
  }


  /**
   * 菜单渲染
   */
  renderMenu = (data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              //递归调用
              this.renderMenu(item.children)
            }
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key}>{item.title}</Menu.Item>
      );
    });
  }


  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Imooc MS </h1>
        </div>
        <div>
          <Menu className="menu"
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            {
              this.state.menuTreeNode
            }
          </Menu>
        </div>
      </div>

    )
  }
}
