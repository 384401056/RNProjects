import React, { Component } from 'react'
import './index.less';
import {
    Row, Button, Table, Modal, Radio, Input, Col,
    TreeSelect, Tabs, Upload, Icon, message, InputNumber,
} from 'antd'


const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class CreateModule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            treeSelectvalue: "",
            value: 1,
            loading: false,
            visible: false,
            imageUrl: "",
        }
    }

    componentDidMount() {

    }

    radioOnChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    treeSelectOnChange = (val) => {
        console.log(val);
        this.setState({
            treeSelectvalue: val
        });
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    uploadHandChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    inputNumOnChange = (value) => {
        console.log('changed', value);
    }

    render() {
        const { imageUrl } = this.state;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div>上传</div>
            </div>
        );

        return (
            <div>
                <Row className="cm_modalRow">
                    <Col span={6}>
                        <div className="cm_modalCol">
                            <h4>类型:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <RadioGroup onChange={this.radioOnChange} value={this.state.value}>
                                <Radio value={0}>模块</Radio>
                                <Radio value={1}>单据</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
                <Row className="cm_modalRow">
                    <Col span={6}>
                        <div className="cm_modalCol">
                            <h4>模块名称:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" />
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
                                disabled={this.state.value == 0}
                                style={{ width: 200 }}
                                value={this.state.treeSelectvalue}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                treeDefaultExpandAll
                                onChange={this.treeSelectOnChange}>
                                <TreeNode value="1" title="parent 1" key="0-1" />
                                <TreeNode value="2" title="parent 2" key="0-2" />
                                <TreeNode value="3" title="parent 3" key="0-3" />
                                <TreeNode value="4" title="parent 4" key="0-4" />
                                <TreeNode value="5" title="parent 5" key="0-5" />
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
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={this.beforeUpload}
                                onChange={this.uploadHandChange}>
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
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
                            <Input placeholder="" />
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
                            <Input placeholder="" disabled={this.state.value == 1}/>
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
                            <Input placeholder="" disabled={this.state.value == 0}/>
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
                            <Input placeholder="" disabled={this.state.value == 0}/>
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
                            <InputNumber min={0} defaultValue={0} max={1000} onChange={this.inputNumOnChange} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
