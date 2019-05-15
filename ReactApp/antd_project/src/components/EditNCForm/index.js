import React, { Component } from 'react'
import './index.less';
import {
    Form, Button, Modal, Input, Tree, Spin
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

export default class EditNCForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            loading: false,
            //系统的所有权限
            permissionList: null,
            //表单验证
            validateList: [],
            formData: {
                name: "",
                code: "",
                url: "",
            }
        }
    }

    componentDidMount() {

    }


    componentWillReceiveProps(newProps){
        // console.log("newProps:", newProps);
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
        //清空上次输入的内容。
        // if (!this.props.visible) {
        //     this.clearFormData();
        //     this.state.validateList = [];//清空验证信息
        // }
    }


    /**
     * 清空上次填写的内容。
     */
    clearFormData = () => {
        this.state.formData = {
            name: "",
            code: "",
            url: "",
        }
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        console.log("handleOk")
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            if (!this.ncValidate(this.state.formData)) {
                return;
            }
            this.props.onOk(this.state.formData)
        }
    }

    /**
     * 输入校验
     */
    ncValidate = (tempFormData) => {
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
        if (tempFormData.code === "") {
            vd[1] = {
                validateStatus: "error",
                help: "请输入编码"
            }
            result = false;
        }
        if (tempFormData.url === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请输入地址"
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
        checkedKeys = checkedKeys.concat(info.halfCheckedKeys) //合并子节点和父节点
        tempFormData.permissionIds = checkedKeys;
        // console.log("permissionIds:", tempFormData.permissionIds)
        this.setState({
            formData: tempFormData,
        })
    }

    afterClose = ()=>{
        //清空上次输入的内容。
        if (!this.props.visible) {
            this.clearFormData();
            this.state.validateList = [];//清空验证信息
        }
    }


    render() {
        const { validateList, permissionList } = this.state;

        return (
            <Modal
                visible={this.props.visible}
                title="编辑NC客户"
                onOk={this.handleOk}
                onCancel={this.handleCancel} //关闭窗口的按钮
                maskClosable={false}
                afterClose = {this.afterClose}
                // footer={[
                //     <Button key="back" onClick={this.handleCancel}>取消</Button>,
                //     <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
                // ]}
            >
                <Spin spinning={this.props.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="NC客户名称" 
                        {...validateList[0]}>
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
                        <Form.Item label="集团编码" 
                        {...validateList[1]}>
                            <div>
                                <Input placeholder="请输入编码" maxLength={32} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.code = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.code} />
                            </div>
                        </Form.Item>
                        <Form.Item label="NC地址" 
                        {...validateList[2]}>
                            <div>
                                <Input placeholder="请输入地址" onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.url = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.url} />
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
