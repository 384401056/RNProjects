import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tag, Spin, Icon, message,
} from 'antd';
import axios from 'axios'
import CreateRoleForm from '../../components/CreateRoleForm'

const confirm = Modal.confirm;
const { TreeNode } = Tree;

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
            modalLoading: false,
            hasAuth: false,
            createVisible: false,
            confirmLoading: false,
            visible: false, //模态窗口的显示与否
            editVisible: false, //模态窗口的显示与否
            authVisible: false,
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
                    console.log("record:");
                    return (
                        record.permissionList.map((item) => (
                            <Tag color="green">{item.name}</Tag>
                        ))
                    )
                }
            },
            {
                title: "操作",
                width: '20%',
                key: "",
                render: (text, record) => {
                    return (
                        <div>
                            <Button className="role_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                            <Button className="role_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
                            <Button type="primary" onClick={this.authBtnClick.bind(this, record)}>授权</Button>
                        </div>
                    );
                },
            }
            ]
        }
    }

    componentDidMount() {
        console.log("componentDidMount Role");
        this.setState({
            //根据当前用户是否有访问此组件的权限
            hasAuth: global.constants.checkPermission("/manager/role"),
        });
        this.getRoleList(this.state.pageInfo.defaultCurrent);
        this.getPermissionListNoPage();
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
                    permissionList: res.data.data,
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
     * 授权按钮
     * @param {*} record 
     */
    authBtnClick(record) {
        this.setState({
            authVisible: true,
        });
    }

    createHandleOk = () => {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
            this.setState({ confirmLoading: false, createVisible: false });
            message.success('添加角色成功。');
        }, 3000);
    }

    createHandleCancel = () => {
        this.setState({ createVisible: false });
    }

    /**
     * 删除按钮
     * @param {*} record 
     */
    deleteBtnClick(record) {
        return (confirm({
            title: '你确定要删除这个角色吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!')).then(() => {
                    message.success('删除角色成功。');
                })
            },
            onCancel() {
                console.log('Cancel');
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
    //授权窗口“确定”按钮事件
    authHandleOk = () => {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
            this.setState({ confirmLoading: false, authVisible: false });
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
                <Row className="role_modalRow">
                    <Col span={6}>
                        <div className="role_modalCol">
                            <h4>角色名称:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" />
                        </div>
                    </Col>
                </Row>
                <Row className="role_modalRow">
                    <Col span={6}>
                        <div className="role_modalCol">
                            <h4>角色标识:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" />
                        </div>
                    </Col>
                </Row>
                <Row className="role_modalRow">
                    <Col span={6}>
                        <div className="role_modalCol">
                            <h4>角色描述:</h4>
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


    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }

    //授权角色模态框，中的内容
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


    render() {
        const { createVisible, confirmLoading, hasAuth, authVisible } = this.state;

        if (hasAuth) {
            return (
                <div className="role_wrap">
                    <Row className="role_top">
                        {/* 创建模块按钮 */}
                        <Button type="primary" onClick={this.createBtnClick}>创建角色</Button>

                        {/* 创建角色的modal窗口 */}

                        <CreateRoleForm
                            permissionList={this.state.permissionList}
                            visible={createVisible}
                            loading={this.state.modalLoading}
                            onOk={this.createHandleOk}
                            onCancel={this.createHandleCancel}
                        />

                        {/* <Modal
                            visible={createVisible}
                            title="创建角色"
                            onOk={this.createHandleOk}
                            onCancel={this.createHandleCancel}
                            footer={[
                                <Button key="back" onClick={this.createHandleCancel}>取消</Button>,
                                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.createHandleOk}>保存</Button>,
                            ]}>
                            {this.createRoleModalView()}
                        </Modal>
                        
                        <Modal
                            visible={authVisible}
                            title="角色授权"
                            onOk={this.authHandleOk}
                            onCancel={this.authHandleCancel}
                            footer={[
                                <Button key="back" onClick={this.authHandleCancel}>取消</Button>,
                                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.authHandleOk}>保存</Button>,
                            ]}>
                            {this.authModalView()}
                        </Modal> */}


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
