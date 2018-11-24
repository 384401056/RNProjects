import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    focused: false,
    searchList: [],
  }
)

export default (state = defaultState, action) => {
  console.log("state: ", state);
  console.log("action: ", action)

  if (action.type === actionTypes.SEACH_FOCUS) {
    return state.set('focused', true); //改变state的值，这里set方法返回的是一个新对象.
  }

  if (action.type === actionTypes.SEACH_BLUR) {
    return state.set('focused', false);
  }

  if (action.type === actionTypes.UPDATE_SEARCHLIST) {
    return state.set('searchList', action.value);
  }

  return state
}