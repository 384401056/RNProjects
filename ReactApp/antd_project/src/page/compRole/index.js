import React, { Component } from 'react'
import './index.less';
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tabs, Upload, Icon, message,
} from 'antd';
import '../../commont/config'

const confirm = Modal.confirm;
const { TreeNode } = Tree;

export default class CompRole extends Component {

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
                    name: '报销管理',
                    age: 'BX',
                    address: '有此权限的企业可进行报销'
                },
                {
                    key: 2,
                    name: '人力资源管理',
                    age: 'HR',
                    address: '有此权限的企业可进行人力资源操作'
                },
                {
                    key: 3,
                    name: '供应链管理',
                    age: 'LINK',
                    address: '有此权限的企业可进行供应链管理'
                }
            ],
            columns: [{
                title: 'ID',
                dataIndex: 'key',
                width: '5%',
                key: 'id',
                align: 'center',
            }, {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
                align: 'center',
            }, {
                title: '角色标识',
                dataIndex: 'age',
                width: '10%',
                key: 'age',
                align: 'center',
            },
            {
                title: '描述信息',
                dataIndex: 'address',
                width: '10%',
                key: 'address',
                align: 'center',
            },
            {
                title: "操作",
                width: '15%',
                key: "",
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Button className="cr_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                            <Button className="cr_editBtn" type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
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
     * 创建角色按钮事件
     */
    createBtnClick = () => {
        this.setState({
            createVisible: true,
        });
    }

    componentDidMount() {
        this.setState({
            hasAuth: global.constants.checkPermission("/company/role"),
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
                <Row className="cr_modalRow">
                    <Col span={6}>
                        <div className="cr_modalCol">
                            <h4>角色名称:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" />
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
                            <Input placeholder="" />
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
                            <Input placeholder="" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }


    //授权角色模态框，中的内容
    authModalView = () => {
        return (
            <div>
                <Row className="cr_modalRow">
                    <Col span={24}>
                        <Tree
                            checkable
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}>
                            <TreeNode title="报销模块" key="0-1">
                                <TreeNode title="通用报销单" key="0-0-0"></TreeNode>
                                <TreeNode title="差旅报销单" key="0-0-1"></TreeNode>
                                <TreeNode title="招待报销单" key="0-0-2"></TreeNode>
                            </TreeNode>
                            <TreeNode title="付款模块" key="0-2">
                                <TreeNode title="付款结算" key="2-0-0"></TreeNode>
                            </TreeNode>
                            <TreeNode title="借款模块" key="0-3">
                                <TreeNode title="借款单" key="3-0-0"></TreeNode>
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
                <div className="cr_wrap">
                    <Row className="cr_top">
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
                    <Row className="cr_tab">
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
