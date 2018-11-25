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

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  showSearchArea() {
    const { focused, mouseIn, handlerMouseIn, handlerMouseLeave, handlerChangePage, searchList, page } = this.props;//解构赋值后的方法，使用箭头函数后让this指向丢失.所以要用bind(this)
    const newSearchList = searchList.toJS(); //toJS将一个不可变对象转为JS对象
    const searchInfoList = [];

    //循环遍历获取到的数据，进行分页显示，每页10条
    if (newSearchList.length) {
      let totalPage = newSearchList.length;
      let lastPage = Math.ceil(totalPage / 10)
      let lastIndex = page * 10; //最后一条的index

      if (page === lastPage) { //如果当前页是最后一页
        lastIndex = totalPage;
      }
      for (let i = (page - 1) * 10; i < lastIndex; i++) {
        searchInfoList.push(
          <SearchInfoItem key={newSearchList[i].id}>{newSearchList[i].name}</SearchInfoItem>
        )
      }
    }

    //当搜索获得焦点，或者鼠标已经进入面板时显示
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handlerMouseIn.bind(this)}
          onMouseLeave={handlerMouseLeave.bind(this)}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={handlerChangePage.bind(this, page, newSearchList.length)}>
              {/**下在的 <i> 是 Antd的 <Icon> 在html中的真实代码，因为Antd不能用 ref，所以才这样做 */}
              <i ref={this.myRef} className="anticon anticon-sync spin">
                <svg viewBox="64 64 896 896" className="" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z">
                  </path>
                </svg>
              </i>
              换一换
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              // newSearchList.map((item, index) => {
              //   //如果searchList是不可变对象列表，要要用不可变对象的取值方法。
              //   // return <SearchInfoItem key={item.get("id")}>{item.get("name")}</SearchInfoItem>
              //   return <SearchInfoItem key={item.id}>{item.name}</SearchInfoItem>
              // })
              searchInfoList
            }
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, searchList } = this.props; //解构赋值后的函数，使用箭头函数的方式调用，后让this指向丢失.
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
                in={focused}
                classNames="slide"
              >
                <NavSearch
                  className={focused ? 'focused' : ''}
                  onFocus={()=>handleInputFocus(searchList)}//带参数要用箭头函数.
                  onBlur={handleInputBlur}
                >
                </NavSearch>
              </CSSTransition>
              <Icon className={focused ? 'focused iconFont' : 'iconFont'} type="search" style={{ fontSize: '15px', marginLeft: '5px' }} />
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
    mouseIn: state.getIn(["header", "mouseIn"]),
    page: state.getIn(["header", "page"]),
    // totalPage: state.getIn(["header", "totalPage"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(searchList) {
      // console.log(searchList);
      //如果searchListk中还没值，就先获取.不会重复获取.
      if (searchList.size === 0) {
        dispatch(actionCreator.getSearchList());
      }
      dispatch(actionCreator.searchFocus());
    },

    handleInputBlur() {
      // console.log(this);
      dispatch(actionCreator.searchBlur());
    },

    handlerMouseIn() {
      // console.log(this);
      dispatch(actionCreator.mouseIn());
    },

    handlerMouseLeave() {
      // console.log(this);
      dispatch(actionCreator.mouseLeave());
    },

    handlerChangePage(currentPage, totalPage) {
      /**通过代码实现旋转动画效果 */
      const spin = this.myRef.current;//通过ref获取DOM元素
      let angle = spin.style.transform.replace(/[^0-9]/ig, '');//获取CSS样式的旋转角度值
      if(angle){
        angle = parseInt(angle, 10);//转为int
      }else{
        angle = 0;
      }
      spin.style.transform = 'rotate('+ (angle+360) +'deg)';//在原来的角度上加360度.


      //如果当前页是最后一页,则返回第一页
      if (currentPage === Math.ceil(totalPage / 10)) {
        dispatch(actionCreator.changePage(1));
      } else {
        dispatch(actionCreator.changePage(currentPage + 1));
      }
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);