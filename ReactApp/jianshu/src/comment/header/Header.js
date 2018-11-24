import React from 'react'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import actionCreator from '../../store/actionCreator'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchWrapper,
  Addition,
  Button
} from './style';


const Header = (props) => {
  return (
    <div>
      <HeaderWrapper>
        <Logo href='/' />
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">Aa</NavItem>
          <SearchWrapper>
            <CSSTransition
              timeout={300}
              in={props.focused}
              classNames="slide"
            >
              <NavSearch
                className={props.focused ? 'focused' : ''}
                onFocus={props.handleInputFocus}
                onBlur={props.handleInputBlur}>
              </NavSearch>
            </CSSTransition>
            <Icon className={props.focused ? 'focused iconFont' : 'iconFont'} type="search" style={{ fontSize: '15px', marginLeft: '5px' }} />
          </SearchWrapper>
          <Addition>
            <Button className="write">
              <Icon type="edit" style={{ fontSize: '20px', marginRight: '5px' }} />
              写文章
            </Button>
            <Button className="reg">注册</Button>
          </Addition>
        </Nav>
      </HeaderWrapper>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    focused: state.focused,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      const action = {
        type:"search_focus",
        value: true
      }
      dispatch(action);
    },

    handleInputBlur() {
      const action = {
        type: "search_blur",
        value: false
      }
      dispatch(action);
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);