import ActionTypes from './actionTypes';
import axios from 'axios';

export default class ActionCreator {
  static changeInputValue(value) {
    return {
      type: ActionTypes.CHANGE_INPUT_VALUE,//操作类型
      value
    }
  }

  static deleteItem(index) {
    return {
      type: ActionTypes.DELETE_ITEM,//操作类型
      value: index
    }
  }

  static addItem(item) {
    return {
      type: ActionTypes.ADD_ITEM,//操作类型
      value: item
    }
  }

  static initData() {
    return (dispatch) => {
      axios.get("http://rap2api.taobao.org/app/mock/118170/api/todolist").then((response) => {
        let res = response.data.data;
        res.forEach((item, index) => {
          dispatch(this.addItem(item)); //提交action
        });
        console.log(res)
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}