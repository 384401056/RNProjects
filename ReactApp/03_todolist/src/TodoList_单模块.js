import React, { Component, Fragment } from 'react'

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: ['aaa', 'bbbb'],
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    {/** 在jsx中 label中的 for 要修改为 htmlFor */}
                    <label htmlFor="inputArea">请输入事项：</label>
                    <input id="inputArea" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />
                    <button onClick={this.btnOnClick.bind(this)}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            //一般不应该用index来做key，这里只是暂时解决警告问题.
                            //    return <li key={index} onClick={this.handleDeleteItem.bind(this)>{item}</li>

                            //使用dangerouslySetInnerHTML来输出可以加html代码的内容
                            return <li key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={this.handleDeleteItem.bind(this, index)}></li>
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    /**
     * 提交按钮的事件处理方法
     */
    btnOnClick() {
        // let newList = this.state.list;
        // newList.push(this.state.inputValue);
        // this.setState({
        //     list:newList,
        //     inputValue:'',
        // });

        //加个不允许空字符提交的判断
        if (this.state.inputValue) {
            //功能同上一段代码，这里使用了展开运算符.
            this.setState({
                list: [...this.state.list, this.state.inputValue],
                inputValue: '',
            })
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

        //2. 将值同步回msg
        this.setState({
            inputValue: newValue,
        })
    }

    /**
     * 删除item的事件
     * @param index 
     */
    handleDeleteItem(index) {
        console.log(index);
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list,
        })
    }
}

export default TodoList
