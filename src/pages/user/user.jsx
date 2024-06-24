import React,{Component} from 'react'
import {Card,Table,Button,Modal,message} from 'antd'

import {reqUsers,reqAddOrUpdateUser,reqDeleteUser} from '../../api'

import {PAGE_SIZE} from '../../utils/constants'

import {formateDate} from '../../utils/dateUtils.js'

import LinkButton from '../../components/link-button/link-button'
import UserAddUpdate from './addUpdate/add-update'

import './user.less'

const confirm = Modal.confirm

export default class User extends Component{

   state = {
      loading:false,
      showStatus:false, //显示隐藏创建用户弹框
      users:[], //存放所有用户的列表数组
      roles:[]  //存放所有角色的列表数组
   }

   initColumns = () => {
      this.columns = [
         {
            title:'用户名',
            dataIndex:'username'
         },
         {
            title:'邮箱',
            dataIndex:'email'
         },
         {
            title:'电话',
            dataIndex:'phone'
         },
         {
            title:'注册时间',
            dataIndex:'create_time',
            render:(create_time) => formateDate(create_time)
            //或者 render:formateDate
         },
         {
            title:'所属角色',
            dataIndex:'role_id',
            render:(role_id) => this.rolesName[role_id] //true)
         },
         {
            title:'操作',
            render:(user) => (
               <span>               
                  <LinkButton onClick={() => (this.updateUser(user))}>修改</LinkButton>
                  <LinkButton onClick={() => (this.deleteUser(user))}>删除</LinkButton>
               </span>
            )
         }
      ]
   }

   /* 
      根据角色的数组生成一个包含所有角色名的对象容器(属性名用角色id)
   */
   initRolesName = (roles) => {
      this.rolesName = roles.reduce((pre,item) => {
         // console.log(item,'ssssssssssssss')
         pre[item._id] = item.name

         return pre
      },{})//{}指初始值是一个空的对象

      console.log(this.rolesName)
   }

   /* 
      异步获取用户列表
   */
   getUsers = async () => {
      //显示加载
      this.setState({
         loading:true
      })
      //发送ajax请求,获取最新的用户列表
      const result = await reqUsers()
      //console.log(result)

      //请求成功，隐藏加载
      this.setState({
         loading:false
      })

      if(result.status === 0){
         const {users,roles} = result.data

         //初始获取包含所有角色名的对象容器
         this.initRolesName(roles)

         //更新状态
         this.setState({//获取新的数据，使用对象形式
            users,
            roles   
         })

         //message.success("获取用户列表成功！")
      }
   }

   /* 
      定义一个函数接收子组件传递过来的form
   */
   setForm = (form) =>{
      return this.form = form
   }

   /* 
      弹框-取消按钮
   */
   handleCancelAddUser = () => {
      //重置表单
      this.form.resetFields()

      //隐藏弹框
      this.setState({
         showStatus:false
      })
   }

   /* 
      添加、更新用户
   */
   addUpdateUser = async () => {
      //隐藏弹框
      this.setState({
         showStatus:false
      })

      //获取所有表单数据
      const user = this.form.getFieldsValue()
      console.log(user)

      //重置表单
      this.form.resetFields()

      if (this.user) {
         user._id = this.user._id
      }

      //发送ajax请求
      const result = await reqAddOrUpdateUser(user)
      console.log(result)
      if(result.status === 0){
         message.success(`${!user._id?'添加':'更新'}用户成功!`)
         this.getUsers()
      }else{
         message.success(`${!user._id?'添加':'更新'}用户失败!`)
      }
   }

   
   /* 
      添加----增
   */
   addUser = () => {
      //清空user
      this.user = null

      //显示弹框
      this.setState({
         showStatus:true
      })
   }
   
   /* 
      更新----改
   */
   updateUser = (user) => {
      //保存user
      this.user = user

      //显示弹框
      this.setState({
         showStatus:true
      })
   }

   
   /* 
      删除用户----删
   */
   deleteUser = (user) => {
      confirm({
         title: `您确定要删除${user.username}用户吗?`,
         onOk: async() => {
           //收集数据
            const userId = user._id

            //发送请求
            const result = await reqDeleteUser(userId) 
            console.log(result)
            if(result.status === 0){
               message.success("删除用户成功")
               this.getUsers()
            }
         },
         onCancel() {
           console.log('Cancel');
         }
       });
   }


   /* 
      render()渲染之前，只执行1次
   */
   componentWillMount(){
     this.initColumns() 
   }

   /* 
      render()渲染之后，只执行一次，这里发送ajax请求
   */
   componentDidMount(){
      this.getUsers()
   }

   render(){
      const {loading,showStatus,users,roles} = this.state
      const user = this.user || {}
      const title = (
         <span className="btnBox">
            <Button type="primary" onClick={this.addUser}>创建用户</Button>
         </span>
      )
      return(
         <Card title={title}>
            <Table 
               bordered
               rowKey='_id'
               loading={loading}
               columns={this.columns} 
               dataSource={users} 
               pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
            />
            <Modal title={!user._id?'添加':'修改'} visible={showStatus} onOk={this.addUpdateUser} onCancel={this.handleCancelAddUser}>
               <UserAddUpdate setForm={this.setForm} user={user} roles={roles}></UserAddUpdate>
            </Modal>
         </Card>
      )
   }
}