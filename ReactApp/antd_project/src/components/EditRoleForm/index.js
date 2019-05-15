import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    Tree, Spin, Upload, Icon, message, InputNumber, Select
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

export default class EditRoleForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            loading: false,
            //系统的所有权限
            permissionList: null,
            //表单验证
            validateList: [],
            //选中的父节点
            halfCheckedKeys: [],
            formData: {},
        }
    }

    componentDidMount() {

    }

    /**
     * 当props属性值变化时，执行。
     */
    componentWillReceiveProps(newProps) {
        console.log("newProps:", newProps);
        if (JSON.stringify(newProps.editFormData) !== "{}") {
            this.setState({
                formData: newProps.editFormData,
            })
        }
    }

    /**
     * 当props的值改变时，调用此方法。同时setState()也会调用此方法。
     */
    componentDidUpdate(prevProps) {
        // console.log("prevProps", prevProps);
        // if (!this.state.permissionList) {
        //     this.setState({
        //         permissionList: this.props.permissionList,
        //     })
        // }

        //清空上次输入的内容。
        if (!this.props.visible) {
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
            remark: "",
            perms: "",
            permissionIds: []
        }
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            //将父节点加入 选中的permissionIds 
            tempFormData.permissionIds = tempFormData.permissionIds.concat(this.state.halfCheckedKeys)
            if (!this.roleValidate(tempFormData)) {
                return;
            }
            this.props.onOk(tempFormData)//执行父组件的方法
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
        if (tempFormData.perms === "") {
            vd[1] = {
                validateStatus: "error",
                help: "请输入角色标识"
            }
            result = false;
        }
        if (tempFormData.permissionIds === undefined || tempFormData.permissionIds.length == 0) {
            vd[3] = {
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
        if (!this.props.loading) {
            if (this.props.onCancel) {
                this.props.onCancel()
            }
        }
    }

    handleChangeColorComplete = (color) => {
        let tempFormData = this.state.formData;
        tempFormData.themecolor = color.hex
        this.setState({
            defalutThemeColor: color.hex,
            formData: tempFormData,
        })
    }

    // onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // }

    onTreeSelected = (checkedKeys, info) => {
        let tempFormData = this.state.formData;
        // checkedKeys = checkedKeys.concat(info.halfCheckedKeys) //合并子节点和父节点

        tempFormData.permissionIds = checkedKeys;
        // console.log("permissionIds:", tempFormData.permissionIds)
        this.setState({
            halfCheckedKeys: info.halfCheckedKeys,
            formData: tempFormData,
        })
    }

    render() {

        const { validateList, permissionList } = this.state;

        return (
            <Modal
                visible={this.props.visible}
                title="编辑角色"
                onOk={this.handleOk}
                onCancel={this.handleCancel} //关闭窗口的按钮
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
                ]}
            >
                <Spin spinning={this.props.loading}>
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
                        <Form.Item label="角色标识" {...validateList[1]}>
                            <div>
                                <Input placeholder="请输入名称" maxLength={32} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.perms = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.perms} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色描述" {...validateList[2]}>
                            <div>
                                <Input placeholder="请输入名称" maxLength={32} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.remark = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.remark} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色授权" {...validateList[3]}>
                            <div>
                                <Row className="role_modalRow">
                                    <Col span={24}>
                                        <Tree
                                            checkable
                                            checkedKeys={this.state.formData.permissionIds}
                                            onCheck={this.onTreeSelected}>
                                            {
                                                (this.props.permissionList) ?
                                                    this.props.permissionList.map((item) => {
                                                        return (
                                                            <TreeNode title={item.name} key={item.id}>
                                                                {
                                                                    (item.children) ?
                                                                        item.children.map((c_item) => {
                                                                            return (
                                                                                <TreeNode title={c_item.name} key={c_item.id}></TreeNode>
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
