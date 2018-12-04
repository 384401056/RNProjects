import { combineReducers } from 'redux-immutable'; //这里使用 redux-immutable
import {reducer as heardReducer} from '../components/header/store'; //引入拆分后的reducer.
import {reducer as homeReducer} from '../components/home/store/';
import {reducer as detailReducer} from '../components/detail/store';
import {reducer as loginReducer } from '../components/login/store';


const reducer = combineReducers({ 
    //这里的对象其实就是最外层的state
    //上面用了redux-immutable,所以这里的state成了不可变对象了,所以访问header时也要用不可变对象的访问方式。
    header: heardReducer,//引入拆分后的reducer.
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer,
})

export default reducer;