import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    Tree, Spin, Upload, Icon, message, InputNumber, Select
} from 'antd'
import { CirclePicker, TwitterPicker } from 'react-color';
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

export default class CreateRoleForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            loading: false,
            //表单验证
            permissionList:null,
            validateList: [],
            formData: {
                name: "",
                remark: "",
                perms: "",
            }
        }
    }

    componentDidMount() {

    }

    /**
     * 当props的值改变时，调用此方法。同时setState()也会调用此方法。
     */
    componentDidUpdate(prevProps) {

        if (!this.state.permissionList) {
            this.setState({
                permissionList: this.props.permissionList,
            })
        }

        //清空上次输入的内容。
        if (!this.props.visible) {
            this.clearFormData();
            this.state.name = "";
            this.state.remark = "";
            this.state.perms = "";
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
        }
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            tempFormData.sort = tempFormData.sort.toString();
            tempFormData.icon = this.state.imageUrl;
            tempFormData.type = this.state.moduleType.toString();
            if (tempFormData.type == 0) {
                if (!this.moduleValidate(tempFormData)) {
                    return;
                }
                tempFormData.parentId = "0";
                tempFormData.parentName = null;
                tempFormData.parentShortname = null;
                tempFormData.themecolor = null;
                tempFormData.themetext = null;
            } else if (tempFormData.type == 1) {
                if (!this.billValidate(tempFormData)) {
                    return;
                }
                tempFormData.messageType = null;
            } else {
                if (!this.otherValidate(tempFormData)) {
                    return;
                }
                tempFormData.parentId = "0";
                tempFormData.parentName = null;
                tempFormData.parentShortname = null;
                tempFormData.themecolor = null;
                tempFormData.themetext = null;
                tempFormData.messageType = null;
            }
            this.setState({
                formData: tempFormData,
            },
                () => {
                    this.props.onOk(this.state.formData);
                }
            )
        }
    }

    /**
     * 单据类型的输入校验
     */
    billValidate = (tempFormData) => {
        this.state.validateList = [];//清空验证信息
        let result = true;
        let vd = this.state.validateList;
        if (tempFormData.moduleName === "") {
            vd[0] = {
                validateStatus: "error",
                help: "请输入名称"
            }
            result = false;
        }
        if (tempFormData.parentName === "") {
            vd[1] = {
                validateStatus: "error",
                help: "请选择父级模块"
            }
            result = false;
        }
        if (tempFormData.icon === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请上传图标!"
            }
            result = false;
        }
        if (tempFormData.shortName === "") {
            vd[3] = {
                validateStatus: "error",
                help: "请输入NC类型编码!"
            }
            result = false;
        }
        if (tempFormData.themetext === "") {
            vd[6] = {
                validateStatus: "error",
                help: "请输入单据主题文字!"
            }
            result = false;
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }

    /**
     * 模块类型的输入校验
     */
    moduleValidate = (tempFormData) => {
        this.state.validateList = [];//清空验证信息
        let result = true;
        let vd = this.state.validateList;
        if (tempFormData.moduleName === "") {
            vd[0] = {
                validateStatus: "error",
                help: "请输入名称"
            }
            result = false;
        }
        if (tempFormData.icon === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请上传图标!"
            }
            result = false;
        }
        if (tempFormData.shortName === "") {
            vd[3] = {
                validateStatus: "error",
                help: "请输入NC类型编码!"
            }
            result = false;
        }
        if (tempFormData.messageType === "") {
            vd[4] = {
                validateStatus: "error",
                help: "请输入消息类型!"
            }
            result = false;
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }

    /**
     * 基它类型的输入校验
     */
    otherValidate = (tempFormData) => {
        this.state.validateList = [];//清空验证信息
        let result = true;
        let vd = this.state.validateList;
        if (tempFormData.moduleName === "") {
            vd[0] = {
                validateStatus: "error",
                help: "请输入名称"
            }
            result = false;
        }
        if (tempFormData.icon === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请上传图标!"
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

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                title="创建角色"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
                ]}
            >
                <Spin spinning={this.state.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="角色名称">
                            <div>
                                <Input placeholder="请输入名称" onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.name = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.name} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色标识">
                            <div>
                                <Input placeholder="请输入名称" onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.perms = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.perms} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色描述">
                            <div>
                                <Input placeholder="请输入名称" onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.remark = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.remark} />
                            </div>
                        </Form.Item>
                        <Form.Item label="角色授权">
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
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
