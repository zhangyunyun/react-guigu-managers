/* 
   主页组件
*/
import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils.js'

import Header from '../../components/header/header'
import LeftNav from '../../components/left/left'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
/* import States from '../state/state' */ /*redux测试组件*/
import Bar from '../charts/bar/bar'
import Line from '../charts/line/line'
import Pie from '../charts/pie/pie'
import NotPage from '../404/notPage'

import './admin.less'

const {Content, Footer} = Layout

export default class Admin extends Component {
  render(){
    const user = memoryUtils.user
    //如果内存中没有存储user,表示当前没有登录
    if (!user && !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div className="ant-row container">
        <div className="ant-col ant-col-3 nav-left">
          <LeftNav></LeftNav>
        </div>
        <div className="ant-col ant-col-21 main">
          <Header></Header>
          <Content className="content">
            <Switch>
              <Redirect from='/' to='/home' exact/>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/user' component={User}></Route>
              {/* <Route path='/state' component={States}></Route> */}
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Route component={NotPage} />
            </Switch>
          </Content>
          <Footer className="footer">
            <p>推荐使用谷歌浏览器,可以获得更佳页面操作体验</p>
          </Footer>
        </div>            
      </div>
    );
  }
}