import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    TreeSelect, Spin, Upload, Icon, message, InputNumber, Select
} from 'antd'
import { CirclePicker, TwitterPicker } from 'react-color';
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

export default class CreateModuleFormByModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            treeSelectvalue: "",
            upFileLoading: false,
            imageUrl: "",
            moduleType: 0,
            defalutThemeColor: "#f44336",
            parentModuleList: null,
            //表单验证
            validateList: [],
            formData: {
                type: null,
                moduleName: "",
                parentId: "0",
                parentName: "",
                parentShortname: "",
                shortName: "",
                messageType: "",
                url: null,
                sort: 0,
                themecolor: null,
                themetext: "",
                icon: "",
            }
        }
    }

    componentDidMount() {

    }

    /**
     * 当props的值改变时，调用此方法。同时setState()也会调用此方法。
     */
    componentDidUpdate(prevProps) {

        // if (!this.state.parentModuleList) {
        //     this.setState({
        //         parentModuleList: this.props.parentModuleList,
        //     })
        // }

        //清空上次输入的内容。
        if (!this.props.visible) {
            this.clearFormData();
            this.state.imageUrl = "";
            this.state.moduleType = 0;
            this.state.defalutThemeColor = "#f44336";
            this.state.treeSelectvalue = "";
            this.state.validateList = [];//清空验证信息
        }
    }


    /**
     * 清空上次填写的内容。
     */
    clearFormData = () => {
        this.state.formData = {
            type: null,
            moduleName: "",
            parentId: "0",
            parentName: "",
            parentShortname: "",
            shortName: "",
            messageType: "",
            url: null,
            sort: 0,
            themecolor: null,
            themetext: "",
            icon: "",
        }
        this.state.imageUrl = "";
    }

    /**
     * 父级模块的选择
     */
    treeSelectOnChange = (val) => {
        console.log(val);
        let tempFormData = this.state.formData;
        this.props.parentModuleList.map((item) => {
            if (item.id == val) {
                tempFormData.parentShortname = item.shortName;
                tempFormData.parentId = item.id;
                tempFormData.parentName = item.moduleName;
            }
        })
        this.setState({
            treeSelectvalue: val,
            formData: tempFormData,
        });
    }

    /**
     * 文件上传前的条件判断方法。
     */
    beforeUpload = (file) => {
        console.log(file);
        let fileType = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp'
        ]
        const isJPG = global.constants.checkImageType(fileType, file.type);
        if (!isJPG) {
            message.error('只能上传JPEG、PNG类型的文件!');
        }
        const isLt2M = file.size / 1024 < 200;
        if (!isLt2M) {
            message.error('请上传小于200K的图片!');
        }
        return isJPG && isLt2M;
    }

    /**
     * 自定义图片上传
     */
    customRequest = (files) => {
        console.log("customRequest", files);
        const { file } = files;
        let formData = new FormData();
        formData.append("file", file);

        //发送post请求。
        axios({
            method: 'post',
            url: global.constants.url + '/file/upload',
            data: formData,
            headers: {
                'accessToken': JSON.parse(sessionStorage.getItem("token")),
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            if (res.data.code === 0) {
                message.success(res.data.msg);
                console.log("customRequest", res.data.data);
                this.setState({
                    imageUrl: res.data.data
                })
            } else {
                message.error(res.data.msg);
            }
        }).catch((err) => {
            console.log(err)
            message.error("获取数据失败,请检查网络配置!");
            this.setState({ loading: false, })
        });
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            tempFormData.sort = this.state.formData.sort==null?"":tempFormData.sort.toString();
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
            } else{
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
        // if (tempFormData.shortName === "") {
        //     vd[3] = {
        //         validateStatus: "error",
        //         help: "请输入模块编码编码!"
        //     }
        //     result = false;
        // }
        if (tempFormData.themetext === "") {
            vd[6] = {
                validateStatus: "error",
                help: "请输入单据主题文字!"
            }
            result = false;
        }
        if (tempFormData.sort === "") {
            vd[7] = {
                validateStatus: "error",
                help: "请输入序号!"
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
                help: "请输入模块编码编码!"
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
        if (tempFormData.sort === "") {
            vd[7] = {
                validateStatus: "error",
                help: "请输入序号!"
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
    otherValidate = (tempFormData) =>{
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
        if (tempFormData.sort === "") {
            vd[7] = {
                validateStatus: "error",
                help: "请输入序号!"
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

    /**
     * 表单提交按钮事件
     */
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // }


    render() {
        const { imageUrl, validateList } = this.state;
        const { parentModuleList } = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.upFileLoading ? 'loading' : 'plus'} />
                <div>上传</div>
            </div>
        );

        return (
            <Modal
                visible={this.props.visible}
                title="创建模块"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
                ]}>
                <Spin spinning={this.props.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="类型">
                            <div>
                                <RadioGroup onChange={(e) => {
                                    this.state.validateList = [];
                                    this.clearFormData();
                                    let tempFormData = this.state.formData;
                                    tempFormData.type = e.target.value;
                                    this.setState({
                                        moduleType: tempFormData.type,
                                    })
                                }} value={this.state.moduleType}>
                                    <Radio value={0}>模块</Radio>
                                    <Radio value={1}>单据</Radio>
                                    <Radio value={2}>其它</Radio>
                                </RadioGroup>
                            </div>
                        </Form.Item>
                        <Form.Item label="名称" {...validateList[0]}
                        >
                            <Input placeholder="请输入名称" maxLength={32}
                                 onChange={(e) => {
                                let tempFormData = this.state.formData;
                                tempFormData.moduleName = e.target.value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.state.formData.moduleName} />
                        </Form.Item>

                        <Form.Item
                            label="父级模块"
                            {...validateList[1]}>
                            <div>
                                <Select
                                    // defaultValue=""
                                    value={this.state.treeSelectvalue}
                                    disabled={this.state.moduleType == 0 || this.state.moduleType == 2 }
                                    onChange={this.treeSelectOnChange}>
                                    {
                                        (parentModuleList) ?
                                            parentModuleList.map((item) => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.moduleName}</Option>
                                                )
                                            }) : <Option value="" key="">无数据</Option>

                                    }
                                </Select>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="上传图标"
                            {...validateList[2]}>
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    customRequest={this.customRequest}
                                    beforeUpload={this.beforeUpload}
                                >
                                    {imageUrl ? <img width="50" height="50" src={imageUrl} alt="avatar" /> : uploadButton}
                                </Upload>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="模块编码"
                            {...validateList[3]}>
                            <Input placeholder="模块编码" maxLength={32} disabled={this.state.moduleType !== 0 }
                             onChange={(e) => {
                                let tempFormData = this.state.formData;
                                tempFormData.shortName = e.target.value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.state.formData.shortName} />
                        </Form.Item>
                        <Form.Item
                            label="消息类型"
                            {...validateList[4]}>
                            <Input placeholder="消息类型编码" maxLength={32} disabled={this.state.moduleType !== 0}
                                onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.messageType = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.messageType} />
                        </Form.Item>
                        <Form.Item
                            label="单据主题颜色">
                            <div>
                                {
                                    this.state.moduleType == 1  ? <CirclePicker
                                        color={this.state.defalutThemeColor}
                                        onChangeComplete={this.handleChangeColorComplete}
                                    /> :
                                        <Input placeholder="" disabled={this.state.moduleType !== 1} />
                                }
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="单据主题文字"
                            {...validateList[6]}>

                            <Input placeholder="" maxLength={4}
                                disabled={this.state.moduleType !== 1} onChange={(e) => {
                                let tempFormData = this.state.formData;
                                tempFormData.themetext = e.target.value;
                                this.setState({
                                    formData: tempFormData
                                })
                            }} value={this.state.formData.themetext} />


                        </Form.Item>
                        <Form.Item
                            label="排序"
                            {...validateList[7]}
                            >
                            <InputNumber min={0} defaultValue={0} max={1000} onChange={(value) => {
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
