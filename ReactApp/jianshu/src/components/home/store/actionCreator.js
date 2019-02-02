import * as actionTypes from './actionTypes';
import axios from 'axios'


//改变主页数据
const changeTopicList = (topicList, articleList) => {
    return {
        type: actionTypes.CHANGE_ART_LIST,
        topicList: topicList,
        articleList: articleList,
    }
}


function getTopicList() {
    return axios.get('http://rap2api.taobao.org/app/mock/118170/api/topicList');
}


function getArticleList() {
    return axios.get('http://rap2api.taobao.org/app/mock/118170/api/articleList');
}

//获取主页数据
export const getHomeInfo = () => {
    return (dispatch) => {
        //并发多个请求
        axios.all([getTopicList(), getArticleList()])
            .then(axios.spread((topicList, articleList, detailsData) => {
                console.log("DetailsData", detailsData.data.data);
                dispatch(changeTopicList(topicList.data.data, articleList.data.data,detailsData.data.data));
            })).catch((error) => {
                console.log(error);
            });
    }
}


const moreArticleList = (list, nextPage) => {
    return {
        type: actionTypes.GET_MORE_LIST,
        list: list,
        nextPage: nextPage
    }
}

//加载更多的网络请求发送
export const getMoreList = (nextPage) => {
    return (dispatch) => {
        console.log("nextPage:", nextPage);
        axios.get('http://rap2api.taobao.org/app/mock/118170/api/articleList')
            .then((res) => {
                console.log("res:", res);
                dispatch(moreArticleList(res.data.data, nextPage)) //传递数据和下一页的
            })
    }
}

//隐藏"加载更多"按钮
export const hiddenMoreBtn = () => {
    return {
        type: actionTypes.HIDDEN_MORE_BTN,
    }
}

//切换"回到顶部"按钮
export const showScrollBtn = (value)=>{
    return {
        type: actionTypes.SHOW_SCROLL_BTN,
        value:value
    }
}