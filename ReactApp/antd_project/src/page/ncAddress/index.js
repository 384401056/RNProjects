import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
  Row, Spin, Button, Table, Modal, message,
} from 'antd'
import CreateNCForm from '../../components/CreateNCForm'
import EditNCForm from '../../components/EditNCForm'
import EditBillTypeForm from '../../components/EditBillTypeForm';
import axios from 'axios'


const confirm = Modal.confirm;
export default class NcAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {
        defaultCurrent: 1,
        currentPage: 0,
        pageSize: 0,
        total: 0
      },
      hasAuth: false,
      loading: false,
      createLoading: false,
      createVisible: false, //模态窗口的显示与否(创建)
      editLoading: false,
      editVisible: false, //模态窗口的显示与否(修改)
      editFormData: {},
      data: [],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: '5%',
        key: 'id',
      }, {
        title: '客户名称',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      }, {
        title: '集团编码',
        align: 'center',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      }, {
        title: 'NC地址',
        align: 'center',
        dataIndex: 'url',
        width: '15%',
        key: 'url',
      },
      {
        title: "操作",
        align: 'center',
        width: '30%',
        key: "",
        render: (text, record) => {
          return (
            <div>
              <Button className="nc_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
              <Button className="nc_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
              {/* <Button className="nc_editBtn" type="primary" onClick={this.customBillType.bind(this, record)}>定义单据</Button> */}
            </div>
          );
        },
      }
      ]
    }
  }

  componentDidMount() {
    this.setState({
      hasAuth: global.constants.checkPermission("/manager/nc"),
    })
    this.getNcAddressList(this.state.pageInfo.defaultCurrent);
  }

  pageOnChange = (pageNum, pageSize) => {
    this.getNcAddressList(pageNum);
  }



  getNcAddressList = (pageNum) => {
    this.setState({ loading: true, })
    let fd = new FormData();
    fd.append('pageindex', pageNum);
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
        //返回的分页信息和数据
        let tempPageInfo = this.state.pageInfo;
        tempPageInfo.currentPage = res.data.data.pageNum;
        tempPageInfo.pageSize = res.data.data.pageSize;
        tempPageInfo.total = res.data.data.total;
        console.log("getNcAddressList", res.data.data.list);
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
     * 编辑按钮
     * @param {} record 
     */
  editBtnClick(record) {
    console.log(record);
    this.setState({
      editVisible: true,
      editFormData: JSON.parse(JSON.stringify(record))//深拷贝
    });
  }


  /**
     * 删除按钮
     * @param {*} record 
     */
  deleteBtnClick(record) {
    let _this = this;
    return (confirm({
      title: '你确定要删除这个NC客户端吗?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        _this.ncAction(record, 3);
      },
      onCancel() {
        // console.log('Cancel');
      },
    }))
  }

  /**
   * 定义单据类型
   */
  customBillType = () => {
    this.setState({
      billTypeVisible:true,
    })
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
    * 创建角色模态框的 确定 按钮事件
    */
  createHandleOk = (formData) => {
    this.setState({ createLoading: true });
    this.ncAction(formData, 1);
  }

  /**
   * 编辑模态框的 确实 按钮
   */
  editHandleOk = (formData) => {
    this.setState({ editLoading: true });
    this.ncAction(formData, 2);
  }

  /**
   * 模态框的取消按钮
   */
  modalHandleCancel = () => {
    this.setState({
      createVisible: false,
      editVisible: false,
    });
  }


  /**
     * 操作角色, actionType 1:新增， 2：编辑， 3：删除
     */
  ncAction = (data, actionType) => {
    let fd = new FormData();
    fd.append('ncJson', JSON.stringify(data));
    fd.append('action', actionType);
    this.request("/ncManage/ncAction", fd);
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
        this.getNcAddressList(this.state.pageInfo.defaultCurrent);
        this.setState({
          createVisible: false,
          editVisible: false,
        });
      } else {
        message.error(res.data.msg);
      }
      this.setState({
        confirmLoading: false,
        editLoading: false,
      });
    }).catch((err) => {
      console.log(err)
      message.error("获取数据失败,请检查网络配置!");
      this.setState({
        createVisible: false,
        editVisible: false,
        confirmLoading: false,
      });
    });
  }

  /**
   * 单据类型模态框 取消 按钮
   */
  billTypeHandleOk = ()=>{

  }


  render() {
    const { hasAuth } = this.state;
    if (hasAuth) {
      return (
        <div className="nc_wrap">
          <Row className="nc_top">
            {/* 创建模块按钮 */}
            <Button type="primary" onClick={this.createBtnClick}>创建NC客户</Button>

            {/* 创建角色的modal窗口 */}
            <CreateNCForm
              visible={this.state.createVisible}
              loading={this.state.createLoading}
              onOk={this.createHandleOk}
              onCancel={this.modalHandleCancel} />

            {/* 修改角色的modal窗口 */}
            <EditNCForm
              visible={this.state.editVisible}
              loading={this.state.editLoading}
              editFormData={this.state.editFormData}
              onOk={this.editHandleOk}
              onCancel={this.modalHandleCancel} />

{/* 
            <EditBillTypeForm
              visible={this.state.billTypeVisible}
              onOk={this.billTypeHandleOk}
              onCancel={this.modalHandleCancel} />
              /> */}
          </Row>

          {/* 模块列表 */}
          <Row className="nc_tab">
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
