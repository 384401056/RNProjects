import React, { Component } from 'react';
import './index.less';
import '../../commont/config'
import {
  Row, Button, Table, Modal, message, Spin
} from 'antd'
// import Highlighter from 'react-highlight-words';
import axios from 'axios'
// import menuList from './../../resource/menu';
import CreatePmsForm from '../../components/CreatePmsForm';
import EditPmsFrom from '../../components/EditPmsForm';


const confirm = Modal.confirm;

export default class Permission extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageInfo: {
        defaultCurrent: 1,
        currentPage: 0,
        pageSize: 0,
        total: 0
      },
      loading: false,
      modalLoading: false,
      hasAuth: false,
      searchText: '', //表头输入的搜索文本
      confirmLoading: false, //确定按钮的加载动作
      visible: false, //模态窗口的显示与否
      editVisible: false, //模态窗口的显示与否

      permissionParentList: [],

      editFormData: {},
      formData: {
        type: null,
        name: "",
        parentId: "0",
        parentName: "",
        url: null,
        sort: 0,
        icon: "",
      },
      data: [],
      columns: [{
        title: '权限名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      }, {
        title: '类型',
        dataIndex: 'type',
        width: '12%',
        key: '',
        render: (text, record) => {
          let isDir = (record.type == 0 && (record.url==null || record.url == ""))
          return isDir?<div className="pms_type_0" >目录</div>:<div className="pms_type_1" >菜单</div>
          
          // let pmsTypeView;
          // switch (record.type) {
          //   case 0:
          //     pmsTypeView = <div className="pms_type_0" >目录</div>
          //     break;
          //   case 1:
          //     pmsTypeView = <div className="pms_type_1" >菜单</div>
          //     break;
          // }
          // return (
          //   pmsTypeView
          // )
        }
      },
      {
        title: '父级节点',
        dataIndex: 'parentName',
        width: '12%',
        key: 'parentName',
      },
      {
        title: "操作",
        width: '12%',
        key: "",
        render: (text, record) => {
          return (
            <div>
              <Button className="pms_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
            </div>
          );
        },
      }
      ]
    }
  }


  componentDidMount() {
    this.setState({
      //根据当前用户是否有访问此组件的权限
      hasAuth: global.constants.checkPermission("/manager/moudle"),
    });
    this.getPermissinList(this.state.pageInfo.defaultCurrent);
  }


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  /**
  * 编辑按钮事件
  * @param record 
  */
  editBtnClick(record) {
    console.log("editBtnClick", record)
    this.setState({
      editVisible: true,
      editFormData: JSON.parse(JSON.stringify(record))//深拷贝
    });
  }

  /**
   * 删除按钮事件
   * @param record 
   */
  deleteBtnClick = (record) => {
    console.log(record);
    let _this = this;
    if (record.type == 0) {
      return (confirm({
        title: '你确定要删除目录吗?',
        content: ' 删除目录，会影响该模目录下所有菜单的正常使用。',
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk() {
          _this.deletePermission(record);
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
          _this.deletePermission(record);
        },
        onCancel() {
          console.log('Cancel');
        },
      }))
    }
  }


   /**
  * 删除权限
  */
  deletePermission = (formData)=>{
    let fd = new FormData();
    fd.append('pmsJson', JSON.stringify(formData));
    fd.append('action', 3);
    //发送post请求。
    this.request("/permission/permissionAction", fd);
  }


  /**
   * 发送网络请求
   */
  request=(url,data)=>{
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
        this.getPermissinList(this.state.pageInfo.defaultCurrent);
        this.setState({
          visible: false, 
        });
      } else {
        message.error(res.data.msg);
      }
      this.setState({
        editVisible: false,
        modalLoading: false,
      });
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({
        visible: false,
        editVisible: false,
        modalLoading: false,
      });
    });
  }

  /**
   * 创建 按钮事件
   */
  createBtnClick = () => {
    this.setState({
      visible: true,
    });
  }

  /**==================新建窗口"确定"按钮========================*/
  handleOk = (formData) => {
    console.log("handleOK:", formData);
    this.setState({
      modalLoading: true,
    });
    this.addModule(formData);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

   /**==================编辑窗口“确定”按钮========================*/
   handleEditOk = (data) => {
    this.setState({
      modalLoading: true,
    });
    let fd = new FormData();
    fd.append('pmsJson', JSON.stringify(data));
    fd.append('action', 2);
    this.request("/permission/permissionAction",fd);
  }

  handleEditCancel = () => {
    this.setState({ 
      editVisible: false
    });
  }


  /**
   * 添加权限
   */
  addModule = (formData) => {
    console.log("formData:", formData);
    let fd = new FormData();
    fd.append('pmsJson', JSON.stringify(formData));
    fd.append('action', 1);
    this.request("/permission/permissionAction", fd);
  }


  /**
   * 获取分页权限列表
   */
  getPermissinList = (pageNum) => {
    this.setState({ loading: true, })
    let fd = new FormData();
    fd.append('pageindex', pageNum);

    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/permission/list',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        // message.success(res.data.msg);
        //返回的分页信息和数据
        let tempPageInfo = this.state.pageInfo;
        tempPageInfo.currentPage = res.data.data.pageNum;
        tempPageInfo.pageSize = res.data.data.pageSize;
        tempPageInfo.total = res.data.data.total;
        this.setState({
          pageInfo: tempPageInfo,
          data: res.data.data.list,
        })
        this.getPermissionParentList();//更新父级列表.
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
   * 获取父级权限列表（不包含url不空的）
   */
  getPermissionParentList = ()=>{
    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/permission/parentList',
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        this.setState({
          permissionParentList:res.data.data
        })
      }
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({ loading: false, })
    });
  }
  

  pageOnChange = (pageNum, pageSize) => {
    this.getPermissinList(pageNum);
  }


  render() {
    const { visible, confirmLoading, hasAuth } = this.state;
    // this.state.permissionParentList = [];
    // if (this.state.data) {
    //   this.state.data.forEach((v) => {
    //     if (v.type == 0 && (v.url == "" || v.url == null)) {
    //       this.state.permissionParentList.push(v)
    //     }
    //   })
    // }

    if (hasAuth) {
      return (
        <div className="pms_wrap">
          <Row className="pms_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建权限</Button>

            {/* 创建模块的modal窗口 */}
            <CreatePmsForm
              permissionParentList = {this.state.permissionParentList}
              loading={this.state.modalLoading}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel} />

            <EditPmsFrom
              permissionParentList = {this.state.permissionParentList}
              loading={this.state.modalLoading}
              visible={this.state.editVisible}
              onOk={this.handleEditOk}
              onCancel={this.handleEditCancel}
              editFormData={this.state.editFormData}
            />

          </Row>

          {/* 模块列表 */}
          <Row className="pms_tab">
            <Spin spinning={this.state.loading}>
              <Table
                rowKey={record => record.id}
                columns={this.state.columns}
                dataSource={this.state.data} scroll={{ y: 580 }}
                pagination={{ pageSize: 10 }}
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
