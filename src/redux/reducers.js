/* 
   包含n个reducer方法，根据老的state和指定action，
   通过(添加，或删除、或修改计算)产生一个新的state纯函数
*/
import {INCREMENT,DECREMENT} from './action-types'

/* 
   计数器 (工厂函数)
*/
export default function count(state=0,action){
   console.log('count()',state,action)
   switch (action.type) {
      case INCREMENT:
         return state + action.data;
      case DECREMENT:
         return state - action.data;
      default:
         return state;
   }
}
