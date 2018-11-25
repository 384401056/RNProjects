import React, { Component } from 'react'
import { connect } from 'react-redux';
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
              <TopicItem key={item.id}>
                <img className="topic-pic" src={item.url} />
                {item.title}
              </TopicItem>
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
