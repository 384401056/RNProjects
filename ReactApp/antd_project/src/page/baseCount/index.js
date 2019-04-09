import React, { Component } from 'react';
import './index.less';
import {
    Row, Col, Button, Table, Modal, Tree, Input,
    Tabs, Upload, Icon, message,
} from 'antd';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
export default class BaseCount extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="bc_wrap">
                <Row className="bc_chart">
                    <LineChart />
                </Row>
                <Row className="bc_tab">
                    <BarChart />
                </Row>
            </div>
        )
    }
}
