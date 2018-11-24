import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { actionCreator } from './store';
import {
  HeaderWrapper,
  Logo,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList,
  Nav,
  NavItem,
  NavSearch,
  SearchWrapper,
  Addition,
  Button
} from './style';


class Header extends Component {

  constructor(props){
    super(props);

    this.handleInputFocus = this.props.handleInputFocus.bind(this);
    this.handleInputBlur = this.props.handleInputBlur.bind(this)
  }

  showSearchArea() {
    if (this.props.focused) {
      return (
        <SearchInfo>
          <SearchInfoTitle>
            热门搜索
                  <SearchInfoSwitch>
              换一换
                  </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              this.props.searchList.map((item, index) => {
                // console.log("item-id:", item.get("id"));
                // console.log("item-name:", item.get("name"));
                // console.log("index:", index);
                //由于此时的searchList是不可变对象列表，所以要用不可变对象的取值方法。
                return <SearchInfoItem key={item.get("id")}>{item.get("name")}</SearchInfoItem>
              })
            }
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

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
            <SearchWrapper>
              <CSSTransition
                timeout={300}
                in={this.props.focused}
                classNames="slide"
              >
                <NavSearch
                  className={this.props.focused ? 'focused' : ''}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}>
                </NavSearch>
              </CSSTransition>
              <Icon className={this.props.focused ? 'focused iconFont' : 'iconFont'} type="search" style={{ fontSize: '15px', marginLeft: '5px' }} />
              {this.showSearchArea()}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.header.focused,//这里要指明header。因为这里的state是全局的

    // focused: state.get('header').get('focused'),
    focused: state.getIn(['header', 'focused']),//功能同上。
    searchList: state.getIn(["header", "searchList"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      //如果searchListk中还没值，就先获取.不会重复获取.
      if (this.props.searchList.size === 0) {
        dispatch(actionCreator.getSearchList());
      }
      dispatch(actionCreator.searchFocus());
    },

    handleInputBlur() {
      dispatch(actionCreator.searchBlur());
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);