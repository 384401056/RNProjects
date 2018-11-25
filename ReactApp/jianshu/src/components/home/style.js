import styled from 'styled-components';

export const HomeWrapper = styled.div`
  overflow: hidden;
  margin: 0 auto;
  width: 960px;
`;

export const HomeLeft = styled.div`
  float: left;
  width: 625px;
  margin-left: 15px;
  padding-top: 30px;
  /* background: orange; */
  .banner-img {
    width: 625px;
    height: 270px;
    border-radius: 7px;
  }
`;

export const HomeRight = styled.div`
  float: right;
  padding-top: 30px;
  width: 260px;
  background: pink;
`;


/** ================Topic组件下的样式组件====================== */
export const TopicWrapper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -20px;
`;

export const TopicItem = styled.div`
  float: left;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #000;
  padding-right: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
  background: #f7f7f7;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .topic-pic{/*TopicItem的子级样式*/
    float: left;
    display: block;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 3px 0 0 3px;
  }
  &.text-only{ /*TopicItem的同级样式*/
    cursor: pointer;
    border: 0px;
    background: #fff;
    color: #aaa;
  }
`;

/** ================List组件下的样式组件====================== */