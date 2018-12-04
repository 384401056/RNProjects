import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import {
  DetailWrapper,
  Header,
  Content
} from './style';

class Detail extends Component {
  render() {
    const { articleDesc } = this.props;
    const item = articleDesc.toJS();
    console.log("artcleDesc:",item);
    return (
      <DetailWrapper>
        <Header>{item.title}</Header>
        <Content dangerouslySetInnerHTML={{__html: item.content}} />
      </DetailWrapper>
    )
  }

  componentDidMount(){
    this.props.getArticleDesc();
  }
}

const mapStateToProps = (state) =>{
  return {
    articleDesc: state.getIn(['detail', 'articleDesc']),
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {

    getArticleDesc(){
      dispatch(actionCreator.getArticleDesc());
    }

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Detail);