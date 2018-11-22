import React, { Component, Fragment } from 'react'
import {
  Input,
  Button,
  List
} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import store from './store/index'
import ActionCreator from './store/actionCreator';




class TodoListWithRedux extends Component {

  constructor(props) {
    super(props);

    //使用Rudex的store来存储state
    this.state = store.getState();

    // this.state = {
    //   inputValue: '',
    //   list: [],
    // }

    store.subscribe(this.storeSubscribe.bind(this)); //订阅store,只要store中的数据发生改变，变会执行传入的方法

  }

  /**
   * 订阅store改变的方法,所有以前的setState都不用了，只要在这里更新即可
   */
  storeSubscribe() {
    console.log("store change!...")
    this.setState(store.getState());
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

  componentDidMount(){
    //使用thunk的方式，来发送网络请求
    const action = ActionCreator.initData();//此处返回的是一个函数。
    store.dispatch(action);//执行函数
  }

  handleInputChange(e) {
    // const newValue = e.target.value;

    // this.setState({
    //   inputValue: newValue,
    // })

    //向store发送action,来改写store中的状态值
    // const action = {
    //   type: ActionTypes.CHANGE_INPUT_VALUE,//操作类型
    //   value: newValue,//新的值
    // }

    //将action的生成进行了封装
    const action = ActionCreator.changeInputValue(e.target.value);
    store.dispatch(action);

  }

  /**
   * 向list中添加item
   */
  handleAddItem() {
    //加个不允许空字符提交的判断
    if (this.state.inputValue) {

      let item = {
        id: this.getUUID(),
        value: this.state.inputValue,
      }

      //向store发送action,来添加item
      // const action = {
      //   type: ActionTypes.ADD_ITEM,//操作类型
      //   value: item,//新的值
      // }

      const action = ActionCreator.addItem(item);
      store.dispatch(action);


      //用这种setState是React16新语法的更新数据方法
      // this.setState((prevState) => {
      //   return {
      //     list: [...prevState.list, item],
      //     inputValue: '',
      //   }
      // });

    }
  }

  handleDeleteItem(index) {
    //向store发送action,来改写store中的状态值
    // const action = {
    //   type: ActionTypes.DELETE_ITEM,//操作类型
    //   value: index,//index
    // }

    const action = ActionCreator.deleteItem(index);
    store.dispatch(action);


    // this.setState((prevState) => {
    //   const list = [...prevState.list];
    //   list.splice(index, 1);
    //   return {
    //     list, //list: list, 的简写
    //   }
    // });
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

export default TodoListWithRedux