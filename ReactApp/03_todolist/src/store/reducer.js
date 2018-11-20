import ActionTypes from  './actionTypes';

const defaultState = {
  inputValue: '',
  list: [],
}

export default (state = defaultState, action) => {
  console.log("state:", state);
  console.log("action:", action);

  //根据传过来的 type 来判断，要修改什么值.
  if(action.type === ActionTypes.CHANGE_INPUT_VALUE){
    const newState = JSON.parse(JSON.stringify(state)); //深拷贝
    newState.inputValue = action.value;
    return newState; //将深拷贝的state,修改后返回给store,此时Redux中的stroe的值就改变了,可以浏览器开发工具中查看。
  }

  //添加item到list中
  if(action.type === ActionTypes.ADD_ITEM){
    const newState = JSON.parse(JSON.stringify(state)); //深拷贝
    newState.list = [...state.list, action.value]
    newState.inputValue = ''; //输入框更新为空
    return newState;
  }

  //删除item
  if(action.type === ActionTypes.DELETE_ITEM){
    const newState = JSON.parse(JSON.stringify(state)); //深拷贝
    newState.list.splice(action.value, 1);
    return newState;
  }

  return state;
}