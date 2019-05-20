import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
    Row, Button, Table, Modal, Tag, Spin, message,
} from 'antd';
import axios from 'axios'
import CreateRoleForm from '../../components/CreateRoleForm'
import EditRoleForm from '../../components/EditRoleForm'

const confirm = Modal.confirm;

export default class Role extends Component {


    constructor(props) {
        super(props);
        this.state = {
            pageInfo: {
                defaultCurrent: 1,
                currentPage: 0,
                pageSize: 0,
                total: 0
            },
            //角色权限列表
            permissionList: [],

            loading: false,
            hasAuth: false,
            confirmLoading: false,
            createVisible: false, //模态窗口的显示与否(创建)
            editLoading: false,
            editVisible: false, //模态窗口的显示与否(修改)
            editFormData: {},
            data: [
            ],
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                width: '5%',
                key: 'id',
            }, {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width: '12%',
            }, {
                title: '角色标识',
                dataIndex: 'perms',
                width: '12%',
                key: 'perms',
            },
            {
                title: '描述信息',
                dataIndex: 'remark',
                width: '12%',
                key: 'remark',
            },
            {
                title: '拥有权限',
                dataIndex: 'permissionList',
                width: '20%',
                key: 'permissionList',
                render: (text, record) => {
                    return (
                        record.permissionList.map((item) => (
                            (item.type == 0) ?
                                <Tag color="blue" key={item.id}>{item.name}</Tag>
                                : <Tag color="green" key={item.id}>{item.name}</Tag>
                        ))
                    )
                }
            },
            {
                title: "操作",
                align: 'center',
                width: '20%',
                key: "",
                render: (text, record) => {
                    return (
                        // 如果是超级管理员，则不可编辑和删除。
                        record.id !== 1 ?
                            <div>
                                <Button className="role_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                                <Button className="role_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
                                {/* <Button type="primary" onClick={this.authBtnClick.bind(this, record)}>授权</Button> */}
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
            //根据当前用户是否有访问此组件的权限
            hasAuth: global.constants.checkPermission("/manager/role"),
        });
        this.getRoleList(this.state.pageInfo.defaultCurrent);
        this.getPermissionListNoPage();//所有的权限列表，在新增时使用
    }


    pageOnChange = (pageNum, pageSize) => {
        this.getRoleList(pageNum);
    }



    /**
     * 获取不分页的权限列表
     */
    getPermissionListNoPage = () => {
        let fd = new FormData();
        fd.append('pageindex', 0);
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
                console.log("getPermissionListNoPage", res.data.data);
                this.setState({
                    permissionList: res.data.data
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
     * 获取角色列表
     */
    getRoleList = (pageNum) => {
        this.setState({ loading: true, })
        let fd = new FormData();
        fd.append('pageindex', pageNum);
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
                // message.success(res.data.msg);
                //返回的分页信息和数据
                let tempPageInfo = this.state.pageInfo;
                tempPageInfo.currentPage = res.data.data.pageNum;
                tempPageInfo.pageSize = res.data.data.pageSize;
                tempPageInfo.total = res.data.data.total;
                console.log("getRoleList", res.data.data.list);
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
     * 创建角色模态框的 确定 按钮事件
     */
    createHandleOk = (formData) => {
        this.setState({ confirmLoading: true });
        this.roleAction(formData, 1);
    }

    /**
     * 编辑角色模态框的 确定 按钮事件
     */
    editHandleOk = (formData) => {
        this.setState({ editLoading: true });
        this.roleAction(formData, 2);
    }

    /**
 * 模态框中的取消按钮事件
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
    roleAction = (data, actionType) => {
        let fd = new FormData();
        fd.append('roleJson', JSON.stringify(data));
        fd.append('action', actionType);
        this.request("/role/roleAction", fd);
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
                this.getRoleList(this.state.pageInfo.defaultCurrent);
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
 * 编辑按钮
 * @param {} record 
 */
    editBtnClick(record) {
        let tempFormData = {};

        tempFormData.permissionIds = record.permissionIds;
        tempFormData.name = record.name;
        tempFormData.perms = record.perms;
        tempFormData.remark = record.remark;
        tempFormData.id = record.id;

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
            title: '你确定要删除这个角色吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                _this.roleAction(record, 3);
            },
            onCancel() {
                // console.log('Cancel');
            },
        }))
    }


    /**
     * 创建角色按钮事件
     */
    createBtnClick = () => {
        this.setState({
            createVisible: true,
        });
    }

    render() {
        const { hasAuth } = this.state;

        if (hasAuth) {
            return (
                <div className="role_wrap">
                    <Row className="role_top">
                        {/* 创建模块按钮 */}
                        <Button type="primary" onClick={this.createBtnClick}>创建角色</Button>

                        {/* 创建角色的modal窗口 */}

                        <CreateRoleForm
                            permissionList={this.state.permissionList}
                            visible={this.state.createVisible}
                            loading={this.state.confirmLoading}
                            onOk={this.createHandleOk}
                            onCancel={this.modalHandleCancel} />

                        <EditRoleForm
                            permissionList={this.state.permissionList}
                            editFormData={this.state.editFormData}
                            visible={this.state.editVisible}
                            loading={this.state.editLoading}
                            onOk={this.editHandleOk}
                            onCancel={this.modalHandleCancel} />

                    </Row>

                    {/* 模块列表 */}
                    <Row className="role_tab">
                        <Spin spinning={this.state.loading}>
                            <Table
                                rowKey={record => record.id}
                                columns={this.state.columns}
                                dataSource={this.state.data}
                                scroll={{ y: 580 }}
                                pagination={{
                                    defaultCurrent: this.state.pageInfo.defaultCurrent,
                                    onChange: this.pageOnChange,
                                    current: this.state.pageInfo.currentPage,
                                    pageSize: this.state.pageInfo.pageSize,
                                    total: this.state.pageInfo.total,
                                }} />
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
