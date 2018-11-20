import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        }
    }
    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.btnOnClick.bind(this)}>改变文本框的值</button>
                <div className="panel panel-body panel-danger">
                    <h4>{this.state.msg}</h4>
                </div>
                <div className="panel panel-body panel-primary">
                    {/** 如果我们只是绑定input 的 value，那这个input只是只读的，除非我们绑定了 onChange*/}
                    {/* <input ref="input01" className="input-group" value={this.state.msg} onChange={this.inputOnChange.bind(this)} /> */}
                    <input ref="input01" className="input-group" value={this.state.msg} onChange={(e)=>this.inputOnChange(e)} /> {/**功能同上*/}
                </div>


            </div>
        );
    }

    btnOnClick() {
        this.setState({
            msg: "你好!"
        });
    }

    inputOnChange(e){
        console.log("input 被改变.");
        //1. 在onChange事件中拿到文本框的值：
        //方法1:通过参数e获取
        console.log(e.target.value);
        //方法2: 通过引用获取dom元素
        console.log(this.refs.input01.value);

        
        const newValue = e.target.value;

        //2. 将值同步回msg
        this.setState({
            msg:newValue
        })
    }
}