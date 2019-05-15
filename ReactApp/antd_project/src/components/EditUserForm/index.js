import React, { Component } from 'react'
import './index.less';
import '../../commont/config'
import {
    Row, Form, Button, Modal, Switch, Input, Col,
    Tree, Spin, Select
} from 'antd'
import axios from 'axios'

const { TreeNode } = Tree;
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

export default class EditUserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editStatus: false,
            loading: false,
            // treeSelectvalue: "",
            roleStringList: [],
            loading: false,
            //系统的所有模块列表
            moduleList: [],
            //系统NC列表
            ncAddressList: [],
            //角色列表
            roleList: [],
            //表单验证
            validateList: [],
            //选中的父节点
            halfCheckedKeys: [],
            formData: {
                name: "",
                username: "",
                password: "",
                rpwd: "",
                mobile: "",
                email: "",
                ncId: "",
                isenable: null,
                //选择的角色id列表
                roleIds: [],
                roleList: [],
                //选择的模块id列表
                moduleIds: []
            }
        }
    }

    componentDidMount() {

    }


    componentWillReceiveProps(newProps) {
        console.log("newProps:", newProps);

        let tempFormData = newProps.data;

        // roleList转为多项选择项ids
        let tempRoleIds = [];
        if (newProps.data.roleList) {
            for (let role of newProps.data.roleList) {
                tempRoleIds.push(parseInt(role.id));
            }
        }
        tempFormData.roleIds = tempRoleIds;
        tempFormData.password = ""; //由于编辑时，密码是不会从服务端返回的，这里要加一下对象的密码属性。
        tempFormData.rpwd = "";
        this.setState({
            moduleList: newProps.moduleList,
            ncAddressList: newProps.ncAddressList,
            roleList: newProps.roleList,
            loading: newProps.loading,
            formData: tempFormData,
        })
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
        // this.state.treeSelectvalue = "";
        this.state.roleStringList = [];
        this.state.formData = {
            name: "",
            username: "",
            password: "",
            rpwd: "",
            mobile: "",
            email: "",
            ncId: "",
            isenable: null,
            roleIds: [],
            roleList: [],
            //选择的模块列表
            moduleIds: []
        }
        // console.log("treeSelectvalue:", this.state.treeSelectvalue);
    }

    /**
     * 保存按钮事件
     */
    handleOk = () => {
        this.state.validateList = [];//清空验证信息
        if (this.props.onOk) {
            let tempFormData = this.state.formData;
            // //合并子节点和父节点
            tempFormData.moduleIds = tempFormData.moduleIds.concat(this.state.halfCheckedKeys);
            tempFormData.password = global.constants.default_password;
            if (!this.userValidate(this.state.formData)) {
                return;
            }
            this.props.onOk(this.state.formData)
        }
    }

    /**
     * 取消按钮事件
     */
    handleCancel = () => {
        //如果正在加载，不允许取消
        if (!this.state.loading) {
            if (this.props.onCancel) {
                this.props.onCancel()
            }
        }
    }

    /**
     * 确认密码框，失去焦点后的事件。
     */
    pwdOnBlurValidate = (e) => {
        console.log("rpwd:", e.target.value);
        console.log("password:", this.state.formData.password);
        if (e.target.value !== this.state.formData.password) {
            this.state.validateList[3] = {
                validateStatus: "error",
                help: "两次输入的密码不相同!"
            }
        } else {
            this.state.validateList[3] = {}
        }

        this.setState({
            validateList: this.state.validateList,
        })
    }

    /**
     * 输入校验
     */
    userValidate = (tempFormData) => {
        console.log("userValidate", tempFormData)
        this.state.validateList = [];//清空验证信息
        let result = true;
        let vd = this.state.validateList;
        if (tempFormData.name === "") {
            vd[0] = {
                validateStatus: "error",
                help: "请输入用户名"
            }
            result = false;
        }
        if (tempFormData.username === "") {
            vd[1] = {
                validateStatus: "error",
                help: "请输入登陆名"
            }
            result = false;
        }
        // if (tempFormData.password === "" || tempFormData.password === null) {
        //     vd[2] = {
        //         validateStatus: "error",
        //         help: "请输入密码"
        //     }
        //     result = false;
        // }

        // if (tempFormData.rpwd === "" || tempFormData.rpwd === null)  {
        //     vd[3] = {
        //         validateStatus: "error",
        //         help: "请输入密码!"
        //     }
        //     result = false;

        // } else if (tempFormData.rpwd !== tempFormData.password) {
        //     vd[3] = {
        //         validateStatus: "error",
        //         help: "两次输入的密码不相同!"
        //     }
        //     result = false;
        // }

        if (tempFormData.ncId === "") {
            vd[4] = {
                validateStatus: "error",
                help: "请选择NC客户!"
            }
            result = false;
        }
        if (tempFormData.moduleIds === undefined || tempFormData.moduleIds.length == 0) {
            vd[5] = {
                validateStatus: "error",
                help: "请选择模块!"
            }
            result = false;
        }
        if (tempFormData.roleIds === undefined || tempFormData.roleIds.length == 0) {
            vd[6] = {
                validateStatus: "error",
                help: "请选择角色!"
            }
            result = false;
        }

        this.setState({
            validateList: vd,
        })

        return result;
    }



    // onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // }

    onTreeSelected = (checkedKeys, info) => {
        let tempFormData = this.state.formData;
        // checkedKeys = checkedKeys.concat(info.halfCheckedKeys) //合并子节点和父节点
        tempFormData.moduleIds = checkedKeys;
        this.setState({
            halfCheckedKeys: info.halfCheckedKeys,
            formData: tempFormData,
        })
    }

    /**
   * 切换组件点击事件
   */
    switchOnChange = (checked) => {
        console.log("switchOnChange:", checked);
        let tempFormData = this.state.formData;
        tempFormData.isenable = checked?1:0;
        this.setState({
            formData: tempFormData,
        })
    }

    /**
     * NC选择
     */
    treeSelectOnChange = (val) => {
        let tempFormData = this.state.formData;
        tempFormData.ncId = val;
        this.setState({
            // treeSelectvalue: val,
            formData: tempFormData,
        });
    }

    /**
     * 角色选择
     */
    roleListOnChange = (vals) => {
        console.log("vals:", vals);
        let tempFormData = this.state.formData;
        tempFormData.roleIds = vals;
        this.setState({
            formData: tempFormData,
        });
    }


    /**
     * 树型选择事件
     */
    onTreeSelected = (checkedKeys, info) => {
        let tempFormData = this.state.formData;
        // checkedKeys = checkedKeys.concat(info.halfCheckedKeys) //合并子节点和父节点
        tempFormData.moduleIds = checkedKeys;
        // console.log("permissionIds:", tempFormData.permissionIds)
        this.setState({
            formData: tempFormData,
        })
    }


    render() {
        const { validateList, ncAddressList, moduleList, roleList } = this.state;
        console.log("this.state.formData.roleIds", this.state.formData.roleIds)
        return (
            <Modal
                visible={this.props.visible}
                title="修改用户信息"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
            // footer={[
            //     <Button key="back" onClick={this.handleCancel}>取消</Button>,
            //     <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>,
            // ]}
            >
                <Spin spinning={this.state.loading}>
                    <Form {...formItemLayout}>
                        <Form.Item label="用户名" {...validateList[0]} required={true}>
                            <div>
                                <Input placeholder="请输入用户名" maxLength={16} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.name = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.name} />
                            </div>
                        </Form.Item>
                        <Form.Item label="登录名" {...validateList[1]} required={true}>
                            <div>
                                <Input placeholder="请输入登录名" maxLength={16} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.username = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.username} />
                            </div>
                        </Form.Item>
                        {/* <Form.Item label="用户密码" {...validateList[2]} required={true}>
                            <div>
                                <Input.Password placeholder="请输入密码" onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.password = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.password} />
                            </div>
                        </Form.Item>
                        <Form.Item label="确认密码" {...validateList[3]} required={true}>
                            <div>
                                <Input.Password placeholder="请确认密码"
                                    onBlur={this.pwdOnBlurValidate}
                                    onChange={(e) => {
                                        let tempFormData = this.state.formData;
                                        tempFormData.rpwd = e.target.value;
                                        this.setState({
                                            formData: tempFormData
                                        })
                                    }} value={this.state.formData.rpwd} />
                            </div>
                        </Form.Item> */}
                        <Form.Item label="手机号码">
                            <div>
                                <Input placeholder="请输入手机号码" maxLength={11} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.mobile = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.mobile} />
                            </div>
                        </Form.Item>
                        <Form.Item label="E-Mail">
                            <div>
                                <Input placeholder="请输入电子邮箱" maxLength={32} onChange={(e) => {
                                    let tempFormData = this.state.formData;
                                    tempFormData.email = e.target.value;
                                    this.setState({
                                        formData: tempFormData
                                    })
                                }} value={this.state.formData.email} />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="NC客户"
                            {...validateList[4]} required={true}>
                            <div>
                                <Select
                                    value={parseInt(this.state.formData.ncId)}
                                    onChange={this.treeSelectOnChange}>
                                    {
                                        (ncAddressList) ?
                                            ncAddressList.map((item) => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            }) : <Option value="" key="">无数据</Option>
                                    }
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="分配角色"
                            {...validateList[6]} required={true}>
                            <div>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="选择角色"
                                    value={this.state.formData.roleIds}
                                    onChange={this.roleListOnChange}>
                                    {
                                        (roleList) ?
                                            roleList.map((item) => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            }) : <Option value="" key="">无数据</Option>
                                    }
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item label="是否启用:">
                            <div>
                                <Switch checked={this.state.formData.isenable==1} onChange={this.switchOnChange} />
                            </div>
                        </Form.Item>
                        <Form.Item label="模块授权" {...validateList[5]} required={true}>
                            <div>
                                <Row className="role_modalRow">
                                    <Col span={24}>
                                        <Tree
                                            ref="tree"
                                            checkable
                                            checkedKeys={this.state.formData.moduleIds}
                                            onCheck={this.onTreeSelected}>
                                            {
                                                (moduleList) ?
                                                    moduleList.map((item) => {
                                                        return (
                                                            <TreeNode title={item.moduleName} key={item.id}>
                                                                {
                                                                    (item.children) ?
                                                                        item.children.map((c_item) => {
                                                                            return (
                                                                                <TreeNode title={c_item.moduleName} key={c_item.id}></TreeNode>
                                                                            )
                                                                        }) : null
                                                                }
                                                            </TreeNode>
                                                        )
                                                    }) : null
                                            }
                                        </Tree>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
