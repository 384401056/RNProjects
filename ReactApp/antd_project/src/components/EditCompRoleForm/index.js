import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Modal, Input, Col, Tree, Spin,
} from 'antd'
import axios from 'axios'

const { TreeNode } = Tree;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

export default class EditCompRoleForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            //当前用户的所有权限
            userModuleList: null,
            visible: false,
            loading: false,
            //表单验证
            validateList: [],
            //选中的父节点
            halfCheckedKeys:[],
            userInfo:[],
            formData: {
                name: "",
                userId: "",
                moduleIds:[],
                //选择的权限id列表
                moduleList: []
            }
        }
    }

    componentDidMount() {

    }


    componentWillReceiveProps(newProps){
        console.log("newPorps:", newProps);
        this.setState({
            userModuleList: newProps.userModuleList,
            visible: newProps.visible,
            loading: newProps.loading,
            userInfo: newProps.userInfo,
            formData: newProps.data,
        })
    }

    /**
     * 当props的值改变时，调用此方法。同时setState()也会调用此方法。
     */
    componentDidUpdate(prevProps) {
        //清空上次输入的内容。
        if (!this.state.visible) {
            this.clearFormData();
            this.state.validateList = [];//清空验证信息
        }
    }


    /**
     * 清空上次填写的内容。
     */
    clearFormData = () => {
        this.state.formData = {
            name: "",
            //选择的权限id列表
            moduleList: [],
        }
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            if (!this.roleValidate(this.state.formData)) {
                return;
            }
            // //将父节点加入 选中的permissionIds 
            tempFormData.moduleIds = tempFormData.moduleIds.concat(this.state.halfCheckedKeys);
            tempFormData.userId = this.state.userInfo.id;//设置用户id
            this.props.onOk(tempFormData)
        }
    }

    /**
     * 输入校验
     */
    roleValidate = (tempFormData) => {
        this.state.validateList = [];//清空验证信息
        let result = true;
        let vd = this.state.validateList;
        if (tempFormData.name === "") {
            vd[0] = {
                validateStatus: "error",
                help: "请输入名称"
            }
            result = false;
        }
        if (tempFormData.moduleIds === undefined || tempFormData.moduleIds.length == 0) {
            vd[1] = {
                validateStatus: "error",
                help: "请选择角色的权限!"
            }
            result = false;
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }


    /**
     * 取消按钮事件
     */
    handleCancel = () => {
        //如果正在加载，不允许取消
        if (!this.state.loading) {
            if (this.props.onCancel) {
                this.props.onCancel()
            }
        }
    }


    /**
     * 树型选择事件.s
     */
    onTreeSelected = (checkedKeys, info) => {
        let tempFormData = this.state.formData;
        tempFormData.moduleIds = checkedKeys;
        this.setState({
            halfCheckedKeys: info.halfCheckedKeys,
            formData: tempFormData,
        })
    }

    render() {
        const { validateList } = this.state;

        return (
            <Modal
                visible={this.state.visible}
                title="创建角色"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                >
                <Spin spinning={this.state.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="角色名称" {...validateList[0]}>
                            <div>
                                <Input placeholder="请输入名称" maxLength={32} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.name = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.name} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色授权" {...validateList[1]}>
                            <div>
                                <Row className="role_modalRow">
                                    <Col span={24}>
                                        <Tree
                                            ref = "tree"
                                            checkable
                                            checkedKeys = {this.state.formData.moduleIds}
                                            onCheck={this.onTreeSelected}>
                                            {
                                                (this.state.userModuleList) ?
                                                    this.state.userModuleList.map((item) => {
                                                        return (
                                                            <TreeNode title={item.moduleName} key={item.id}>
                                                                {
                                                                    (item.children) ?
                                                                        item.children.map((c_item) => {
                                                                            return (
                                                                                <TreeNode title={c_item.moduleName} key={c_item.id}></TreeNode>
                                                                            )
                                                                        }) : null
                                                                }
                                                            </TreeNode>
                                                        )
                                                    }) : null
                                            }
                                        </Tree>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
