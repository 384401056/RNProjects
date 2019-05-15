import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    TreeSelect, Spin, Upload, Icon, message, InputNumber, Select
} from 'antd'
import axios from 'axios'

const RadioGroup = Radio.Group;
const { Option } = Select;
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

export default class CreatePmsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            treeSelectvalue: "",
            pmsType: 0,
            permissionParentList: null,
            //表单验证
            validateList: [],
            formData: {
                type: null,
                name: "",
                parentId: "0",
                parentName: "",
                url: "",
                sort: 0,
                icon: "",
            }
        }
    }


    componentDidMount() {

    }


    componentDidUpdate(prevProps) {

        if (!this.state.permissionParentList) {
            this.setState({
                permissionParentList: this.props.permissionParentList,
            })
        }

        //清空上次输入的内容。
        if (!this.props.visible) {
            this.clearFormData();
            this.state.pmsType = 0;
            this.state.defalutThemeColor = "#f44336";
            this.state.treeSelectvalue = "";
            this.state.validateList = [];//清空验证信息
        }
    }

    /**
     * 清空表单数据。
     */
    clearFormData = () => {
        this.state.formData = {
            type: null,
            name: "",
            parentId: "0",
            parentName: "",
            url: "",
            sort: 0,
            icon: "",
        }
    }

    /**
    * 父级模块的选择
    */
    treeSelectOnChange = (val) => {
        console.log(val);
        let tempFormData = this.state.formData;
        this.props.permissionParentList.map((item) => {
            if (item.id == val) {
                tempFormData.parentId = item.id;
                tempFormData.parentName = item.name;
            }
        })
        this.setState({
            treeSelectvalue: val,
            formData: tempFormData,
        });
    }


    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        console.log("CreatePmsForm handleOk");
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            tempFormData.sort = tempFormData.sort.toString();
            tempFormData.type = this.state.pmsType.toString();
            console.log("tempFormData", tempFormData)
            if (tempFormData.type == 0) {
                if (!this.dirValidate(tempFormData)) {
                    return;
                }
                tempFormData.parentId = "0";
                tempFormData.parentName = null;
            } else if (tempFormData.type == 1) {
                if (!this.menuValidate(tempFormData)) {
                    return;
                }
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
 * 取消 按钮事件
 */
    handleCancel = () => {
        //如果正在加载，不允许取消
        if (!this.props.loading) {
            if (this.props.onCancel) {
                this.props.onCancel()
            }
        }
    }


    /**
     * 目录类型的输入校验
     */
    dirValidate = (tempFormData) => {
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
        // if (tempFormData.url === "") {
        //     vd[2] = {
        //         validateStatus: "error",
        //         help: "请输入路由地址!"
        //     }
        // }
        if (tempFormData.icon === "") {
            vd[3] = {
                validateStatus: "error",
                help: "请输入图标名称!"
            }
            result = false;
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }


    menuValidate = (tempFormData) => {
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
        if (tempFormData.parentName === "") {
            vd[1] = {
                validateStatus: "error",
                help: "请选择父级权限!"
            }
        }
        if (tempFormData.url === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请输入路由地址!"
            }
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }


    render() {
        const { treeSelectvalue, pmsType, validateList } = this.state;
        const { permissionParentList } = this.props

        return (
            <Modal
                visible={this.props.visible}
                title="创建权限"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
                ]}
            >

                <Spin spinning={this.props.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="类型">
                            <div>
                                <RadioGroup
                                    onChange={(e) => {
                                        this.state.validateList = [];
                                        this.clearFormData();
                                        let tempFormData = this.state.formData;
                                        tempFormData.type = e.target.value;
                                        this.setState({
                                            pmsType: tempFormData.type,
                                        })
                                    }}
                                    value={this.state.pmsType}
                                >
                                    <Radio value={0}>目录</Radio>
                                    <Radio value={1}>菜单</Radio>
                                </RadioGroup>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="名称"
                            {...validateList[0]}>
                            <Input placeholder="请输入名称" maxLength={32} onChange={(e) => {
                                let tempFormData = this.state.formData;
                                tempFormData.name = e.target.value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.state.formData.name} />
                        </Form.Item>


                        <Form.Item
                            label="父级目录"
                            {...validateList[1]}>
                            <div>
                                <Select
                                    // defaultValue=""
                                    value={treeSelectvalue}
                                    disabled={pmsType == 0}
                                    onChange={this.treeSelectOnChange}>
                                    {
                                        (permissionParentList) ?
                                            permissionParentList.map((item) => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            }) : <Option value="" key="">无数据</Option>
                                    }
                                </Select>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="路由地址"
                            {...validateList[2]}>
                            <Input placeholder="目录为空，菜单以'/'开头输入。" maxLength={32}
                                onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.url = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.url} />
                        </Form.Item>

                        <Form.Item
                            label="图标名称"
                            {...validateList[3]}>
                            <Input placeholder="https://ant.design/中的图标名" maxLength={32}
                                disabled={pmsType == 1}
                                onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.icon = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.icon} />
                        </Form.Item>

                        <Form.Item
                            label="排序"
                            validateStatus=""
                            help="">
                            <InputNumber min={0} defaultValue={0} max={1000}
                                onChange={(value) => {
                                    let tempFormData = this.state.formData;
                                    console.log("value:", value);
                                    tempFormData.sort = value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.sort} />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
