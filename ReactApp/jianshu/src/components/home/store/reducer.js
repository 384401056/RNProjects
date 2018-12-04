import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

//创建一个不可变对象,赋值给state.
const defaultState = fromJS(
  {
    showMoreBtn: true,//就否显示加载更多的按钮.
    showScrollBtn: false, //是否显示回到顶部的按钮.
    currentPage: 1,
    topicList:[],
    articleList:[]
  }
)

export default (state = defaultState, action) => {
  // console.log("home action:", action);
  switch (action.type) {
    case actionTypes.CHANGE_ART_LIST:
      return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList)
      });
    case actionTypes.GET_MORE_LIST:
      return state.merge({
        articleList: state.get('articleList').concat(action.list),
        currentPage: action.nextPage
      })
    case actionTypes.HIDDEN_MORE_BTN:
      return state.set('showMoreBtn',false);
    case actionTypes.SHOW_SCROLL_BTN:
      return state.set('showScrollBtn', action.value);
    default:
      return state
  }
}