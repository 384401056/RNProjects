import React, { Component } from 'react'
import './index.less';
import {
    Row, Form, Button, Modal, Radio, Input, Col,
    TreeSelect, Spin, Upload, Icon, message, InputNumber,
} from 'antd'
import { CirclePicker, TwitterPicker } from 'react-color';
import axios from 'axios'

const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

class CreateModule extends Component {

    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            treeSelectvalue: "",
            upFileLoading: false,
            imageUrl: "",
            moduleType: 0,
            defalutThemeColor: "#f44336",
            parentModuleList: null,
            formData: {
                type: null,
                moduleName: '',
                parentId: "0",
                parentName: "",
                parentShortname: "",
                shortName: "",
                messageType: null,
                url: null,
                sort: 0,
                themecolor: null,
                themetext: null,
                isenable: 1,
                createTime: null,
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
        if (!this.state.parentModuleList) {
            this.setState({
                parentModuleList: this.props.parentModuleList,
            })
        }

        //清空上次输入的内容。
        if (!this.props.visible) {
            this.state.formData.moduleName = null;
            this.state.formData.parentId = "0";
            this.state.formData.messageType = null;
            this.state.formData.parentName = null;
            this.state.formData.parentShortname = null;
            this.state.formData.themecolor = null;
            this.state.formData.themetext = null;
            this.state.formData.sort = 0;
            this.state.formData.shortName = null;
            this.state.formData.type = null;
            this.state.formData.isenable = 1;

            this.state.imageUrl = "";
            this.state.moduleType = 0;
            this.state.defalutThemeColor = "#f44336";
            this.state.treeSelectvalue = "";
        }
    }

    /**
     * 父级模块的选择
     */
    treeSelectOnChange = (val) => {
        console.log(val);
        let tempFormData = this.state.formData;
        this.state.parentModuleList.map((item) => {
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

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }


    customRequest = (files) => {
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
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            tempFormData.createTime = new Date();
            tempFormData.icon = this.state.imageUrl;
            tempFormData.type = this.state.moduleType;
            if (tempFormData.type == 0) {
                tempFormData.parentId = "0";
                tempFormData.parentName = null;
                tempFormData.parentShortname = null;
                tempFormData.themecolor = null;
                tempFormData.themetext = null;
            } else {
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


    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
    });
    }


    render() {
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;

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
                        <div>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>类型:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <RadioGroup onChange={(e) => {
                                            let tempFormData = this.state.formData;
                                            tempFormData.type = e.target.value;
                                            this.setState({
                                                moduleType: tempFormData.type,
                                            })
                                        }} value={this.state.moduleType}>
                                            <Radio value={0}>模块</Radio>
                                            <Radio value={1}>单据</Radio>
                                        </RadioGroup>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>名称:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <Input placeholder="" onChange={(e) => {
                                            let tempFormData = this.state.formData;
                                            tempFormData.moduleName = e.target.value;
                                            this.setState({
                                                formData: tempFormData
                                            })
                                        }} value={this.state.formData.moduleName} />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>父级模块:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <TreeSelect
                                            showSearch
                                            disabled={this.state.moduleType == 0}
                                            style={{ width: 200 }}
                                            value={this.state.treeSelectvalue}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            treeDefaultExpandAll
                                            onChange={this.treeSelectOnChange}>
                                            {
                                                (this.state.parentModuleList) ?
                                                    this.state.parentModuleList.map((item) => {
                                                        return (
                                                            <TreeNode value={item.id} title={item.moduleName} key={item.id} />
                                                        )
                                                    }) : <TreeNode value="" title="无数据" key="" />

                                            }
                                        </TreeSelect>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>上传图标:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
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
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>NC类型:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="cm_input">
                                        <Input placeholder="类型编码" onChange={(e) => {
                                            let tempFormData = this.state.formData;
                                            tempFormData.shortName = e.target.value;
                                            this.setState({
                                                formData: tempFormData
                                            })
                                        }} value={this.state.formData.shortName} />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>消息类型:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <Input placeholder="消息类型编码" disabled={this.state.moduleType == 1}
                                            onChange={(e) => {
                                                let tempFormData = this.state.formData;
                                                tempFormData.messageType = e.target.value;
                                                this.setState({
                                                    formData: tempFormData
                                                })
                                            }} value={this.state.formData.messageType} />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>单据主题颜色:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        {
                                            this.state.moduleType !== 0 ? <CirclePicker
                                                disabled={this.state.moduleType == 0}
                                                color={this.state.defalutThemeColor}
                                                onChangeComplete={this.handleChangeColorComplete}
                                            /> :
                                                <Input placeholder="" disabled={this.state.moduleType == 0} />
                                        }

                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>单据主题文字:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <Input placeholder="" disabled={this.state.moduleType == 0} onChange={(e) => {
                                            let tempFormData = this.state.formData;
                                            tempFormData.themetext = e.target.value;
                                            this.setState({
                                                formData: tempFormData
                                            })
                                        }} value={this.state.formData.themetext} />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="cm_modalRow">
                                <Col span={6}>
                                    <div className="cm_modalCol">
                                        <h4>排序:</h4>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <InputNumber min={0} defaultValue={0} max={1000} onChange={(value) => {
                                            let tempFormData = this.state.formData;
                                            tempFormData.sort = value;
                                            this.setState({
                                                formData: tempFormData
                                            })
                                        }} value={this.state.formData.sort} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                </Spin>
            </Modal >
        )
    }
}

const CreateModuleForm = Form.create()(CreateModule);
export default CreateModuleForm;