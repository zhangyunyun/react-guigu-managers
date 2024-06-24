/* 
   存储数据模块
      1.函数 一个功能用函数
      2.对象 一个或多个功能用对象

   store 使用store
*/

import store from 'store'
const BASE_KEY = 'key' //

//eslint-disable-next-line
export default {
   /*
      保存数据(保存的是一个json格式的字符串数据)
   */
   saves(value) {
      //window.localStorage.setItem(BASE_KEY, JSON.stringify(value)) 
      store.set(BASE_KEY, value)
   },
   /*
      读取数据(返回一个对象,这里是一个user对象)
   */
   gets() {
      //return JSON.parse(window.localStorage.getItem(BASE_KEY || '{}')
      return store.get(BASE_KEY) || {}
   },
   /*
      删除数据
   */
   removes() {
      //localStorage.removeItem(BASE_KEY)
      store.remove(BASE_KEY)
   }
}