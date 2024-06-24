/* 
   应用根组件
*/
import React, { Component } from 'react'
import {
  BrowserRouter,  //BrowserRouter h5语法   HashRouter 带#路由  
  Route,
  Switch
} from 'react-router-dom'

//引入组件
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          {/* <Redirect from='/' exact to='/login' /> */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin} ></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}