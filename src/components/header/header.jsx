import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import { reqWeather } from '../../api'

import menuList from '../../config/menuConfig.js'

import {formateDate} from '../../utils/dateUtils.js'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'

import LinkButton from '../../components/link-button/link-button'

import './header.less'

/*左侧导航组件
 */
class Header extends Component{

   state = {
      username:'', //当前用户
      title:'',
      sysTime:formateDate(new Date()), //当前日期
      // dayPictureUrl:'', //当前天气图片url
      // weather:'' //当前天气(如：晴、阴...)
      date:'',
      type:''
   }

   /* 
      获取当前用户的用户名
   */
   getUserName = () => {
      const username = memoryUtils.user.username
      this.setState({
         username
      })
   }

   
   /* 
      获取title标题
   */
   getTitle = () => {
      const path = this.props.location.pathname
      let title
      menuList.forEach(item => {
         if(item.key === path){
            title = item.title
         }else if(item.children){
            const cItems = item.children.find(cItem => cItem.key===path)
            if(cItems){
               //如果有值就取出title
               title = cItems.title 
            }        
         }
      })
      return title
   }

   /* 
      获取当前日期
   */
   getSysTime = () => {
      //启动循环定时器,每隔1s 更新一次sysTime
      clearInterval(this.time)
      this.time = setInterval(() => {
         this.setState({
            sysTime:formateDate(new Date())
         })
      }, 1000);
   }

   /* 
      获取当前天气
   */
   getWeather = async() => {
      let city = '兰州'
      // const {dayPictureUrl, weather} = await reqWeather(city)
      // this.setState({
      //    dayPictureUrl,
      //    weather
      // })
      const {date,type} = await reqWeather(city)
      this.setState({
         date:date.substring(date.length-3,date.length),
         type
      })
   } 

   /* 
      退出登录
   */
   handleLoginOut = () => {
      Modal.confirm({
         title: '退出登录',
         content:'您确定要退出登录吗?',
         onOk:() => {
            /* 
               清除登录的local storage中的信息
               清除登录的内存中信息
            */
            //1.移除保存的user
            storageUtils.removes()
            memoryUtils.user = {}

            /* 
               这里props不是组件对象，需要将onOk()函数修改为箭头函数指向外面的this
            */
            //2.跳转到登录界面
            this.props.history.replace('/login')
         },
         onCancel() {
           console.log('Cancel');
         },
       })
   }

   /* 
      在render()之前执行一次
   */
   componentWillMount(){
   }

   /* 
      在render()之后执行一次
      一般在此执行异步操作，发ajax请求/启动定时器
   */
   componentDidMount(){
      //获取当前用户的用户名 
      this.getUserName()
      
      //获取当前日期
      this.getSysTime()

      //获取当前天气
      this.getWeather()
   }

   /* 
      当前组件卸载之前调用
   */
   componentWillUnmount(){
      //清除定时器
      clearInterval(this.time)
   }

   render(){
      //获取当前用户
      const {username,sysTime,date,type} = this.state

      //获取当前菜单标题,不能写在周期函数componentWillMount()中
      const title = this.getTitle()

      return(
         <div className="header">
          <div className="header-top">
            <span>欢迎, {username}</span>
            <LinkButton onClick={this.handleLoginOut}>退出</LinkButton>
            {/* <Button type="primary" onClick={this.handleLoginOut}>退出</Button> */}
          </div>
          <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
            <div className="header-bottom-right">
               <span>{sysTime}</span>
               {/* <img src="" alt=""/> */}
               <span>{date}</span>
               <span>{type}</span>    
            </div>
          </div>
        </div>
      )
   }
}
/* 
   widthRouter高阶组件
      包装非路由组件，返回一个新的组件
      新的组件向非路由组件传递3个属性(history/location/match)
*/
export default withRouter(Header)