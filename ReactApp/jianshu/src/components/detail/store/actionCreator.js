import * as actionTypes from './actionTypes';
import axios from 'axios'

const changeArticleDesc = (articleDesc)=>{
    return {
        type: actionTypes.CHANGE_ARTICLEDESC,
        articleDesc: articleDesc
    }
}


export const getArticleDesc = () => {
    return (dispatch)=>{
        axios.get('http://rap2api.taobao.org/app/mock/118170/api/articleDesc').then((res)=>{
            console.log("res:",res);
            dispatch(changeArticleDesc(res.data.data));
        }).catch((error)=>{
            console.log(error);
        })
    }
}
