import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    articleDesc:{}
  }
)

export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.CHANGE_ARTICLEDESC:
      return state.merge({
        articleDesc: fromJS(action.articleDesc)
      })
    default:
      return state
  }
}