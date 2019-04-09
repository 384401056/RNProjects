import React, { Component } from 'react';
import './index.less';
import LineChart from '../../components/LineChart';
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tabs, Upload, Icon, message,
} from 'antd';
export default class BaseCount extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="bc_wrap">
                <Row className = "bc_tab">
                    <LineChart />
                </Row>
            </div>
        )
    }
}
