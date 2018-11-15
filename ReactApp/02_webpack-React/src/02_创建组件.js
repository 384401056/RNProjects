import React from 'react';
import ReactDom from 'react-dom';


class Movie extends React.Component {

    //在用class创建的级件中，如果想使用外界传递过来的参数，可直接使用this.props.*
    render() {
        return (
            <div>这是一个Movie组件 name:{this.props.name} age:{this.props.age} gender:{this.props.gender}</div>
        );
    }
}

const user={
    name:"张三",
    age: 15,
    gender: "男"
}

ReactDom.render(
<div>
    <h1>React JS</h1>
    <Movie {...user}/>
    <hr/>
    <Movie/>
    <hr/>
    <Movie/>
</div>, document.getElementById("app"));