import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TopicWrapper,
  TopicItem
} from '../style';

class Topic extends Component {
  render() {
    const { topicList } = this.props;
    const list = topicList.toJS();
    return (
      <TopicWrapper>
        {
          list.map((item) => {
            return (
              //用Link来实现按钮效果及路由跳转。这晨传递了id作为参数
              <Link to={'/detail/'+item.id} key={item.id}>
                <TopicItem>
                  <img alt='' className="topic-pic" src={item.url} />
                  {item.title}
                </TopicItem>
              </Link>
            )
          })
        }
        <TopicItem className="text-only">
          更多热门专题 >
      </TopicItem>
      </TopicWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topicList: state.getIn(["home", "topicList"]),
  }
}

const mapDispatchToProps = (dispatch) => {

  return {};

}
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
