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