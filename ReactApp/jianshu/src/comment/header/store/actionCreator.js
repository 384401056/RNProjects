import * as actionTypes from './actionTypes';
import axios from 'axios'
import { fromJS } from 'immutable';

export const searchFocus = () => {
    return {
        type: actionTypes.SEACH_FOCUS,
        // value: true
    }
}

export const searchBlur = () => {
    return {
        type: actionTypes.SEACH_BLUR,
        // value: false
    }
}

/**
 * 更新searchList中的值
 */
export const changeSearchList = (data)=>{
    return {
        type: actionTypes.UPDATE_SEARCHLIST,
        value: fromJS(data),
    }
}

/**
 * 获取搜索热门列表
 */
export const getSearchList = ()=>{
    return (dispatch) => {
        axios.get("http://rap2api.taobao.org/app/mock/118170/api/hotSearch").then((response)=>{
            const data = response.data.data;
            const action = changeSearchList(data);
            dispatch(action)
        }).catch((error)=>{
            console.log(error);
        })
    }
}

