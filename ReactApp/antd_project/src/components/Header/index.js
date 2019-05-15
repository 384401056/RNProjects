import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Dropdown, Icon, Input, Button, Modal, Spin, Form, message } from 'antd'
import { withRouter } from 'react-router-dom';
import './index.less'
import axios from 'axios';
import utils from '../../utils/utils';
import md5 from 'md5'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '', //用户名
      sysTime: '', //系统时间
      visible: false,
      loading: false,
      validateList: [],
      formData: {
        oldPassword: '',
        newPassword: '',
        repPassword: '',
      }
    };
  }

  componentWillMount() {
    this.setState({
      userName: JSON.parse(sessionStorage.getItem("userInfo")).name,
    })

    //定时获取系统时间
    setInterval(() => {
      let currentTime = utils.formatDate(new Date());
      this.setState({
        sysTime: currentTime
      })
    }, 1000);

  }

  /**
   * 当props的值改变时，调用此方法。同时setState()也会调用此方法。
   */
  componentDidUpdate(prevProps) {
    //清空上次输入的内容。
    if (!this.state.visible) {
      this.clearFormData();
      this.state.validateList = [];//清空验证信息
    }
  }


  /**
   * 清空上次填写的内容。
   */
  clearFormData = () => {
    this.state.formData = {
      oldPassword: '',
      newPassword: '',
      repPassword: '',
    }
  }



  /**
   * 退出登录
   */
  loginOut = () => {
    sessionStorage.clear();
    //这里注意，将整个给组件做为withRouter的参数导出。才能使用history。
    this.props.history.push("/")
  }

  changePwd = () => {
    this.setState({
      visible: true,
    })
  }

  /**
   * 修改密码确认按钮
   */
  handleOk = () => {
    console.log("formData:", this.state.formData);
    if (!this.passwordValidate(this.state.formData)) {
      return;
    }
    let fd = new FormData();
    fd.append('userJson', sessionStorage.getItem("userInfo"));
    fd.append("oldPwd", md5(this.state.formData.oldPassword));
    fd.append("newPwd", md5(this.state.formData.newPassword));
    console.log("formData", fd);
    this.request("/user/changePwd", fd)
  }

  /**
   * 修改密码取消按钮
   */
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  request = (url, data) => {
    axios({
      method: 'post',
      url: global.constants.url + url,
      data: data,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        message.success(res.data.msg);
        this.setState({
          visible: false
        });
      } else {
        message.error(res.data.msg);
      }
      this.setState({
        loading: false,
      });
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({
        visible: false,
        loading: false,
      });
    });
  }


  /**
   * 确认密码框，失去焦点后的事件。
   */
  pwdOnBlurValidate = (e) => {
    console.log("pwdOnBlurValidate", e.target.value)
    if (e.target.value !== this.state.formData.newPassword) {
      this.state.validateList[2] = {
        validateStatus: "error",
        help: "两次输入的密码不相同!"
      }
    } else {
      this.state.validateList[2] = {}
    }

    this.setState({
      validateList: this.state.validateList,
    })
  }

  /**
     * 输入校验
     */
  passwordValidate = (tempFormData) => {
    console.log("userValidate", tempFormData)
    this.state.validateList = [];//清空验证信息
    let result = true;
    let vd = this.state.validateList;
    if (tempFormData.newPassword === "") {
      vd[0] = {
        validateStatus: "error",
        help: "请输入原始密码"
      }
      result = false;
    }
    if (tempFormData.newPassword === "") {
      vd[1] = {
        validateStatus: "error",
        help: "请输入新密码"
      }
      result = false;
    }

    if (tempFormData.repPassword === "") {
      vd[2] = {
        validateStatus: "error",
        help: "请确认新密码!"
      }
      result = false;
    } else if (tempFormData.repPassword !== tempFormData.newPassword) {
      vd[2] = {
        validateStatus: "error",
        help: "两次输入的密码不相同!"
      }
      result = false;
    }

    this.setState({
      validateList: vd,
    })
    return result;
  }

  render() {
    //用户菜单
    const userMenu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.changePwd}>修改密码</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.loginOut}>退出登录</a>
        </Menu.Item>
      </Menu>
    );

    const { validateList } = this.state;

    return (
      <Layout className="header">
        <Row className="header-top">
          <Col span={24}>
            <span className="h_welcome">
              欢迎,
            </span>
            <span className="h_welcome">
              {this.state.userName}
            </span>
            <Dropdown overlay={userMenu} trigger={['hover']}>
              <Button style={{ borderWidth: '0px' }} shape="circle" size="large">
                <Icon type="unordered-list" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4}>
            {/* 首页 */}
          </Col>
          <Col span={20} className="breadcrumb-weather">
            <span style={{ paddingRight: 20 }}>{this.state.sysTime}</span>
            {/* <span>晴转多云 18-20度</span> */}
          </Col>
        </Row>

        <Modal
          title="用户密码修改"
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.handleOk}
          loading={this.state.loading}
          onCancel={this.handleCancel}>
          <Spin spinning={this.state.loading}>
            <Form {...formItemLayout}>
              <Form.Item label="原始密码" {...validateList[0]} required={true}>
                <div>
                  <Input.Password placeholder="请输入原始密码" maxLength={16} onChange={(e) => {
                    let tempFormData = this.state.formData;
                    tempFormData.oldPassword = e.target.value;
                    this.setState({
                      formData: tempFormData
                    })
                  }} value={this.state.formData.oldPassword} />
                </div>
              </Form.Item>
              <Form.Item label="新密码" {...validateList[1]} required={true}>
                <div>
                  <Input.Password placeholder="请输入新密码" maxLength={16} onChange={(e) => {
                    let tempFormData = this.state.formData;
                    tempFormData.newPassword = e.target.value;
                    this.setState({
                      formData: tempFormData
                    })
                  }} value={this.state.formData.newPassword} />
                </div>
              </Form.Item>
              <Form.Item label="确认新密码" {...validateList[2]} required={true}>
                <div>
                  <Input.Password placeholder="请确认新密码" maxLength={16}
                    onBlur={this.pwdOnBlurValidate}
                    onChange={(e) => {
                      let tempFormData = this.state.formData;
                      tempFormData.repPassword = e.target.value;
                      this.setState({
                        formData: tempFormData
                      })
                    }} value={this.state.formData.repPassword} />
                </div>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </Layout>
    )
  }
}

export default withRouter(Header);
