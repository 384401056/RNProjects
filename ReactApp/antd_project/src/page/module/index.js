import React, { Component } from 'react';
import './index.less';
import '../../commont/config'
import {
  Row, Button, Table, Modal, Spin, message, Pagination
} from 'antd'
import axios from 'axios'
import CreateModuleFormModal from '../../components/CreatModuleForm'
import EditModuleFormModal from '../../components/EditModuleForm'

const confirm = Modal.confirm;

export default class Module extends Component {

  constructor(props) {
    super(props);
    console.log("constructor:", props)
    this.state = {
      pageInfo: {
        defaultCurrent: 1,
        currentPage: 0,
        pageSize: 0,
        total: 0
      },
      loading: false,
      modalLoading: false, //确定按钮的加载动作
      hasAuth: false, //是否有访问此页面的权限
      searchText: '', //表头输入的搜索文本
      visible: false, //模态窗口的显示与否
      editVisible: false, //模态窗口的显示与否
      parentModuleList: [],
      editFormData:{},
      formData: {
        type: null,
        moduleName: "",
        parentId: "0",
        parentName: "",
        parentShortname: "",
        shortName: "",
        messageType: "",
        url: null,
        sort: 0,
        themecolor: null,
        themetext: "",
        isenable: 1,
        createTime: null,
        icon: "",
      },
      data: [],
      columns: [{
        title: '模块名称',
        dataIndex: 'moduleName',
        key: 'moduleName',
        width: '15%',
      }, {
        title: '类型',
        dataIndex: 'type',
        width: '12%',
        key: '',
        render: (text, record) => {
          let moduleTypeView;
          switch (record.type) {
            case 0:
              moduleTypeView = <div className="module_type_0" >模块</div>
              break;
            case 1:
              moduleTypeView = <div className="module_type_1" >单据</div>
              break;
            case 2:
              moduleTypeView = <div className="module_type_2">其它</div>
              break;
          }
          return (
            moduleTypeView
          )
        }
      },
      {
        title: '父级模块',
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
              <Button className="module_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button type="danger" onClick={this.deleteBtnClick.bind(this,record)}>删除</Button>
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
    this.getModuleList(this.state.pageInfo.defaultCurrent);
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
  editBtnClick=(record)=> {
    console.log("editBtnClick",record);
    this.setState({
      editVisible: true,
      editFormData: JSON.parse(JSON.stringify(record))//深拷贝
    });
  }

  /**
   * 删除按钮事件
   * @param record 
   */
  deleteBtnClick=(record)=> {
    console.log(record);
    let _this = this;
    if (record.type == 0) {
      return (confirm({
        title: '你确定要删除模块吗?',
        content: '删除模块，会影响该模块下所有单据的正常使用。',
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk() {
          _this.deleteModule(record);
        },
        onCancel() {
          // console.log('Cancel');
        },
      }))
    } else {
      return (confirm({
        title: '你确定要删除这个单据吗?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk() {
          _this.deleteModule(record);
        },
        onCancel() {
          // console.log('Cancel');
        },
      }))
    }
  }

  /**
   * 创建
   */
  createBtnClick = () => {
    this.setState({
      visible: true,
      editStatus: false,
    });
  }


  /**==================新建窗口"确定"按钮========================*/
  handleOk = (formData) => {
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
    fd.append('moduleJson', JSON.stringify(data));
    fd.append('action', 2);
    this.request("/module/moduleAction",fd);
  }

  handleEditCancel = () => {
    this.setState({ 
      editVisible: false
    });
  }

  /**
   * 删除模块
   */
  deleteModule = (formData)=>{
    let fd = new FormData();
    fd.append('moduleJson', JSON.stringify(formData));
    fd.append('action', 3);
    //发送post请求。
    this.request("/module/moduleAction", fd);
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
        this.getModuleList(this.state.pageInfo.defaultCurrent);
      } else {
        message.error(res.data.msg);
      }
      this.setState({
        visible: false, 
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
   * 添加模块
   */
  addModule =(formData)=>{
    console.log("formData:", formData);
    let fd = new FormData();
    fd.append('moduleJson', JSON.stringify(formData));
    fd.append('action', 1);

    //发送post请求。
    axios({
      method: 'post',
      url: global.constants.url + '/module/moduleAction',
      data: fd,
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        message.success(res.data.msg);
        //更新列表
        this.getModuleList(this.state.pageInfo.defaultCurrent);
        this.setState({
          visible: false, 
          modalLoading: false,
        });
      } else {
        message.error(res.data.msg);
        this.setState({
          modalLoading: false,
        });
      }
      
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({
        visible: false, 
        modalLoading: false,
      });
    });
  }

  /**
   * 获取模块列表
   */
  getModuleList = (pageNum) => {
    this.setState({ loading: true, })
    let fd = new FormData();
    fd.append('pageindex', pageNum);
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
        //返回的分页信息和数据
        let tempPageInfo = this.state.pageInfo;
        tempPageInfo.currentPage = res.data.data.pageNum;
        tempPageInfo.pageSize = res.data.data.pageSize;
        tempPageInfo.total = res.data.data.total;
        this.setState({
          pageInfo: tempPageInfo,
          data: res.data.data.list,
        })
        this.getParentModuleList();//更新父列表
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


  pageOnChange = (pageNum, pageSize) => {
    this.getModuleList(pageNum);
  }

  /**
   * 获取父级模块列表
   */
  getParentModuleList=()=>{
    axios({
      method: 'post',
      url: global.constants.url + "/module/parentList",
      headers: {
        'accessToken': JSON.parse(sessionStorage.getItem("token")),
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((res) => {
      if (res.data.code === 0) {
        //更新列表
        this.setState({
          parentModuleList:res.data.data
        });
      }
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


  render() {
    const { hasAuth } = this.state;

    // this.state.parentModuleList = [];
    // if (this.state.data) {
    //   this.state.data.forEach((v) => {
    //     if (v.type == 0) {
    //       this.state.parentModuleList.push(v)
    //     }
    //   })
    // }

    

    if (hasAuth) {
      return (



        <div className="module_wrap">
          <Row className="module_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建模块</Button>

            {/* 创建模块的modal窗口 */}

            <CreateModuleFormModal
              parentModuleList={this.state.parentModuleList}
              loading={this.state.modalLoading}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            />

            {/* 编辑模块的modal窗口 */}
            <EditModuleFormModal
              parentModuleList={this.state.parentModuleList}
              loading={this.state.modalLoading}
              visible={this.state.editVisible}
              onOk={this.handleEditOk}
              onCancel={this.handleEditCancel}
              editFormData={this.state.editFormData}
            />
          </Row>

          {/* 模块列表 */}
          <Row className="module_tab">
            <Spin spinning={this.state.loading}>
              <Table
                rowKey={record => record.id}
                columns={this.state.columns}
                dataSource={this.state.data} scroll={{ y: 580 }}
                pagination={{
                  defaultCurrent:this.state.pageInfo.defaultCurrent,
                  onChange:this.pageOnChange,
                  current:this.state.pageInfo.currentPage,
                  pageSize:this.state.pageInfo.pageSize,
                  total:this.state.pageInfo.total,
                }} />
            </Spin>
          </Row>
        </div >
      )
    }
    return (
      <div className="nomatch_wrap">
        无访问权限
      </div>
    )
  }

}
