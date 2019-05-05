import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Switch, TreeSelect, Icon, message, Checkbox,
} from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class SyncData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAuth: false,
            searchText: '',
            syncBaseVisible: false,
            syncCompLoading: false,
            syncUserLoading: false,
            syncCompTime: null,
            syncUserTime: null,
            checkAll: false,
            confirmLoading: false,
            refs: [
                "公司目录",
                "银行账户使用权",
                "部门档案",
                "人员档案",
                "个人银行账户",
                "收支项目",
                "项目辅助核算",
                "客商银行账户",
                "业务类型",
            ],
            checkedList: [],
            compData: [],
            compColumns: [
                {
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
                    ...this.getColumnSearchProps('name', '企业名称'),
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
                                <Button type="primary" onClick={this.syncBaseBtnClick.bind(this, record)} disabled={this.state.syncCompLoading}>同步基础档案</Button>
                            </div>
                        );
                    },
                }
            ],
            userData: [],
            userColumns: [
                {
                    title: '用户ID',
                    dataIndex: 'source_id',
                    width: '5%',
                    key: 'source_id',
                }, {
                    title: '用户名称',
                    dataIndex: 'name',
                    width: '5%',
                    key: 'name',
                }, {
                    title: '同步时间',
                    dataIndex: 'create_time',
                    width: '5%',
                    key: 'create_time',
                }
            ],
        }
    }

    componentDidMount() {
        let datalist = [];
        let userDataList = [];
        for (let i = 0; i < 20; ++i) {
            datalist.push({
                source_id: i,
                name: '云南若邻科技有限公司',
                create_time: "2019-01-11 10:14:43",
            });
            userDataList.push({
                source_id:i,
                name: '张小帆',
                create_time: "2019-01-11 10:14:43",
            })
        }
        this.setState({
            compData: datalist,
            userData: userDataList,
            hasAuth: global.constants.checkPermission("/company/syncData"),
        })
    }

    syncBaseBtnClick = (record) => {
        console.log(record);
        this.setState({
            syncBaseVisible: true,
        })

    }


    syncCompBtnClick = () => {
        if (this.state.syncCompTime) {
            let nowDate = new Date();
            let diffTime = (nowDate - this.state.syncCompTime) / 1000; //计算时间差
            if (diffTime < 60) {
                message.warning('同步操作太频繁，请60秒后再试。');
                return;
            }
        }
        this.setState({ syncCompLoading: true });
        setTimeout(() => {
            message.success('同步企业数据成功。');
            this.setState({ syncCompLoading: false });
            this.state.syncCompTime = new Date();
        }, 3000);
    }

    syncUserBtnClick = () => {
        if (this.state.syncUserTime) {
            let nowDate = new Date();
            let diffTime = (nowDate - this.state.syncUserTime) / 1000; //计算时间差
            if (diffTime < 60) {
                message.warning('同步操作太频繁，请60秒后再试。');
                return;
            }
        }
        this.setState({ syncUserLoading: true });
        setTimeout(() => {
            this.setState({ syncUserLoading: false });
            message.success('同步用户数据成功。');
            this.state.syncUserTime = new Date();
        }, 3000);
    }

    syncBaseModalView = () => {
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}>
                        选择所有
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup options={this.state.refs} value={this.state.checkedList} onChange={this.onChange} />
            </div>
        )
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.state.refs : [],
            checkAll: e.target.checked,
        });
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            checkAll: checkedList.length === this.state.refs.length,
        });
    }

    syncBaseHandleCancel = () => {
        if (!this.state.confirmLoading) {
            this.setState({
                syncBaseVisible: false,
            })
        }
    }

    syncBaseHandleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
                syncBaseVisible: false,
                checkedList: [],
                checkAll: false,
            });
            message.success('同步档案数据成功。');
        }, 3000);
    }

    render() {
        const { hasAuth, confirmLoading, syncBaseVisible, compColumns, compData } = this.state;

        if (hasAuth) {
            return (
                <div>
                    <div className="syn_wrap">
                        <Row className="syn_top">
                            {/* 按钮 */}
                            <Button type="primary" onClick={this.syncCompBtnClick} loading={this.state.syncCompLoading}>同步企业数据</Button>
                        </Row>

                        <Modal
                            visible={syncBaseVisible}
                            title="同步档案数据"
                            onOk={this.syncBaseHandleOk}
                            onCancel={this.syncBaseHandleCancel}
                            footer={[
                                <Button key="back" onClick={this.syncBaseHandleCancel}>取消</Button>,
                                <Button key="submit" type="primary" loading={confirmLoading} onClick={this.syncBaseHandleOk}>同步数据</Button>,
                            ]}>
                            {this.syncBaseModalView()}
                        </Modal>


                        {/* 列表 */}
                        <Row className="syn_tab">
                            <Table
                                columns={compColumns}
                                dataSource={compData}
                                pagination={{ pageSize: 10 }}
                            />
                        </Row>
                    </div>
                    <div className="syn_wrap">
                        <Row className="syn_top">
                            {/* 按钮 */}
                            <Button type="primary" onClick={this.syncUserBtnClick} loading={this.state.syncUserLoading}>同步用户数据</Button>
                        </Row>
                        {/* 列表 */}
                        <Row className="syn_tab">
                            <Table
                                columns={this.state.userColumns}
                                expandedRowRender={this.expandedRowRender}
                                dataSource={this.state.userData}
                                pagination={{ pageSize: 10 }}
                            />
                        </Row>
                    </div>
                </div>
            )
        }
        return (
            <div className="nomatch_wrap">
                无访问权限
            </div>
        )
    }


    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
        console.log(selectedKeys);
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }


    getColumnSearchProps = (dataIndex, indexName) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => { this.searchInput = node; }}
                        placeholder={`查找 ${indexName}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        查找
            </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        重置
            </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        // onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        // onFilterDropdownVisibleChange: (visible) => {
        //     if (visible) {
        //         setTimeout(() => this.searchInput.select());
        //     }
        // },
        render: (text) => (
            text
        ),
    })
}
