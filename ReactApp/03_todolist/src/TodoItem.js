import React, { Component } from 'react'
import PropTypes from 'prop-types';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        //为了性能优化，一般会把bind(this)放到 constructor 中来做
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return false; //这样当父组件本身重新Render时，本组件就不会更新视图了,但是这样写只限于此组件是一个无状态组件.
    // }

    shouldComponentUpdate(nextProps, nextState) {
        //正常情况要判断新的值和旧的值是否发生变化，再来决定是否重新render组件
        if (nextProps.item !== this.props.item) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        console.log("Item render`......")
        //解构赋值
        const { content } = this.props;
        return (
            // <div onClick={this.handleDeleteItem}>
            //     {item}
            // </div>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                onClick={this.handleDeleteItem}>
            </div>
        )
    }

    /**
     * li点击事件
     */
    handleDeleteItem() {
        //解构赋值
        const { index, deleteItem } = this.props;
        //调用父类传递来的方法
        deleteItem(index);
    }
}

//属性约束 propTypes 这里要注意p小写，最后带有s
TodoItem.propTypes = {
    content: PropTypes.string, //定义了item的类型必须为string，并要求一定要传递
    // content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //两种类型中的一种
    index: PropTypes.number, //定义了index的类型必须为number
    deleteItem: PropTypes.func, //定义了deleteItem的类型必须为个个函数
}

// TodoItem.defaultProps = {

// }

export default TodoItem