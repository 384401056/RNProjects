import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    login: false,
  }
)

export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.CHANGE_LOGIN:
      return state.merge({
        login: action.value,
      })
    default:
      return state
  }
}