import * as actionTypes from './actionTypes';
import axios from 'axios'


const changeLogin = (value)=>{
  return{
    type:actionTypes.CHANGE_LOGIN,
    value: value
  }
}

export const login = (accout, password) => {
    return (dispatch)=>{
        axios.post('http://rap2api.taobao.org/app/mock/118170/api/login',{"accout":accout, "password":password}).then((res)=>{
            console.log("res:",res.data);
            if(res.data.data){
              dispatch(changeLogin(res.data.data));
            }else{
              alert("登录失败");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
}
