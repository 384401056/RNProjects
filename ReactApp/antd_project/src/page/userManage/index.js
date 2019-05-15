import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
  Row, Spin, Button, Table, Modal, Tag, message, Switch,
} from 'antd';
import CreateUserForm from '../../components/CreateUserForm'
import EditUserForm from '../../components/EditUserForm'
import axios from 'axios'
import md5 from 'md5'

const confirm = Modal.confirm;
export default class UserAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {
        defaultCurrent: 1,
        currentPage: 0,
        pageSize: 0,
        total: 0
      },
      moduleList: [],
      ncAddressList: [],
      roleList: [],
      hasAuth: false,
      createVisible: false,
      createLoading: false,
      editVisible: false,
      editLoading: false,
      loading: false,
      treeSelectvalue: "",
      formData: {
        name: "",
        username: "",
        password: "",
        rpwd: "",
        mobile: "",
        email: "",
        ncId: "",
        isEnable: true,
        roleIds: [],
        //选择的模块列表
        moduleIds: []
      },
      data: [],
      columns: [{
        title: '用户名',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      }, {
        title: '登录名',
        align: 'center',
        dataIndex: 'username',
        key: 'username',
        width: '10%',
      }, {
        title: 'NC客户名',
        align: 'center',
        dataIndex: 'ncName',
        width: '10%',
        key: 'ncName',
      },
      {
        title: '角色',
        align: 'center',
        dataIndex: 'roleList',
        width: '10%',
        render: (text, record) => {
          return (
            (record.roleList) ?
              record.roleList.map((item) => (
                <Tag color="orange" key={item.id}>{item.name}</Tag>
              ))
              : null
          )
        }
      },
      {
        title: '是否启用',
        align: 'center',
        dataIndex: 'isenable',
        width: '10%',
        key: 'isenable',
        render: (text, record) => {
          return (record.isenable == 1 ? <span>启用</span> : <span>停用</span>)
        }
      }, {
        title: '已授权模块',
        align: 'center',
        dataIndex: 'moduleList',
        width: '25%',
        render: (text, record) => {
          return (
            (record.moduleList) ?
              record.moduleList.map((item) => (
                (item.type == 0) ?
                  <Tag color="blue" key={item.id}>{item.moduleName}</Tag>
                  : <Tag color="green" key={item.id}>{item.moduleName}</Tag>
              ))
              : null
          )
        }
      }, {
        title: "操作",
        align: 'center',
        width: '25%',
        key: '',
        render: (text, record) => {
          return (
            (record.ncId) ?
              <div>
                <Button className="ua_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                <Button className="ua_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
                <Button className="ua_editBtn" onClick={this.resetPwd.bind(this, record)}>重置密码</Button>
              </div>
              : null
          );
        },
      }
      ]
    }
  }



  componentDidMount() {
    this.setState({
      hasAuth: global.constants.checkPermission("/manager/setRole"),
    })
    this.getUserList(this.state.pageInfo.defaultCurrent);
    this.getModuleListNoPage();
    this.getNcAddressListNoPage();
    this.getRoleListNoPage();
  }


  /**
   * 获取用户列表
   */
  getUserList = (pageNum) => {
    this.setState({ loading: true, })
    let fd = new FormData();
    fd.append('pageindex', pageNum);
    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/user/list',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        //返回的分页信息和数据
        let tempPageInfo = this.state.pageInfo;
        tempPageInfo.currentPage = res.data.data.pageNum;
        tempPageInfo.pageSize = res.data.data.pageSize;
        tempPageInfo.total = res.data.data.total;
        console.log("getUserList", res.data.data.list);
        this.setState({
          pageInfo: tempPageInfo,
          data: res.data.data.list,
        })
      } else {
        message.error(res.data.msg);
      }
      this.setState({ loading: false, })
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({ loading: false, })
    });
  }


  /**
     * 获取不分页的模块列表(所有)
     */
  getModuleListNoPage = () => {
    let fd = new FormData();
    fd.append('pageindex', 0);
    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/module/list',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        // message.success(res.data.msg);
        console.log("getModuleListNoPage", res.data.data);
        this.setState({
          moduleList: res.data.data
        })
      } else {
        message.error(res.data.msg);
      }
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
    });
  }


  /**
   * 获取不分页的NcAddreess
   */
  getNcAddressListNoPage = () => {
    let fd = new FormData();
    fd.append('pageindex', 0);
    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/ncManage/list',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        // message.success(res.data.msg);
        console.log("getNcAddressListNoPage", res.data.data);
        this.setState({
          ncAddressList: res.data.data
        })
      } else {
        message.error(res.data.msg);
      }
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
    });
  }

  /**
   * 获取角色列表
   */
  getRoleListNoPage = () => {
    let fd = new FormData();
    fd.append('pageindex', 0);
    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/role/list',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        console.log("getRoleListNoPage:", res.data.data);
        this.setState({
          roleList: res.data.data
        })
      } else {
        message.error(res.data.msg);
      }
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
    });
  }


  /**
   * 创建按钮事件
   */
  createBtnClick = () => {
    this.setState({
      createVisible: true,
    });
  }

  /**
     * 编辑按钮
     */
  editBtnClick(record) {
    console.log("record:", record);
    this.setState({
      editVisible: true,
      formData: JSON.parse(JSON.stringify(record)),
    });
  }

  /**
   * 重置密码
   */
  resetPwd(record) {
    console.log("record:", record);
    let _this = this;
    return (confirm({
      title: '你确定要重置这个用户的密码吗?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        // _this.resetPwdAction(record);
        return new Promise((resolve, reject) => {
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          let fd = new FormData();
          fd.append('userId', record.id);
          fd.append('pwd', md5(global.constants.default_password));
          axios({
            method: 'post',
            url: global.constants.url + "/user/restPwd",
            data: fd,
            headers: {
              'accessToken': JSON.parse(sessionStorage.getItem("token")),
              'Content-Type': 'application/json;charset=UTF-8',
            }
          }).then((res) => {
            console.log("resetPwd",res.data);
            if (res.data.code === 0) {
              message.success(res.data.msg);
            } else {
              message.error(res.data.msg);
            }
            resolve();
            
          })
        }).catch((err) => {
          console.log(err)
          message.error("获取数据失败,请检查网络配置!");
        });
      },
      onCancel() {
      },
    }))
  }

  /**
   * 重置密码
   */
  resetPwdAction = (record) => {

  }

  /**
     * 删除按钮
     * @param {*} record 
     */
  deleteBtnClick = (record) => {
    let _this = this;
    return (confirm({
      title: '你确定要删除这个用户吗?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        _this.userAction(record, 3);
      },
      onCancel() {
        console.log('Cancel');
      },
    }))
  }



  /**
  * 授权按钮
  * @param {*} record 
  */
  authBtnClick(record) {
    this.setState({
      authVisible: true,
    });
  }


  treeSelectOnChange = (val) => {
    console.log(val);
    this.setState({
      treeSelectvalue: val
    });
  }


  /**
   * 创建用户模态框的 确定 按钮.
   */
  createHandleOk = (data) => {
    this.setState({
      createLoading: true
    });
    //md5加密密码
    data.password = md5(data.password);
    // delete data.rpwd;
    this.userAction(data, 1);
  }


  /**
   * 编辑用户模态框的 确定 按钮.
   */
  editHandleOk = (data) => {
    this.setState({ editLoading: true })
    //md5加密密码
    data.password = md5(data.password);
    // delete data.rpwd;
    this.userAction(data, 2);
  }

  /**
   * 模态框的 取消 按钮
   */
  modalHandleCancel = () => {
    this.setState({ createVisible: false, editVisible: false });
  }


  /**
   * 用户操作
   */
  userAction = (data, actionType) => {
    console.log("editHandleOk", data)
    let fd = new FormData();
    fd.append('userJson', JSON.stringify(data));
    fd.append('action', actionType);
    this.request("/user/userAction", fd);
  }


  /**
  * 发送网络请求
  */
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
        //更新列表
        this.getUserList(this.state.pageInfo.defaultCurrent);
        this.setState({
          createVisible: false,
          editVisible: false,
        });
      } else {
        message.error(res.data.msg);
      }
      this.setState({
        createLoading: false,
        editLoading: false,
      });
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({
        createVisible: false,
        editVisible: false,
        createLoading: false,
      });
    });
  }

  render() {
    const { hasAuth } = this.state;
    if (hasAuth) {
      return (
        <div className="ua_wrap">
          <Row className="ua_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建后台用户</Button>

            <CreateUserForm
              moduleList={this.state.moduleList}
              ncAddressList={this.state.ncAddressList}
              visible={this.state.createVisible}
              loading={this.state.createLoading}
              roleList={this.state.roleList}
              onOk={this.createHandleOk}
              onCancel={this.modalHandleCancel}
            />


            <EditUserForm
              moduleList={this.state.moduleList}
              ncAddressList={this.state.ncAddressList}
              visible={this.state.editVisible}
              loading={this.state.editLoading}
              roleList={this.state.roleList}
              onOk={this.editHandleOk}
              onCancel={this.modalHandleCancel}
              data={this.state.formData}
            />
          </Row>

          {/* 模块列表 */}
          <Row className="ua_tab">
            <Spin spinning={this.state.loading}>
              <Table
                rowKey={record => record.id}
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={{
                  defaultCurrent: this.state.pageInfo.defaultCurrent,
                  onChange: this.pageOnChange,
                  current: this.state.pageInfo.currentPage,
                  pageSize: this.state.pageInfo.pageSize,
                  total: this.state.pageInfo.total,
                }}
              />
            </Spin>
          </Row>
        </div>
      )
    }
    return (
      <div className="nomatch_wrap">
        无访问权限
      </div>
    )
  }
}
