import React,{Component} from 'react'
import {Card,Table,Button,Modal,message} from 'antd'

import {reqRoles,reqAddRole,reqUpdateRole} from '../../api'

import {PAGE_SIZE} from '../../utils/constants.js'

import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
import {formateDate} from '../../utils/dateUtils.js'

import AddForm from './add/add'
import AuthForm from './auth/auth'

import './role.less'


export default class Role extends Component{

   state = {
      loading:false,
      showStatus:0, //是否显示弹框, 0表示隐藏 1表示添加角色 2表示设置角色权限
      roles:[],  //存放角色列表的数组
      role:{},  //存放选中的row
      selectedRowKeys:[]
   }

   constructor(props){
      super(props)

      //用来保存ref标识的标签对象(组件对象)的容器，它将子组件包裹到这个容器里
      this.authRef = React.createRef()
   }

   /* 
      初始化table所有列的数组
   */
   initColumns = () => {
      this.columns = [
         {
            title:'角色名称',
            dataIndex:'name'
         },
         {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time) => formateDate(create_time)
         },
         {
            title:'授权时间',
            dataIndex:'auth_time',
            render:formateDate  //简写方式
         },
         {
            title:'授权人',
            dataIndex:'auth_name'
         }
      ]
   }

   /* 
      异步获取角色列表数据
   */
   getRoles = async () => {
      this.setState({
         loading:true
      })
      const result = await reqRoles()
      this.setState({
         loading:false
      })
      if(result.status === 0){
         const roles = result.data
         this.setState({
            roles
         })
      }else{
         message.error('请求角色列表失败')
      }
   }

   /* 
      定义一个函数接收子组件传递过来的form
   */
   setForm = (form) =>{
      return this.form = form
   }

   /* 
      点击整行选中整行，同时选中单选框
      selectedRowKeys：接收的是一个数组
                       将当前选中项的_id存到一个新的数组里面，赋值给selectedRowKeys
                       更新selectedRowKeys的值(保持和单击单选按钮选中的selectedRowKeys的值相同(即选中单选按钮了))
                       
   */
   handleRow = (record,index) => {
      return { //固定写法
         onClick:() => {
            this.setState({
               role:record,
               selectedRowKeys:[record._id]
            },() => {
               console.log(this.state.selectedRowKeys,'111111')
            })

         }
      }
   }

   /* 
      选中项发生变化时的回调
   */
   selectChange = (selectedRowKeys,selectedRows) => {
      this.setState({
         role:selectedRows[0],
         selectedRowKeys
      })           
   }

   /* 
      点击创建角色按钮，显示创建角色弹框
   */
   handleAddRole = () => {
      this.setState({
         showStatus:1
      })
   }

   /* 
      点击设置角色权限按钮，显示设置角色权限弹框
   */
   handleAuthRole = () => {
      this.setState({
         showStatus:2
      })
   }

   /* 
      弹框-取消按钮(添加角色)
   */
   handleCancelAddRole = () => {
      this.setState({
         showStatus:0
      })
      this.form.resetFields()  //重置字段，清除默认显示输入的数值，下次可以重新输入
   }

   /* 
      弹框-取消按钮(更新角色)
   */
   handleCancelAuth = () => {
      this.setState({
         showStatus:0
      })
   }


   /* 
      添加角色
   */
   addRole = () =>{
      //验证表单，添加角色
      this.form.validateFields(async (err,values) => {
         //校验成功
         if(!err){
            //关闭弹框
            this.setState({
               showStatus:0
            })
            //收集数据
            const {roleName} = values 
            //重置表单
            this.form.resetFields()  //重置字段，清除默认显示输入的数值，下次可以重新输入
            //发送请求
            const result = await reqAddRole(roleName)     
            if(result.status === 0){
               //方式一：重新获取角色列表
               //this.getRoles()

               //方式二：新产生的角色
               const role = result.data  //取出新添加的数据列表
               //更新roles状态
               // const {roles} = this.state //取出状态中的数据列表
               // roles.push(role)
               // this.setState({
               //    roles
               // })

               //方式三：更新roles状态, 基于原本状态数据，再添加一条新数据，不影响原数据
               this.setState(state => ({
                  roles:[...state.roles,role]
               }))

               message.success("添加角色成功！")

            }else{
               message.error("添加角色失败！")
            }
         }
      })
   }

   /* 
      设置角色权限
   */
   authRole = async () => {
      //关闭弹框
      this.setState({
         showStatus:0
      })
      //原数据
      const role = this.state.role
      //1.收集数据(即选择后的角色列表，从子组件传递过来的最新的menus数据)
      const menus = this.authRef.current.getMenus()
      role.menus = menus
      role.auth_time = Date.now()
      role.auth_name = memoryUtils.user.username //登录的用户的名称
      //2.发送ajax请求
      const result = await reqUpdateRole(role)
      if(result.status === 0){
         //获取列表1
         //this.getRoles()

         //如果当前更新的是自己角色的权限，强制退出
         if(role._id === memoryUtils.user.role_id){
            memoryUtils.user = {}
            storageUtils.removes()
            this.props.history.replace('/login')
            message.success("当前角色权限修改了，请重新登录！")
         }else{
            //获取列表2
            this.setState({
               roles: [...this.state.roles]
            })
            message.success("设置角色权限成功！")
         }
         

      }else{
         message.error("设置角色权限失败！")
      }
   }


   /* 
      在render之前,只执行1次
   */
   componentWillMount(){
      this.initColumns()
   }

   /* 
      在render之后,只执行1次,这里发送ajax请求 
   */
   componentDidMount(){
      this.getRoles()      
   }

   render(){
      const {loading,showStatus,roles,role,selectedRowKeys} = this.state 
      const title = (
         <span className="btnBox">
            <Button type="primary" onClick={this.handleAddRole}>创建角色</Button>
            {/* <Button type="primary" onClick={this.handleAuthRole} disabled={!role._id}>设置角色权限</Button> */}
            <Button type="primary" onClick={this.handleAuthRole} disabled={!role._id && !selectedRowKeys.length}>设置角色权限</Button>
         </span>
      )
      const rowSelection = {
         type:'radio',
         selectedRowKeys,
         onChange: this.selectChange //点击radio触发
       };
      return(
         <Card title={title}>
            <Table 
               bordered
               loading={loading}
               rowKey={role => role._id}
               columns={this.columns} 
               dataSource={roles} 
               pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
               rowSelection={rowSelection}
               onRow={this.handleRow} //点击行触发
            />

            <Modal title="添加角色" visible={showStatus === 1} onOk={this.addRole} onCancel={this.handleCancelAddRole}>
               <AddForm setForm={this.setForm}></AddForm>
            </Modal>

            <Modal title="设置权限角色" visible={showStatus === 2} onOk={this.authRole} onCancel={this.handleCancelAuth}>
               <AuthForm ref={this.authRef} role={role}></AuthForm>
            </Modal>   
         </Card>
      )
   }
}