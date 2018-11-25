import styled from 'styled-components';
import logoPic from '../../static/logo.png';

export const HeaderWrapper = styled.div`
  position: relative;
  height:56px;
  max-width: 1440px;
  margin: 0 auto;
  border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.a`
  position: absolute;
  top:0px;
  left:0px;
  display:block;
  height:56px;
  width:100px;
  background: url(${logoPic}); /*背景图*/
  background-size: contain;
`;

export const Nav = styled.div`
  width:960px;
  height:100%;
  margin:0 auto;
  padding-right: 40px;
  box-sizing: border-box;
  /* background:orange; */
`;

export const NavItem = styled.div`
  height: 56px;
  line-height: 26px;
  padding: 15px;
  font-size: 17px;
  color:#333;
  &.left{
    float:left;
  }
  &.right{
    float:right;
    color: #969696;
  }
  &.active {
    color:#ea6f5a;
  }
`;

//用来包裹NavSearch和icon的组件
export const SearchWrapper = styled.div`
  position: relative;
  float: left;
  .iconFont {
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 36px;
    line-height:36px;
    text-align:center;
    border-radius: 18px;
    &.focused{
      background: #777;
      color: #fff;
    }
  }
`;

export const NavSearch = styled.input.attrs({
  placeholder: '搜索',
})`
  width: 140px;
  height: 38px;
  padding: 0 20px;
  margin-top: 9px;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  &::placeholder{
    color: #999;
  }
  &.focused{
    width: 240px;
  }
  /*CSStransition动画的CSS样式, 如果此样式放在上一级组件上不用加 & */
  &.slide-enter{
    transition: all 0.5s ease
  }
  &.slide-enter-active{
    width: 240px;
  }
  &.slide-exit{
    transition: all 0.5s ease
  }
  &.slide-exit-active{
    width: 140px;
  }
`;

export const SearchInfo = styled.div`
  position: absolute;
  left: 0px;
  top: 56px;
  width: 300px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0,0,0, 0.2); /*阴影*/
`;

export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`;

export const SearchInfoSwitch = styled.a`
  float: right;
  font-size: 12px;
  display: block;
  color: #969696;
  .spin {
    display: block;
    float:left;
    font-size: 14px;
    color: #ec6149;
    margin-top: 3px;
    margin-right: 5px;
    text-align: center;
    transition: all 0.5s ease-in; /*过渡效果*/
    transform-origin: center center; /*以自己的中心旋转*/
    transform: rotate(0deg); /*旋转角度*/
  }
`;

export const SearchInfoList = styled.div`
  overflow: hidden;
`;

export const SearchInfoItem = styled.a`
  line-height: 20px;
  padding: 0 5px;
  margin-right: 10px;
  margin-bottom: 15px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #787878;
  display: block;
  float: left;
`;

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`;

export const Button = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.reg{
    color:#ec6149;
  }
  &.write{
    color:#fff;
    background-color: #ec6149
  }
`;