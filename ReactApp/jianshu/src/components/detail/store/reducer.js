import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    
  }
)

export default (state = defaultState, action) => {

  switch (action.type) {
    // case actionTypes.SEACH_FOCUS:
    //   return state.set('focused', true);
    default:
      return state
  }
}