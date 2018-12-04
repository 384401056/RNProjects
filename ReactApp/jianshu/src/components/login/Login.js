import React, { Component } from 'react'
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Redirect } from 'react-router-dom';
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button,
} from './style';

class Login extends Component {


  render() {
    const { isLogin } = this.props;
    //判断如果登录成功，就用返回Redirect重定向组件，转到首页.
    if (isLogin) {
      return (<Redirect to="/" />);
    } else {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="账号" ref={(input) => { this.accoutInput = input; }} />
            <Input placeholder="密码" ref={(input) => { this.passwordInput = input; }} />
            <Button onClick={() => { this.props.login(this.accoutInput.value, this.passwordInput.value) }}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.getIn(["login", "login"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(accoutInput, passwordInput) {
      if (accoutInput !== '' && passwordInput !== '') {
        dispatch(actionCreator.login(accoutInput, passwordInput));
      } else {
        console.log("输入不能为空");
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
