import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    Tree, Spin, Table, Icon, message, InputNumber, Select
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

const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

export default class EditBillTypeForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageInfo: {
                defaultCurrent: 1,
                currentPage: 0,
                pageSize: 0,
                total: 0
            },
            editStatus: false,
            loading: false,
            //系统的所有权限
            permissionList: null,
            //表单验证
            validateList: [],
            //选中的父节点
            halfCheckedKeys: [],
            billTypeList: [],
        }
    }

    componentDidMount() {

    }

    /**
     * 当props属性值变化时，执行。
     */
    componentWillReceiveProps(newProps) {
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
            if (!this.roleValidate(tempFormData)) {
                return;
            }
            this.props.onOk(tempFormData)//执行父组件的方法
        }
    }

    /**
     * 输入校验
     */
    billTypeValidate = (tempFormData) => {
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


    render() {

        const { validateList, permissionList } = this.state;

        return (
            <Modal
                visible={this.props.visible}
                title="编辑角色"
                onOk={this.handleOk}
                onCancel={this.handleCancel} //关闭窗口的按钮
                maskClosable={false}
                width={900}
            >
                <Spin spinning={this.props.loading}>
                    <Table
                        rowKey={record => record.id}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={{
                            defaultCurrent: this.state.pageInfo.defaultCurrent,
                            onChange: this.pageOnChange,
                            current: this.state.pageInfo.currentPage,
                            pageSize: this.state.pageInfo.pageSize,
                            total: this.state.pageInfo.total,
                        }}
                    />
                </Spin>
            </Modal>
        )
    }
}
