import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    topicList:[
      {
        "url": "http://dummyimage.com/64x64/aff279",
        "title": "八院运压京型",
        "id": 48576754333174770
      },
      {
        "url": "http://dummyimage.com/64x64/f279d2",
        "title": "高半拉连",
        "id": 6549525133456436
      },
      {
        "url": "http://dummyimage.com/64x64/79f2ee",
        "title": "如复都级",
        "id": 2709540516163501
      },
      {
        "url": "http://dummyimage.com/64x64/f2ca79",
        "title": "地通步合因到",
        "id": 46687139531444430
      },
      {
        "url": "http://dummyimage.com/64x64/a779f2",
        "title": "完话你素农联",
        "id": 44128509950742050
      },
      {
        "url": "http://dummyimage.com/64x64/79f284",
        "title": "许部地往",
        "id": 14060162231652276
      },
      {
        "url": "http://dummyimage.com/64x64/f27991",
        "title": "经大",
        "id": 54065780134885610
      }
    ],
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