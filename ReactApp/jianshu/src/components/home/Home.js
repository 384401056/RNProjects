import React, { Component } from 'react';
import List from './components/List';
import Recommend from './components/Recommend';
import Topic from './components/Topic';
import Write from './components/Write';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
} from './style';

class Home extends Component {
  render() {
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
      </HomeWrapper>
    )
  }
}

export default Home;
