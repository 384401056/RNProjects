import React, { Component } from 'react';

class App3 extends Component {

    constructor(){
        super();
        console.log("constructor")
    }

    

    /**
     * 在render方法之前调用。
     */
    componentWillMount(){
        console.log("componentWillMount");
    }

    /**
     * 渲染组件,并返回一个虚拟的DOM.
     */
    render() {
        console.log("render");
        return (
            <div>
                <h2>React Native 组件生命周期</h2>
            </div>
        );
    }

    /**
     * 在render方法之后调用。
     */
    componentDidMount(){
        console.log("componentDidMount");
    }

    /**
     * 是否更新页面上的数据
     */
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
    }

    /**
     * 更新前调用的方法,然后现次调用render方法。
     */
    componentWillUpdate(){
        console.log("componentWillUpdate");
    }

    /**
     * 更新完成后调用的方法。
     */
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }



}

export default App3;
