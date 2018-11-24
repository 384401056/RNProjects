import { combineReducers } from 'redux-immutable'; //这里使用 redux-immutable
import {reducer as heardReducer} from '../comment/header/store'; //引入拆分后的reducer.


const reducer = combineReducers({ 
    //这里的对象其实就是最外层的state
    //上面用了redux-immutable,所以这里的state成了不可变对象了,所以访问header时也要用不可变对象的访问方式。
    header: heardReducer,//引入拆分后的reducer.
})

export default reducer;