/* 
   异步
   包含n个Action Creators创建的action工厂函数模块
*/
import {INCREMENT,DECREMENT} from './action-types'

//增加的action (注：type的值要和reducers中的type一致)
export const increment = (number) => ({type:INCREMENT,data:number})
//减少的action (注：type的值要和reducers中的type一致)
export const decrement = (number) => ({type:DECREMENT,data:number})