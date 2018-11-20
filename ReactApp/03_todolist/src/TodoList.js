import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem';
import axios from 'axios';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [],
    }

    //为了性能优化，一般会把bind(this)放到 constructor 中来做
  }

  render() {
    console.log("List Render")
    return (
      <Fragment>
        <div>
          {/** 在jsx中 label中的 for 要修改为 htmlFor */}
          <label htmlFor="inputArea">请输入事项：</label>
          <input
            id="inputArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
            // ref="myInput" //定义一个ref引用
            ref={(myInput) => { this.myInput = myInput }} //React16的新法，ref是一个函数
          />
          <button onClick={this.btnOnClick.bind(this)}>提交</button>
        </div>
        <ul>
          { //这里的代码可以放到一个方法中
            this.state.list.map((item, index) => {
              //注意：如果动态生成的key值绑定在TodoItem上，这样会造成<TodoItem/>组件，一直会更新视图
              // const key = item + Math.random();//用内容+随机数来生成key
              // console.log(item + ":" + key);
              return (
                <TodoItem
                  key={item.id} //使用UUID来设置key
                  content={item.value}
                  index={index}
                  deleteItem={this.handleDeleteItem.bind(this)} />
              )
            })
          }
        </ul>
      </Fragment>
    )
  }


  componentDidMount() {
    //发送网络请求
    axios.get("http://rap2api.taobao.org/app/mock/118170/api/todolist").then((res) => {
      let respons = res.data.data;
      this.setState(()=>({
        list:respons,
      }))
    }).catch((error) => {
      console.log(error);
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

  /**
   * 提交按钮的事件处理方法
   */
  btnOnClick() {
    //加个不允许空字符提交的判断
    if (this.state.inputValue) {

      // this.setState({
      //     list: [...this.state.list, this.state.inputValue],
      //     inputValue: '',
      // })
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

  /**
   * 输入框的数据回显绑定事件
   * @param {*} e 
   */
  handleInputChange(e) {
    // console.log(this);
    // console.log(e);
    //1. 在onChange事件中拿到文本框的值：
    const newValue = e.target.value;
    // const newValue = this.refs.myInput.value; //通过ref引用来获取输入框中的内容(一般不推荐使用ref直接获取DOM元素)
    // const newValue = this.myInput.value; //使用React16新语法后的ref(一般不推荐使用ref直接获取DOM元素)

    //2. 将值同步回msg
    this.setState({
      inputValue: newValue,
    })

    //React16新语法setState
    // this.setState(() => {
    //   return {
    //     inputValue: newValue,
    //   }
    // });
  }

  /**
   * 删除item的事件
   * @param index 
   */
  handleDeleteItem(index) {
    // console.log(index);

    // const list = [...this.state.list];
    // list.splice(index, 1);
    // this.setState({
    //     list: list,
    // })

    //React16新语法setState
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list, //list: list, 的简写
      }
    });
  }
}


export default TodoList
