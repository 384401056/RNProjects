import React, { Component } from 'react'
import './index.less';
import {
    Row, Button, Table, Modal, Radio, Input, Col,
    TreeSelect, Tabs, Upload, Icon, message, InputNumber,
} from 'antd'


const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class CreatePermission extends Component {

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
        return (
            <div>
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>类型:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <RadioGroup onChange={this.radioOnChange} value={this.state.value}>
                                <Radio value={0}>目录</Radio>
                                <Radio value={1}>菜单</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>节点名称:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder="" />
                        </div>
                    </Col>
                </Row>
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>父级节点:</h4>
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
                
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>URL:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="cp_input">
                            <Input placeholder="" />
                        </div>
                    </Col>
                </Row>
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>权限标识:</h4>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Input placeholder=""/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
