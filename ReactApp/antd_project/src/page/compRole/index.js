import React, { Component } from 'react'
import './index.less';
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tabs, Tag, Spin, message,
} from 'antd';
import axios from 'axios'
import '../../commont/config'
import CreateCompRoleForm from '../../components/CreateCompRoleForm'
import EditCompRoleForm from '../../components/EditCompRoleForm'

const confirm = Modal.confirm;
const { TreeNode } = Tree;

export default class CompRole extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageInfo: {
                defaultCurrent: 1,
                currentPage: 0,
                pageSize: 0,
                total: 0
            },
            //此用户下被分配的全模块列表
            userModuleList: [],
            userInfo: {},
            hasAuth: false,
            createVisible: false,
            createLoading: false,
            editVisible: false,
            editLoading: false,
            authVisible: false,
            data: [],
            formData: {
                name: "",
                userId: "",
                moduleIds:[],
                //选择的权限id列表
                moduleList: []
            },
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                width: '5%',
                key: 'id',
                align: 'center',
            }, {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
                align: 'center',
            },
            {
                title: '模块列表',
                dataIndex: 'moduleList',
                width: '20%',
                key: 'moduleList',
                align: 'center',
                render: (text, record) => {
                    return (
                        record.moduleList.map((item) => (
                            (item.type == 0) ?
                                <Tag color="blue" key={item.id}>{item.moduleName}</Tag>
                                : <Tag color="green" key={item.id}>{item.moduleName}</Tag>
                        ))
                    )
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '20%',
                align: 'center',
            },
            {
                title: "操作",
                width: '20%',
                key: "",
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Button className="cr_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                            <Button className="cr_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
                            {/* <Button type="primary" onClick={this.authBtnClick.bind(this, record)}>授权</Button> */}
                        </div>
                    );
                },
            }
            ]
        }
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.setState({
            //根据当前用户是否有访问此组件的权限
            hasAuth: global.constants.checkPermission("/company/role"),
        });
        this.state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(this.state.userInfo.id);
        this.getCompRoleList(this.state.userInfo.id, this.state.pageInfo.defaultCurrent);
        //这个方法需要的是json所以不用转成对象。
        this.getUserModuleList(sessionStorage.getItem("userInfo"))
    }

    pageOnChange = (pageNum, pageSize) => {
        this.getCompRoleList(this.state.userInfo.id, pageNum);
      }


    /**
     * 编辑按钮
     */
    editBtnClick(record) {
        this.setState({
            editVisible: true,
            formData: JSON.parse(JSON.stringify(record))//深拷贝
        });
    }

    /**
     * 删除按钮
     * @param {*} record 
     */
    deleteBtnClick(record) {
        let _this = this;
        return (confirm({
            title: '你确定要删除这个角色吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                _this.roleAction(record, 3);
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
     * 获取当前用户被分配的模块权限
     */
    getUserModuleList = (userInfo) => {
        this.setState({ loading: true, })
        let fd = new FormData();
        fd.append('userJson', userInfo);
        //发送post请求。
        axios({
            method: 'post',
            url: global.constants.url + '/user/moduleList',
            data: fd,
            headers: {
                'accessToken': JSON.parse(sessionStorage.getItem("token")),
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((res) => {
            if (res.data.code === 0) {
                console.log("getUserModuleList", res.data.data);
                this.setState({
                    userModuleList: res.data.data,
                })
            }
            this.setState({ loading: false, })
        }).catch((err) => {
            console.log(err)
            message.error("获取数据失败,请检查网络配置!");
            this.setState({ loading: false, })
        });
    }

    /**
     * 获取企业角色列表
     */
    getCompRoleList = (userId, pageNum) => {
        console.log("getCompRoleList")
        this.setState({ loading: true, })
        let fd = new FormData();
        fd.append('userId', userId);
        fd.append('pageindex', pageNum);
        //发送post请求。
        axios({
            method: 'post',
            url: global.constants.url + '/compRole/list',
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
                console.log("getCompRoleList", res.data.data.list);
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
     * 创建角色提交按钮
     */
    createHandleOk = (data) => {
        console.log("data:", data);
        this.setState({ createLoading: true });
        this.roleAction(data, 1);
    }

    /**
     * 编辑角色提交按钮
     */
    editHandleOk = (data) => {
        console.log("editHandleOk data:", data);
        this.setState({ editLoading: true });
        this.roleAction(data, 2);
    }

    modalHandleCancel = () => {
        this.setState({ 
            createVisible: false,
            editVisible: false,
        });
    }



    /**
 * 用户操作
 */
    roleAction = (data, actionType) => {
        let fd = new FormData();
        fd.append('roleJson', JSON.stringify(data));
        fd.append('action', actionType);
        this.request("/compRole/action", fd);
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
                this.getCompRoleList(this.state.userInfo.id, this.state.pageInfo.defaultCurrent);
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
            });
        });
    }


    /**
     * 创建角色按钮事件
     */
    createBtnClick = () => {
        this.setState({
            createVisible: true,
        });
    }


    //授权窗口“确定”按钮事件
    authHandleOk = () => {
        this.setState({ createLoading: true });
        setTimeout(() => {
            this.setState({ createLoading: false, authVisible: false });
            message.success('角色授权成功。');
        }, 3000);
    }

    //授权窗口“取消”按钮事件
    authHandleCancel = () => {
        this.setState({ authVisible: false });
    }

    //创建角色模态框,中的内容
    createRoleModalView = () => {
        return (
            <div>
                <Row className="cr_modalRow">
                    <Col span={6}>
                        <div className="cr_modalCol">
                            <h4>角色名称:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" maxLength={32} />
                        </div>
                    </Col>
                </Row>
                <Row className="cr_modalRow">
                    <Col span={6}>
                        <div className="cr_modalCol">
                            <h4>角色标识:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" maxLength={32} />
                        </div>
                    </Col>
                </Row>
                <Row className="cr_modalRow">
                    <Col span={6}>
                        <div className="cr_modalCol">
                            <h4>角色描述:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" maxLength={32} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }


    render() {
        const { createVisible, createLoading, hasAuth, authVisible , editVisible, editLoading} = this.state;

        if (hasAuth) {
            return (
                <div className="cr_wrap">
                    <Row className="cr_top">
                        {/* 创建模块按钮 */}
                        <Button type="primary" onClick={this.createBtnClick}>创建角色</Button>

                        {/* 创建角色的modal窗口 */}
                        <CreateCompRoleForm
                            userModuleList={this.state.userModuleList}
                            visible={createVisible}
                            loading={createLoading}
                            userInfo={this.state.userInfo}
                            onOk={this.createHandleOk}
                            onCancel={this.modalHandleCancel}
                        />

                        {/* 编辑角色的modal窗口 */}
                        <EditCompRoleForm
                            userModuleList={this.state.userModuleList}
                            visible={editVisible}
                            loading={editLoading}
                            userInfo={this.state.userInfo}
                            onOk={this.editHandleOk}
                            onCancel={this.modalHandleCancel}
                            data = {this.state.formData}
                        />
                    </Row>

                    {/* 模块列表 */}
                    <Row className="cr_tab">
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
