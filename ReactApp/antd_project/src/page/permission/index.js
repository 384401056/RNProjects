import React, { Component } from 'react';
import './index.less';
import {
  Row, Button, Table, Modal, message,
} from 'antd'
import Highlighter from 'react-highlight-words';
import CreatePermission from '../../components/CreatePermission'
import menuList from './../../resource/menu'
const confirm = Modal.confirm;

export default class Permission extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasAuth: false,
      searchText: '', //表头输入的搜索文本
      confirmLoading: false, //确定按钮的加载动作
      visible: false, //模态窗口的显示与否
      data: [{
        key: 1,
        name: '1John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [{
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        }, {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
        }, {
          key: 13,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }],
      },
      {
        key: 2,
        name: '2John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [{
          key: 21,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        }, {
          key: 22,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
        }, {
          key: 23,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }, {
          key: 24,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }
        ],
      },
      {
        key: 3,
        name: '3John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [{
          key: 31,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        }, {
          key: 32,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
        }, {
          key: 33,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }, {
          key: 34,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }
        ],
      }
      ],

      columns: [{
        title: '',
        dataIndex: '',
        width: '5%',
        key: '',
      }, {
        title: '权限名',
        dataIndex: 'name',
        key: 'name',
        width: '12%',
      }, {
        title: '类型',
        dataIndex: 'age',
        width: '12%',
        key: 'age',
      },
      {
        title: '父级节点',
        dataIndex: 'address',
        width: '12%',
        key: 'address',
      },
      {
        title: "操作",
        width: '12%',
        key: "",
        render: (text, record) => {
          return (
            <div>
              <Button className="pm_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
            </div>
          );
        },
      }
      ]
    }
  }


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  editBtnClick(record) {
    console.log("编辑")
    console.log(record);
    this.setState({
      visible: true,
    });
  }

  deleteBtnClick(record) {
    if (record.children != null) {
      return (confirm({
        title: '你确定要删除目录吗?',
        content: ' 删除目录，会影响该模块下所有菜单的正常使用。',
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        // okButtonProps: {
        //   disabled: false,
        // },
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!')).then(() => {
            message.success('删除模块成功。');
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      }))
    } else {
      return (confirm({
        title: '你确定要删除这个菜单吗?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        // okButtonProps: {
        //   disabled: false,
        // },
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!')).then(() => {
            message.success('删除菜单成功。');
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      }))
    }
  }

  createBtnClick = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
      message.success('添加权限成功。');
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  componentDidMount() {
    //判断当前用户是否有权限访问此页面
    this.setState({
      hasAuth: true
    });
  }

  render() {
    const { visible, confirmLoading , hasAuth} = this.state;
    if (hasAuth) {
      return (
        <div className="pm_wrap">
          <Row className="pm_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建权限</Button>

            {/* 创建模块的modal窗口 */}
            <Modal
              visible={visible}
              title="创建权限"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>保存</Button>,
              ]}>
              <CreatePermission />
            </Modal>
          </Row>

          {/* 模块列表 */}
          <Row className="pm_tab">
            <Table
              columns={this.state.columns}
              dataSource={this.state.data} scroll={{ y: 580 }}
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
