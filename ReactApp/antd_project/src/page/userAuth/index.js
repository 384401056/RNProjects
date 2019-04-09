import React, { Component } from 'react'
import './index.less';
import {
  Row, Col, Button, Table, Modal, Tree, Input,
  Switch, TreeSelect, Icon, message,
} from 'antd';

const confirm = Modal.confirm;
const { TreeNode } = Tree;
const TSTreeNode = TreeSelect.TreeNode;
export default class UserAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasAuth: false,
      createVisible: false,
      authVisible: false,
      confirmLoading: false,
      treeSelectvalue: "",
      data: [],
      columns: [{
        title: '',
        dataIndex: '',
        width: '1%',
        key: '',
      }, {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      }, {
        title: 'NC客户名',
        dataIndex: 'ncname',
        width: '20%',
        key: 'ncname',
      }, {
        title: '手机',
        dataIndex: 'phoneNumber',
        width: '20%',
        key: 'phoneNumber',
      }, {
        title: "操作",
        width: '40%',
        key: '',
        render: (text, record) => {
          return (
            <div>
              <Button className="ua_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button className="ua_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
              <Button type="primary" onClick={this.authBtnClick.bind(this, record)}>授权</Button>
            </div>
          );
        },
      }
      ]
    }
  }

  componentDidMount() {
    const datalist = [];
    for (let i = 0; i < 3; ++i) {
      datalist.push({
        key: i,
        name: '超级管理员',
        ncname: '云南若邻科技有限公司',
        phoneNumber: Math.random() * 10000000000,
      });
    }
    console.log(this.state.data);
    this.setState({
      data: datalist,
      hasAuth: true
    })
  }

  /**
     * 编辑按钮
     * @param {} record 
     */
  editBtnClick(record) {
    console.log("编辑")
    console.log(record);
    this.setState({
      createVisible: true,
    });
  }

  /**
     * 删除按钮
     * @param {*} record 
     */
  deleteBtnClick(record) {
    return (confirm({
      title: '你确定要删除这个用户吗?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')).then(() => {
          message.success('删除用户成功。');
        })
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

  /**
   * 切换组件点击事件
   */
  switchOnChange = (checked) => {
    console.log(`switch to ${checked}`);
  }

  treeSelectOnChange = (val) => {
    console.log(val);
    this.setState({
      treeSelectvalue: val
    });
  }

  /**
   * 创建用户模态框视图
   */
  createUserModalView = () => {
    return (
      <div>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>用户名称:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>用户密码:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input.Password placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>确认密码:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input.Password placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>手机号码:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>E-Mail:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>NC客户:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <TreeSelect
                showSearch
                disabled={this.state.value == 0}
                style={{ width: 200 }}
                value={this.state.treeSelectvalue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.treeSelectOnChange}>
                <TSTreeNode value="1" title="parent 1" key="0-1" />
                <TSTreeNode value="2" title="parent 2" key="0-2" />
                <TSTreeNode value="3" title="parent 3" key="0-3" />
                <TSTreeNode value="4" title="parent 4" key="0-4" />
                <TSTreeNode value="5" title="parent 5" key="0-5" />
              </TreeSelect>
            </div>
          </Col>
        </Row>
        <Row className="ua_modalRow">
          <Col span={6}>
            <div className="ua_modalCol">
              <h4>是否启用:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Switch defaultChecked onChange={this.switchOnChange} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  /**
   * 授权模态框视图
   */
  authModalView = () => {
    return (
      <div>
        <Row className="role_modalRow">
          <Col span={24}>
            <Tree
              checkable
              onSelect={this.onSelect}
              onCheck={this.onCheck}>
              <TreeNode title="parent 1" key="0-1">
                <TreeNode title="parent 1-0" key="0-0-0"></TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1"></TreeNode>
              </TreeNode>
              <TreeNode title="parent 2" key="0-2">
                <TreeNode title="parent 2-0" key="2-0-0"></TreeNode>
                <TreeNode title="parent 2-1" key="2-0-1"></TreeNode>
              </TreeNode>
              <TreeNode title="parent 3" key="0-3">
                <TreeNode title="parent 3-0" key="3-0-0"></TreeNode>
                <TreeNode title="parent 3-1" key="3-0-1"></TreeNode>
              </TreeNode>
            </Tree>
          </Col>
        </Row>
      </div>
    )
  }

  /**
   * 扩展视图
   */
  expandedRowRender = (record, index) => {
    console.log(record);
    console.log(index);
    return (
      <div>
        <Row className="ua_modalRow">
          <Col span={24}>
            <Tree
              showLine
              defaultExpandedKeys={['0-0-0']}
              onSelect={this.onSelect}
            >
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0"></TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1"></TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2"></TreeNode>
              </TreeNode>
            </Tree>
          </Col>
        </Row>
      </div>
    );
  }

  createBtnClick = () => {
    this.setState({ createVisible: true });
  }

  createHandleOk = () => {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, createVisible: false });
      message.success('创建用户成功。');
    }, 3000);
  }

  createHandleCancel = () => {
    this.setState({ createVisible: false });
  }

  //授权窗口“确定”按钮事件
  authHandleOk = () => {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, authVisible: false });
      message.success('用户授权成功。');
    }, 3000);
  }

  //授权窗口“取消”按钮事件
  authHandleCancel = () => {
    this.setState({ authVisible: false });
  }


  render() {
    const { createVisible, confirmLoading, hasAuth, authVisible } = this.state;
    if (hasAuth) {
      return (
        <div className="ua_wrap">
          <Row className="ua_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建管理员</Button>

            {/* 创建角色的modal窗口 */}
            <Modal
              visible={createVisible}
              title="创建管理员"
              onOk={this.createHandleOk}
              onCancel={this.createHandleCancel}
              footer={[
                <Button key="back" onClick={this.createHandleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.createHandleOk}>保存</Button>,
              ]}>
              {this.createUserModalView()}
            </Modal>

            <Modal
              visible={authVisible}
              title="用户授权"
              onOk={this.authHandleOk}
              onCancel={this.authHandleCancel}
              footer={[
                <Button key="back" onClick={this.authHandleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.authHandleOk}>保存</Button>,
              ]}>
              {this.authModalView()}
            </Modal>
          </Row>

          {/* 模块列表 */}
          <Row className="ua_tab">
            <Table
              columns={this.state.columns}
              expandedRowRender={this.expandedRowRender}
              dataSource={this.state.data}
              pagination={{ pageSize: 10 }}
            />
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
