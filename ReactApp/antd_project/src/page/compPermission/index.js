import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
    Row, Col, Button, Table, Modal, TreeSelect, Input,
    Tabs, Upload, Icon, message,
} from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default class CompPermission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasAuth: false,
            createVisible: false,
            confirmLoading: false,
            authVisible: false,
            data: [],
            treeData: [
                {
                    title: "云报销",
                    value: "1",
                    key: Math.random(),
                    children: [
                        {
                            title: "通用费用报销",
                            value: "11",
                            key: Math.random(),
                        },
                        {
                            title: "交通报销",
                            value: "12",
                            key: Math.random(),
                        },
                        {
                            title: "通讯报销",
                            value: "13",
                            key: Math.random(),
                        },
                    ]
                }, {
                    title: "付结",
                    value: "2",
                    key: Math.random(),
                }, {
                    title: "借款",
                    value: "3",
                    key: Math.random(),
                }
            ],
            treeValue: [],
            columns: [{
                title: '企业ID',
                dataIndex: 'source_id',
                width: '10%',
                key: 'source_id',
                align: 'center',
            }, {
                title: '企业名称',
                dataIndex: 'name',
                width: '10%',
                key: 'name',
                align: 'center',
            }, {
                title: "同步时间",
                dataIndex: 'create_time',
                width: "20%",
                key: 'create_time',
                align: 'center',
            },
            {
                title: "操作",
                width: '10%',
                key: '',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={this.authCompBtnClick.bind(this, record)}>模块授权</Button>
                        </div>
                    );
                },
            }
            ]
        }
    }


    componentDidMount() {
        let datalist = [];
        for (let i = 0; i < 20; ++i) {
            datalist.push({
                source_id: i,
                name: '云南若邻科技有限公司',
                create_time: "2019-01-11 10:14:43",
            });
        }
        this.setState({
            data: datalist,
            hasAuth: global.constants.checkPermission("/company/setRole"),
        })
    }


    authCompBtnClick = (record) => {
        console.log(record);
        this.setState({
            authVisible: true
        })
    }



    treeSelectOnChange = (value) => {
        console.log('onChange ', value);
        this.setState({ treeValue: value });
    }

    /**
     * 授权模态框的视图
     */
    authCompModalView = () => {
        const tProps = {
            treeData: this.state.treeData,
            value: this.state.treeValue,
            onChange: this.treeSelectOnChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '选择要授权的模块',
            style: {
                width: 300,
            },
        }

        return (
            <div className="cp_space">
                <Row className="cp_modalRow">
                    <Col span={6}>
                        <div className="cp_modalCol">
                            <h4>选择授权模块:</h4>
                        </div>
                    </Col>
                </Row>
                <Row className="cp_modalRow">
                    <TreeSelect {...tProps} />
                </Row>
            </div>
        )
    }


    authHandleOk = () => {
        this.setState({ confirmLoading: true });
        setTimeout(() => {
            this.setState({ confirmLoading: false, authVisible: false });
            message.success('模块授权成功。');
        }, 3000);
    }

    authHandleCancel = () => {
        if (!this.state.confirmLoading) {
            this.setState({ authVisible: false });
        }
    }

    render() {
        const { hasAuth, columns, data, authVisible, confirmLoading } = this.state;

        if (hasAuth) {
            return (
                <div className="cp_wrap">
                    <Modal
                        visible={authVisible}
                        title="企业模块授权"
                        onOk={this.authHandleOk}
                        onCancel={this.authHandleCancel}
                        footer={[
                            <Button key="back" onClick={this.authHandleCancel}>取消</Button>,
                            <Button key="submit" type="primary" loading={confirmLoading} onClick={this.authHandleOk}>模块授权</Button>,
                        ]}>
                        {this.authCompModalView()}
                    </Modal>

                    {/* 列表 */}
                    <Row className="cp_tab">
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 10 }}
                        />
                    </Row>
                </div>
            )
        }
        return (
            <div className="cp_wrap">
                无访问权限
            </div>
        )
    }
}
