import React, { Component, Fragment } from 'react'
import {
  Input,
  Button,
  List,
  Icon
} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


class TodoListAnd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [],
    }
  }


  render() {
    return (
      <Fragment>
        <div>
          <Input
            maxLength={40}
            placeholder="输入待办事项"
            style={{ margin: '20px', width: "400px" }}
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          />
          <Button type="primary" onClick={this.handleAddItem.bind(this)}>提交</Button>
        </div>
        <List
          style={{ margin: "20px", width: "500px" }}
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered={true}
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <div style={{ width: "420px" }}>
                {item.value}
              </div>
              <div>
                <Button shape="circle" size={"small"} icon="close" onClick={this.handleDeleteItem.bind(this, index)} />
              </div>
            </List.Item>
          )}
        />
      </Fragment>
    )
  }


  handleInputChange(e) {
    const newValue = e.target.value;
    this.setState({
      inputValue: newValue,
    })
  }

  handleAddItem() {
    //加个不允许空字符提交的判断
    if (this.state.inputValue) {

      let item = {
        id: this.getUUID(),
        value: this.state.inputValue,
      }

      //用这种setState是React16新语法的更新数据方法
      this.setState((prevState) => {
        return {
          list: [...prevState.list, item],
          inputValue: '',
        }
      });

    }
  }

  handleDeleteItem(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list, //list: list, 的简写
      }
    });
  }



  /**
   * 生成UUID来给key用
   */
  getUUID() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

}

export default TodoListAnd