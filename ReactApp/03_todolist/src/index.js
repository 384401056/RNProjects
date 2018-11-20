import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList'; //todoList
import Transition from './Transition';//CSS3动画效果
import TodoListAnd from './TodoListAntd'; //带andt样式的todoList
import TodoListWithRedux from './TodoListWithRedux'; //带andt样式和使用了Rudex的todoList

ReactDOM.render(<TodoListWithRedux />, document.getElementById('root'));