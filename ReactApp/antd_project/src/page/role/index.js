import React, { Component } from 'react'
import './index.less';
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tabs, Upload, Icon, message,
} from 'antd';

const confirm = Modal.confirm;
const { TreeNode } = Tree;

export default class Role extends Component {


    constructor(props) {
        super(props);

        this.state = {
            hasAuth: false,
            createVisible: false,
            confirmLoading: false,
            authVisible: false,
            data: [
                {
                    key: 1,
                    name: '超级管理员',
                    age: 'SUPER_ADMIN',
                    address: 'root用户'
                },
                {
                    key: 2,
                    name: '企业管理员',
                    age: 'COMP_ADMIN',
                    address: '企业管理员'
                },
                {
                    key: 3,
                    name: '数据管理员',
                    age: 'DATA_ADMIN',
                    address: '数据管理员'
                }
            ],
            columns: [{
                title: 'ID',
                dataIndex: 'key',
                width: '5%',
                key: 'id',
            }, {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width: '12%',
            }, {
                title: '角色标识',
                dataIndex: 'age',
                width: '12%',
                key: 'age',
            },
            {
                title: '描述信息',
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

    componentDidMount() {
        this.setState({
            hasAuth: true
        })
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
                        <Modal
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
                        </Modal>
                    </Row>

                    {/* 模块列表 */}
                    <Row className="role_tab">
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
