import React, { Component } from 'react';
import './index.less';
import {
  Row, Button, Table, Modal, Radio, Input,
  TreeSelect, Tabs, Upload, Icon, message,
} from 'antd'
import CreateModule from '../../components/CreateModule'
const confirm = Modal.confirm;

export default class Module extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasAuth: false, //是否有访问此页面的权限
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
        title: '模块名称',
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
        title: '父级模块',
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
              <Button className="module_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
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
        title: '你确定要删除模块吗?',
        content: ' 删除模块，会影响该模块下所有单据的正常使用。',
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
        title: '你确定要删除这个单据吗?',
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
            message.success('删除单据成功。');
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
      message.success('删除模块成功。');
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  componentDidMount() {
    this.setState({
      hasAuth: true
    });
  }

  render() {
    const { visible, confirmLoading, hasAuth } = this.state;
    if (hasAuth) {
      return (
        <div className="module_wrap">
          <Row className="module_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建模块</Button>

            {/* 创建模块的modal窗口 */}
            <Modal
              visible={visible}
              title="创建模块"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>保存</Button>,
              ]}>
              <CreateModule />
            </Modal>
          </Row>

          {/* 模块列表 */}
          <Row className="module_tab">
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
