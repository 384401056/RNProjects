import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListItem, ListInfo, LoadMore } from '../style';
import { Link } from 'react-router-dom';
import { actionCreator } from '../store/'

class List extends Component {

  render() {
    const { showMoreBtn, articleList, currentPage } = this.props;
    const list = articleList.toJS();
    return (
      <div>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.id}>
                <Link to={'/detail/' + item.id}>
                  <img alt='' className='pic' src={item.imgUrl} />
                </Link>
                <ListInfo>
                  <Link to={'/detail/' + item.id} key={item.id}>
                    <div className='title'>{item.title}</div>
                  </Link>
                  <div className='desc'>{item.desc}</div>
                </ListInfo>
              </ListItem>
            )
          })
        }
        {
          showMoreBtn ?
            <LoadMore onClick={this.props.getMoreList.bind(this,currentPage)}>
              加载更多
          </LoadMore> : null
        }

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    showMoreBtn: state.getIn(['home', 'showMoreBtn']),
    currentPage: state.getIn(['home', 'currentPage']),//获取当前页码
    articleList: state.getIn(['home', 'articleList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    //加载更多的按钮事件
    getMoreList(currentPage) {
      dispatch(actionCreator.getMoreList(currentPage+1));//传递要获取的页码
      //如果数据条数超过100条就隐藏"加载更多"的按钮.
      if (this.props.articleList.size >= 90) {
        dispatch(actionCreator.hiddenMoreBtn());
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
