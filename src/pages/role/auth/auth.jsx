import React,{PureComponent} from 'react'
import {Form,Input,Tree} from 'antd'

import PropTypes from 'prop-types'

import menuList from '../../../config/menuConfig.js'
/* 
   设置角色权限组件
*/
const Item = Form.Item
const TreeNode = Tree.TreeNode

export default class AuthForm extends PureComponent{

   static propTypes = {
      role:PropTypes.object
   }

   /* 
      方式一 设置初始值
   */
   // state = {
   //    menus:[]
   // }

   /* 
      方式二 设置初始值
   */
   constructor(props){
      super(props)

      //根据接收到的menus数据初始化menus
      const {menus} = this.props.role
      this.state = {
         menus
      }
   }

   /* 
      获取角色列表，生成树形结构展示模块
      menuList 角色列表数据就是导航左侧列表数据
   */
   getTreeNodes = (menuList) => {
      return menuList.reduce((pre,item) => {
         pre.push(
            <TreeNode title={item.title} key={item.key}>
               {item.children ? this.getTreeNodes(item.children) : null}
            </TreeNode>
         )
         return pre
      },[])
   }

   /* 
      为父组件提交获取最新 menus 数据的方法
   */
   getMenus = (menus) => {
      return this.state.menus
   }

   /* 
      点击树形列表复选框触发时回调，选中后的新的数据列表，更新初始状态为新数据
   */
   onCheck = (menus) => {
      this.setState({
         menus
      })
   }

   /* 
      数据化初始后，但还未渲染DOM
   */
   componentWillMount(){
      this.treeMenu = this.getTreeNodes(menuList)
   }

   
   /* 
      根据新传入的 role 来更新 checkedKeys 状态
      当组件接收到新的属性时自动调用
   */
   componentWillReceiveProps(nextProps) {
      if (nextProps.role.menus !== this.props.role.menus) {
        this.setState({ 
            menus: nextProps.role.menus   
        });
        //this.state.menus = nextProps.role.menus
      }
   }

   render(){
      console.log('设置角色权限 render()')
      const {role} = this.props
      const {menus} = this.state

      //指定Item布局的配置对象
      const formItemLayout = {
         labelCol: { span: 4 },  // 左侧label的宽度
         wrapperCol: { span: 15 }, // 右侧包裹的宽度
      }

      return(
        <Form className="authForm">
            <Item label="角色名称" {...formItemLayout}>
               <Input value={role.name} disabled />
            </Item>
            <Tree
               checkable
               defaultExpandAll={true}
               checkedKeys={menus}
               onCheck={this.onCheck}
               // onExpand={onExpand}
               // expandedKeys={expandedKeys}
               // autoExpandParent={autoExpandParent}
               // onCheck={onCheck}
               // checkedKeys={checkedKeys}
               // onSelect={onSelect}
               // selectedKeys={selectedKeys}
               // treeData={treeData}
            >
               <TreeNode title="平台权限" key="all">
                  {/* <TreeNode title="parent 1-0" key="0-0-0">
                     <TreeNode title="leaf" key="0-0-0-0"></TreeNode>
                     <TreeNode title="leaf" key="0-0-0-1"></TreeNode>
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                     <TreeNode title="sss" key="0-0-1-0"></TreeNode>
                  </TreeNode> */}
                  {
                     this.treeMenu
                  }
               </TreeNode>
            </Tree>
        </Form> 
        
      )
   }
}


