/* 
   入口文件
*/
import React from 'react'
import ReactDom from "react-dom";

//引入antd样式
//import "antd/dist/antd.css"; //这样引入不能实现按需打包

//引入redux、react-redux
// import {Provider} from 'react-redux' //provider包裹在根组件外层，使所有的子组件都可以拿到state
// import store from './redux/store'

//自定义组件，引入app
import App from './App.jsx'

import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

//读取local中保存的user 如果local中保存了user, 将user保存到内存中
const user = storageUtils.gets()
if (user && user._id) {
   memoryUtils.user = user
}

//渲染组件标签
ReactDom.render((
   // <Provider store={store}>
      <App />
   // </Provider>
),document.getElementById('root'))

