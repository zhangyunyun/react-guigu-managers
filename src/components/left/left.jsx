import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig'

import './left.less'

import logo from '../../assets/images/logo.png'

/*
   左侧导航组件
*/
const { SubMenu } = Menu;

export default class left extends Component{
      
   /* 
      根据mwnu的数据数组生成对应的标签数组
      使用map() + 递归调用
   */
   // getMenuNodes = (menuList) => {
   //    return menuList.map(item => {
   //       {/* 
   //          title: '首页', // 菜单标题名称
   //          key: '/home', // 对应的 path(路由路径)
   //          icon: 'home', // 图标名称
   //          children:[] //每个菜单子菜单(可能有可能没有)
   //       */} 
   //       if(!item.children){
   //          return (
   //             <Menu.Item key={item.key}>
   //                <Link to={item.key}>
   //                   <Icon type={item.icon}></Icon>
   //                   <span>{item.title}</span>
   //                </Link>
   //             </Menu.Item>
   //          )
   //       }
   //       return (
   //          <SubMenu 
   //             key={item.key} 
   //             title={
   //                <span>
   //                   <Icon type={item.icon}></Icon>
   //                   <span>{item.title}</span>
   //                </span>
   //             }
   //          >
   //             {/* 递归调用 
   //             <Menu.Item key="/category">
   //                <Link to="/category">
   //                   <Icon type="bars"></Icon>
   //                   <span>分类管理</span>
   //                </Link>
   //             </Menu.Item> */}

   //             {this.getMenuNodes(item.children)}
   //          </SubMenu>
   //       )
   //    })
   // }
   
   /* 
      根据mwnu的数据数组生成对应的标签数组
      使用reduce() + 递归调用
   */ 
   getMenuNodes = (menuList) => {
      return menuList.reduce((pre,item) => {
         if(!item.children){
            pre.push((
               <Menu.Item key={item.key}>
                  <Link to={item.key}>
                     <Icon type={item.icon}></Icon>
                     <span>{item.title}</span>
                  </Link>
               </Menu.Item>
            )) 
         }else{
            pre.push((
               <SubMenu 
                  key={item.key} 
                  title={
                     <span>
                        <Icon type={item.icon}></Icon>
                        <span>{item.title}</span>
                     </span>
                  }
               >
                  {/* 递归调用
                     <Menu.Item key={item.key}>
                        <Link to={item.key}>
                           <Icon type={item.icon}></Icon>
                           <span>{item.title}</span>
                        </Link>
                     </Menu.Item> 
                  */}  
                  {
                     this.getMenuNodes(item.children)
                  }
               </SubMenu>
            ))
         }
         return pre
      },[])
   }
   

   render(){
      //const {openKeys} = this.state
      return(
         <div className="left">
            <Link to='/' className="left-nav-header">
               <img src={logo} alt="logo" />
               <h1>硅谷后台管理</h1>
            </Link>
            <Menu mode="inline"
                  theme="dark">               
               {
                  this.getMenuNodes(menuList)
               }              
            </Menu>
         </div>
      )
   }
}