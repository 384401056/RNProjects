import React, { Component } from 'react'
import './index.less';
import {
  Row, Col, Button, Table, Modal, Radio, Input, message,
} from 'antd'

const confirm = Modal.confirm;
export default class NcAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasAuth: false,
      createVisible: false,
      confirmLoading: false,
      data: [
        {
          id: 1,
          name: '云南若邻科技有限公司',
          code: 'rl',
          url: 'http://118.126.109.254:8198/uapws/service',
        },
        {
          id: 2,
          name: '云南若邻科技有限公司',
          code: 'rl',
          url: 'http://118.126.109.254:8198/uapws/service',
        },
        {
          id: 3,
          name: '云南若邻科技有限公司',
          code: 'rl',
          url: 'http://118.126.109.254:8198/uapws/service',
        },
      ],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: '1%',
        key: 'id',
      }, {
        title: 'NC客户名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },{
        title: '集团编码',
        dataIndex: 'code',
        key: 'name',
        width: '5%',
      }, {
        title: 'NC地址',
        dataIndex: 'url',
        width: '20%',
        key: 'age',
      },
      {
        title: "操作",
        width: '20%',
        key: "",
        render: (text, record) => {
          return (
            <div>
              <Button className="nc_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button className="nc_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
            </div>
          );
        },
      }
      ]
    }
  }

  componentDidMount(){
    this.setState({
      hasAuth : true
    }
    )
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
      title: '你确定要删除这个NC客户端吗?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')).then(() => {
          message.success('NC客户端删除成功。');
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    }))
  }


  /**
     * 创建NC按钮事件
     */
  createBtnClick = () => {
    this.setState({
      createVisible: true,
    });
  }

  //创建NC客户端模态框,中的内容
  createNCModalView = () => {
    return (
      <div>
        <Row className="nc_modalRow">
          <Col span={6}>
            <div className="nc_modalCol">
              <h4>NC客户名称:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="nc_modalRow">
          <Col span={6}>
            <div className="nc_modalCol">
              <h4>集团编码:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
        <Row className="nc_modalRow">
          <Col span={6}>
            <div className="nc_modalCol">
              <h4>NC地址:</h4>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input placeholder="" />
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  createHandleOk = () => {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, createVisible: false });
      message.success('添加NC客户成功。');
    }, 3000);
  }

  createHandleCancel = () => {
    this.setState({ createVisible: false });
  }


  render() {
    const { createVisible, confirmLoading, hasAuth } = this.state;
    if (hasAuth) {
      return (
        <div className="nc_wrap">
          <Row className="nc_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建NC客户</Button>

            {/* 创建角色的modal窗口 */}
            <Modal
              visible={createVisible}
              title="创建NC客户"
              onOk={this.createHandleOk}
              onCancel={this.createHandleCancel}
              footer={[
                <Button key="back" onClick={this.createHandleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.createHandleOk}>保存</Button>,
              ]}>
              {this.createNCModalView()}
            </Modal>

          </Row>

          {/* 模块列表 */}
          <Row className="nc_tab">
            <Table
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={{ pageSize: 10 }} />
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
