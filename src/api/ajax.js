/* 
   能发送ajax请求的函数模块，
   分装axios库
   函数的返回值是一个Promise对象
   axios.get()/post()返回的就是promise对象
   
   返回自己创建的promise对象
   优化1：统一处理请求异常
         在外层包一个自己创建的promise对象
         在请求出错时，不reject(error),而是显示错误提示
   优化2：异步返回结果数据response.data, 而不是包含结果数据的response
         在请求成功时：resolve(response.data)

   什么时候用GET，什么时候是请求POST?
       如果是查询数据一般用GET请求
       如果数据会更新后台的数据用POST请求
           更新数据包括：添加、修改、删除
           特殊情况：更新操作不需要请求参数
*/
import axios from 'axios'

import { message } from 'antd'

export default function ajax(url, data = {}, method='GET') {
   return new Promise((resolve, reject) => {
      let promise
      //1.执行异步请求
      if (method  === "GET") {
         //发送get请求
         promise = axios.get(url, {
            params: data
         })
      }else{
         //发送post请求
         promise = axios.post(url, data)
      }
      promise.then(response => {
         //2.请求成功，调用resolve(response.data)
         resolve(response.data)
      }).catch(error => {
         //3.请求失败，不调用reject(reason),而是提示异常信息
         //reject(error)
         message.error('请求错误' + error.message)
      })
   })
}

