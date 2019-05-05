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

export default class EditPmsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            treeSelectvalue: "",
            permissionParentList: null,
            //表单验证
            validateList: [],
            formData: {}
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
            this.state.validateList = [];//清空验证信息
        }
    }



    /**
    * 父级模块的选择
    */
    treeSelectOnChange = (val) => {
        console.log(val);
        let tempFormData = this.props.editFormData;
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
        if (this.props.onOk) {
            let tempFormData = this.props.editFormData;
            tempFormData.sort = this.props.editFormData.sort.toString();
            tempFormData.type = this.props.editFormData.type;
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
            // this.setState({
            //     formData: tempFormData,
            // },
            //     () => {
            //         this.props.onOk(this.props.editFormData);
            //     }
            // )
            this.props.onOk(tempFormData);
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
        if (tempFormData.url === "") {
            vd[2] = {
                validateStatus: "error",
                help: "请输入路由地址!"
            }
        }
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
        const {validateList } = this.state;

        return (
            <Modal
                visible={this.props.visible}
                title="编辑权限"
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
                                <RadioGroup value={this.props.editFormData.type} disabled={true}>
                                    <Radio value={0}>目录</Radio>
                                    <Radio value={1}>菜单</Radio>
                                </RadioGroup>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="名称"
                            {...validateList[0]}>
                            <Input placeholder="请输入名称" onChange={(e) => {
                                let tempFormData = this.props.editFormData;
                                tempFormData.name = e.target.value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.props.editFormData.name} />
                        </Form.Item>


                        <Form.Item
                            label="父级目录"
                            {...validateList[1]}>
                            <div>
                                <Select
                                    // defaultValue=""
                                    value={this.props.editFormData.parentName}
                                    disabled={this.props.editFormData.type == 0}
                                    onChange={this.treeSelectOnChange}>
                                    {
                                        (this.props.permissionParentList) ?
                                            this.props.permissionParentList.map((item) => {
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
                            <Input placeholder="以'/'开头"
                                disabled={this.props.editFormData.type == 0 && (this.props.editFormData.url == null || this.props.editFormData.url == "")}
                                onChange={(e) => {
                                    let tempFormData = this.props.editFormData;
                                    tempFormData.url = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.props.editFormData.url} />
                        </Form.Item>

                        <Form.Item
                            label="图标名称"
                            {...validateList[3]}>
                            <Input placeholder="https://ant.design/中的图标名" disabled={this.props.editFormData.type == 1}
                                onChange={(e) => {
                                    let tempFormData = this.props.editFormData;
                                    tempFormData.icon = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.props.editFormData.icon} />
                        </Form.Item>

                        <Form.Item
                            label="排序"
                            validateStatus=""
                            help="">
                            <InputNumber min={0} defaultValue={0} max={1000}
                                onChange={(value) => {
                                let tempFormData = this.props.editFormData;
                                console.log("value:", value);
                                tempFormData.sort = value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.props.editFormData.sort} />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
