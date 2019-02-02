import React, { Component } from 'react';
import List from './components/List';
import Recommend from './components/Recommend';
import Topic from './components/Topic';
import Write from './components/Write';
import { connect } from 'react-redux';
import { actionCreator } from './store'
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style';

class Home extends Component {
  render() {
    const { showScrollBtn, detialData } = this.props;
    return (
      <HomeWrapper>
        <HomeLeft>
          <img alt="" className="banner-img" src="http://dummyimage.com/625x270/b779f2" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Write />
        </HomeRight>
        {
          /**判断是否显示回到顶部的按钮 */
          showScrollBtn ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
        }

      </HomeWrapper>
    )
  }

  handleScrollTop() {
    window.scrollTo(0, 0); //回到顶部
  }

  //当窗口滚动时，执行changeScrollTopShow方法.
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow);
  }

  componentDidMount() {
    this.props.getHomeInfo();
    this.bindEvents(); //绑定一个事件
  }

  //当组件要被销毁时，解除绑定事件
  componentWillMount(){
    window.removeEventListener('scroll', this.props.changeScrollTopShow);
  }

}

const mapStateToProps = (state) => {
  return {
    showScrollBtn: state.getIn(['home', 'showScrollBtn']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHomeInfo() {
      dispatch(actionCreator.getHomeInfo());
    },

    changeScrollTopShow(e) {
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 300) {
        //显示按钮
        dispatch(actionCreator.showScrollBtn(true));
      } else {
        //隐藏按钮
        dispatch(actionCreator.showScrollBtn(false));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
