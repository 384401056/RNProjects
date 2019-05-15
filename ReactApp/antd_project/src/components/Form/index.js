import React, { Component } from 'react'
import './index.less';
import {
    Form, Icon, Input, Button, message
} from 'antd'

import '../../commont/config'
import axios from 'axios'
import md5 from 'md5'
import ImageCode from '../ImageCode';
import '../../commont/config'
import {withRouter} from "react-router-dom";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            accout: "",
            password: "",
            codeStatus: false,
            formValue: {},
            images: [
                'http://47.107.243.224:8010/e682140d7f0911ecef3cc8050e6c05e1?w=500&h=300',
                'http://47.107.243.224:8010/4f915ea1f32de33554a63e11273234c7?w=500&h=300',
                'http://47.107.243.224:8010/b83bb1efb060f9c0541aa9eb34b9573b?w=500&h=300',
                'http://47.107.243.224:8010/b2edb240fbc4abee9a6569fd986c19d0?w=500&h=300',
                'http://47.107.243.224:8010/d089b024bb1784b0276feadb5a5cc47d?w=500&h=300',
                'http://47.107.243.224:8010/c4591bc5ad129998b8c9192b702e9354?w=500&h=300',
                'http://47.107.243.224:8010/0a61b425b88e56658de5dc75bf6b84cd?w=500&h=300',
                'http://47.107.243.224:8010/ac96921907a6614d16ebd11711e21cc2?w=500&h=300',
                'http://47.107.243.224:8010/fb0f360bc922e0b80cc8533b9e651570?w=500&h=300',
                'http://47.107.243.224:8010/bba91989bd17756283954e17637d7a2e?w=500&h=300'
            ]
        }
    }

    componentDidMount() {
        this.setState({ url: this.getImage() })
    }

    getImage = () => {
        let i = Math.floor(Math.random() * 10)
        return this.state.images[i];
    }

    onReload = () => {
        this.setState({
            url: this.getImage()
        })
    }

    /**
     * 单据提交按钮事件
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.setState({
                    codeStatus: true,
                    formValue: values,
                })
            }
        });
    }

    imageCodeOnMatch=()=>{
        //发送post请求。
        let fd = new FormData();
        fd.append('userName', this.state.formValue.userName);
        let mdtPwd = md5(this.state.formValue.password);
        fd.append('password', mdtPwd);
        axios({
            method: 'post',
            url: global.constants.url + '/user/login',
            data: fd,
            headers: { 'Content-Type': 'application/json;charset=UTF-8', }
        }).then((res) => {
            if (res.data.code === 0) {
                //存储用户登录信息到sessionStorage
                sessionStorage.setItem("permissions", JSON.stringify(res.data.data.permissions))
                sessionStorage.setItem("route", JSON.stringify(res.data.data.route))
                sessionStorage.setItem("token", JSON.stringify(res.data.data.token))
                sessionStorage.setItem("userInfo", JSON.stringify(res.data.data.userInfo))
                //这里注意，将整个给组件做为withRouter的参数导出。才能使用history。
                this.props.history.push("/admin/home")
            } else {
                message.error(res.data.msg);
                this.setState({
                    codeStatus:false,
                })
            }
        }).catch((err)=>{
            console.log(err)
                this.setState({
                    codeStatus:false,
                })
                message.error("登录失败,请检查网络配置!");
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { codeStatus } = this.state;
        return (
            codeStatus ?
                <div className="login-imagecode">
                    <ImageCode
                        imageUrl={this.state.url}
                        onReload={this.onReload}
                        onMatch={this.imageCodeOnMatch}
                    />
                </div>
                :
                <div className = "login-formclass">
                    <div className="login-title">
                        <div>若邻云后台管理系统</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input ref={(input) => { this.accoutInput = input.value; }} maxLength={16}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '新输入密码!' }],
                        })(
                            <Input ref={(input) => { this.passwordInput = input.value; }} maxLength={16}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
        )
    }
}

const WrappedRegistrationForm = Form.create()(LoginForm);

export default withRouter(WrappedRegistrationForm);
