import React, { Component } from 'react'
import './index.less';
import {
    Row, Col, Button, Table, Modal, Radio, Input,
    TreeSelect, Tabs, Upload, Icon, message, InputNumber,
} from 'antd'

const confirm = Modal.confirm;
export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasAuth: false, //是否有访问此页面的权限
            confirmLoading: false, //确定按钮的加载动作
            visible: false, //模态窗口的显示与否
            imageUrl: "",
            data: [
                {
                    id: "1",
                    title: "这是一张图片",
                    img_url: "http://ynrl-images.oss-cn-shenzhen.aliyuncs.com/banner/WechatIMG12.png",
                    sort: 0,
                }, {
                    id: "2",
                    title: "这是二张图片",
                    img_url: "http://ynrl-images.oss-cn-shenzhen.aliyuncs.com/banner/WechatIMG31.png",
                    sort: 1,
                }, {
                    id: "3",
                    title: "这是三张图片",
                    img_url: "http://ynrl-images.oss-cn-shenzhen.aliyuncs.com/banner/WechatIMG32.png",
                    sort: 2,
                }
            ],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    width: '2%',
                    key: 'id',
                    align: 'center',
                }, {
                    title: '描述',
                    dataIndex: 'title',
                    key: 'title',
                    width: '15%',
                    align: 'center',
                }, {
                    title: '图片预览',
                    dataIndex: 'img_url',
                    width: '15%',
                    key: 'img_url',
                    align: 'center',
                    render: (text, record) => {
                        return (
                            <img alt={record.img_url} style={{ width: '50%' }} src={record.img_url} />
                        );
                    },
                },
                {
                    title: '序号',
                    dataIndex: 'sort',
                    width: '5%',
                    key: 'sort',
                    align: 'center',
                },
                {
                    title: "操作",
                    width: '12%',
                    key: "",
                    align: 'center',
                    render: (text, record) => {
                        return (
                            <div>
                                <Button className="module_editBtn" onClick={this.editBtnClick.bind(this, record)} >修改</Button>
                                <Button type="danger" onClick={this.deleteBtnClick.bind(this, record)}>删除</Button>
                            </div>
                        );
                    },
                }
            ],
        }
    }

    componentDidMount() {
        this.setState({
            hasAuth: true,
        })
    }

    handleOk = () => {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
            this.setState({ confirmLoading: false, visible: false });
            message.success('添加轮播图成功。');
        }, 3000);
    }

    handleCancel = () => {
        if(!this.state.confirmLoading){
            this.setState({
                visible: false,
            })
        }
    }


    /**
     * 新建banner的
     */
    createBanner = () => {

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
                            <h4>描述信息:</h4>
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

    /**
     * 编辑按钮
     * @param {} record 
     */
    editBtnClick(record) {
        console.log("编辑")
        console.log(record);
        this.setState({
            createVisible: true,
        });
    }

    /**
     * 删除按钮
     * @param {*} record 
     */
    deleteBtnClick(record) {
        return (confirm({
            title: '你确定要删除这个轮播图吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!')).then(() => {
                    message.success('删除角色成功。');
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        }))
    }

    /**
     * 创建新的轮播图
     */
    createBtnClick = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        const { visible, confirmLoading, hasAuth } = this.state;
        if (hasAuth) {
            return (
                <div className="module_wrap">
                    <Row className="module_top">
                        {/* 创建模块按钮 */}
                        <Button type="primary" onClick={this.createBtnClick}>添加新轮播图</Button>

                        {/* 创建模块的modal窗口 */}
                        <Modal
                            visible={visible}
                            title="创建轮播图"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>保存</Button>,
                            ]}>
                            {this.createBanner()}
                        </Modal>
                    </Row>

                    {/* 模块列表 */}
                    <Row className="module_tab">
                        <Table
                            columns={this.state.columns}
                            dataSource={this.state.data} scroll={{ y: 580 }}
                            pagination={{ pageSize: 10 }} />
                    </Row>

                </div>
            )
        }
        return (
            <div className="nomatch_wrap">
                无访问权限
            </div>
        )
    }
}
