import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    focused: false,
    searchList: [],
    mouseIn: false,//鼠标是否进入SearchInfo面板的判断.
    page: 1,//初始页码
  }
)

export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.SEACH_FOCUS:
      return state.set('focused', true); //改变state的值，这里set方法返回的是一个新对象.
    case actionTypes.SEACH_BLUR:
      return state.set('focused', false);
    case actionTypes.UPDATE_SEARCHLIST:
      return state.set('searchList', action.value);
    case actionTypes.MOUSEIN: //鼠标进入SearchInfo面板时修改为true
      return state.set("mouseIn", true);
    case actionTypes.MOUSELEAVE:
      return state.set("mouseIn", false);
    case actionTypes.CHANGEPAGE://点击换一换时修改页码
      return state.set("page", action.value);
    default:
      return state
  }

// if (action.type === actionTypes.SEACH_FOCUS) {
//   return state.set('focused', true); //改变state的值，这里set方法返回的是一个新对象.
// }

// if (action.type === actionTypes.SEACH_BLUR) {
//   return state.set('focused', false);
// }

// if (action.type === actionTypes.UPDATE_SEARCHLIST) {
//   return state.set('searchList', action.value);
// }
// return state

}