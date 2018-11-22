import React, { Component, Fragment } from 'react'
import {
  Input,
  Button,
  List
} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import { connect } from 'react-redux';//通过connect从Provide中获取store中的数据
import ActionTypes from './store/actionTypes';

class TodoList extends Component {

  render() {

    //通过解构赋值，可以让代码更简洁
    const { inputValue, list, handleInputChange, handleAddItem, handleDeleteItem} = this.props;

    return (
      <Fragment>
        <div>
          <Input
            maxLength={40}
            placeholder="输入待办事项"
            style={{ margin: '20px', width: "400px" }}
            value={inputValue}
            onChange={handleInputChange.bind(this)}
          />
          <Button type="primary" onClick={handleAddItem.bind(this, inputValue)}>提交</Button>
        </div>
        <List
          style={{ margin: "20px", width: "500px" }}
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered={true}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <div style={{ width: "420px" }}>
                {item.value}
              </div>
              <div>
                <Button shape="circle" size={"small"} icon="close" onClick={handleDeleteItem.bind(this, index)} />
              </div>
            </List.Item>
          )}
        />
      </Fragment>
    )
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

/**
 * 把store中的state数据映射为组件的props,这里的state参数就是指store里的state
 * @param state 
 */
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue, //用时的inputvalue就是props中的inputValue了
    list: state.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    //修改input中的数据
    handleInputChange(e) {
      console.log("this:", this);
      const action = {
        type: ActionTypes.CHANGE_INPUT_VALUE,
        value: e.target.value
      }
      dispatch(action);//通过action去修改store中的值
    },

    //添加item
    handleAddItem(value) {
      console.log("this:", this);
      if (value) {
        let item = {
          id: this.getUUID(),
          value
        }
        const action = {
          type: ActionTypes.ADD_ITEM,
          value: item
        }
        dispatch(action);
      }
    },

    //删除item
    handleDeleteItem(index) {
      const action = {
        type: ActionTypes.DELETE_ITEM,
        value: index
      }
      dispatch(action);
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);//让TodoList组件与父组件Provide中的store做连接.

