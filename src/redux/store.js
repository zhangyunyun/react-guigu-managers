/* 
   将state,action和reducer关联起来，创建一个store对象
*/
import { createStore, applyMiddleware} from 'redux' //applyMiddleware用来合并多个中间件，逗号隔开
import thunk from 'redux-thunk' //可以在action 里传入 dispatch getState
import { composeWithDevTools } from 'redux-devtools-extension' //redux的可视化工具，谷歌的应用商城工具

//引入所有的reducer
import reducer from './reducers'

//创建store对象
const store = createStore(
  reducer,
  //applyMiddleware(thunk) //使用异步中间件
  composeWithDevTools(applyMiddleware(thunk))
)

//向外暴露store对象
export default store