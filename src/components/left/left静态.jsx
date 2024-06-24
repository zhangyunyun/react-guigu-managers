import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import { Menu, Icon } from 'antd';

// import menuList from '../../config/menuConfig'

import './left.less'

import logo from '../../assets/images/logo.png'

/*左侧导航组件
 */
const { SubMenu } = Menu;

export default class left extends Component{
   
   state = {
      openKeys:['sub1'],
   }

   onOpenChange = (openKeys) => {
      let keysLen = openKeys.length
      if(keysLen > 1){
         var latestOpenKey = openKeys.filter(item => {
            //最后一个是当前展开的，把当前展开以及父导航设置为openkeys
            return openKeys[keysLen-1].includes(item)
         })
         this.setState({
            openKeys:latestOpenKey
         })
      }else{
         this.setState({
            openKeys:openKeys
         })
      }
   }
   

   render(){
      const {openKeys} = this.state
      return(
         <div className="left">
            <Link to='/' className="left-nav-header">
               <img src={logo} alt="logo" />
               <h1>硅谷后台管理</h1>
            </Link>
            <Menu defaultSelectedKeys={['1']}
                  mode="inline"
                  theme="dark"
                  openKeys={openKeys} 
                  onOpenChange={this.onOpenChange}>
               <Menu.Item key="/home">
                  <Link to="/home">
                     <Icon type="home"></Icon>
                     <span>首页</span>
                  </Link>
               </Menu.Item>
               <SubMenu 
                  key="sub1" 
                  title={
                     <span>
                        <Icon type="appstore"></Icon>
                        <span>商品</span>
                     </span>
                  }
               >
                  <Menu.Item key="/category">
                     <Link to="/category">
                        <Icon type="bars"></Icon>
                        <span>分类管理</span>
                     </Link>
                  </Menu.Item>
                  <Menu.Item key="/product">
                     <Link to="/product">
                        <Icon type="tool"></Icon>
                        <span>商品管理</span>
                     </Link>
                  </Menu.Item>
               </SubMenu>
               <Menu.Item key="/user">
                  <Link to="/user">
                     <Icon type="user"></Icon>
                     <span>用户管理</span>
                  </Link>
               </Menu.Item>
               <Menu.Item key="/role">
                  <Link to="/role">
                     <Icon type="safety"></Icon>
                     <span>权限管理</span>
                  </Link>
               </Menu.Item>
               <SubMenu 
                   key="sub2" 
                   title={
                      <span>
                         <Icon type="area-chart"></Icon>
                         <span>图形图表</span>
                      </span>
                   }
               >
                  <Menu.Item key="/charts/bar">
                     <Link to="/charts/bar">
                        <Icon type="bar-chart"></Icon>
                        <span>柱状图</span>
                     </Link>
                  </Menu.Item>
                  <Menu.Item key="/charts/line">
                     <Link to="/charts/line">
                        <Icon type="line-chart"></Icon>
                        <span>折线图</span>
                     </Link>
                  </Menu.Item>
                  <Menu.Item key="/charts/pie">
                     <Link to="/charts/pie">
                        <Icon type="pie-chart"></Icon>
                        <span>饼图</span>
                     </Link>
                  </Menu.Item>
               </SubMenu>
            </Menu>
         </div>
      )
   }
}