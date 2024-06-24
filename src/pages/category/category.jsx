import React,{Component} from 'react'
import {Card,Table,Button,Icon,Modal,message} from 'antd';

import {
   reqCategorys,
   reqUpdateCategory,
   reqAddCategory
} from '../../api'

import LinkButton from '../../components/link-button/link-button'
import AddForm from './add/add'
import UpdateForm from './update/update'

import './category.less'

export default class Category extends Component{
   
   state = {
      loading:false, //加载,是否正在请求数据中
      categorys:[],  //一级分类列表数据
      parentId:'0', //需要显示的分类的列表的父分类ID
      parentName:'', //需要显示的分类的列表的父分类名称
      subCategorys:[], //子分类列表数据
      showStatus:0, //是否显示对话框  0不显示，1显示添加分类框，2显示修改分类框
   }

   /* 
      初始化table所有列的数组
   */
   initColumns = () => {
      this.columns = [
         {
           title: '分类名称',
           dataIndex: 'name',
         },
         {
           title: '操作',
           width:300,
           render: (category) => (
              <span>
                 <LinkButton onClick={() => this.handelUpdateCategory(category)}>修改分类</LinkButton>
                 {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategory(category)}>查看子分类</LinkButton> : null}
              </span>
           )
         }
      ]
   }

   /* 
      异步获取一级分类/二级分类列表数据
   */
   getCategory = async(parentId) => {
      //发送请求前，提示正在加载中
      this.setState({
         loading:true
      })
      
      //const {parentId} = this.state
      parentId = parentId || this.state.parentId
      
      // const result = await reqCategorys('0')
      const result = await reqCategorys(parentId)
      //请求完成,隐藏正在加载中
      this.setState({
         loading:false
      })
      if(result.status === 0){
         //取出分类列表数据，保存一下(可能是一级也可能是二级分类)
         const categorys = result.data
         if(parentId === '0'){
            //更新状态一级分类
            this.setState({
               categorys:categorys
            })
         }else{
            //更新状态二级分类
            this.setState({
               subCategorys:categorys
            })
         }
         
      }else{
         //请求失败
         message.error('请求分类列表失败')
      }
   }

   /* 
      二级列表返回一级列表
   */
   showCategory = () => {
      //设置状态
      this.setState({
         parentId:'0',
         parentName:'',
         subCategorys:[]
      })
   }

   /* 
      显示指定一级分类对应的二级列表
   */
   showSubCategory = (category) => {
      //更新状态
      this.setState({
         parentId:category._id,
         parentName:category.name
      },() => {//在状态更新且重新render()后执行
         const {parentId} = this.state
         console.log(parentId)  //'0'
         //获取二级分类列表显示
         this.getCategory()
      })

      // const {parentId} = this.state
      // console.log(parentId)  //'0'
      // this.getCategory()
   }
   
   /* 
      定义一个函数接收子组件传递过来的form
   */
   setForm = (form) =>{
      return this.form = form
   }

   /* 
      点击添加分类按钮，显示添加分类弹框
   */
   handelAddCategory = () => {
      //更新状态
      this.setState({
         showStatus:1
      })
   }

   /* 
      点击修改分类按钮，显示修改分类弹框
   */
   handelUpdateCategory = (category) => {
      //保存分类对象
      this.category = category
      //更新状态
      this.setState({
         showStatus:2
      })  
   }

   /* 
      弹框-取消按钮,隐藏弹框
   */
   handleCancel = () =>{
      this.setState({
         showStatus:0
      })
   }

   /* 
      弹框-确定按钮,添加分类
   */
   addCategory = () => {
      //表单验证
      this.form.validateFields(async (err,values) => {
         if(!err){
            //1.隐藏修改分类弹框
            this.setState({
               showStatus:0
            })

            //2.收集表单数据，发送请求需要传递参数的数据
            // const parentId = this.form.getFieldValue('parentId')
            // const categoryName = this.form.getFieldValue('categoryName')
            const {parentId,categoryName} = values
            
            //4.清除数据
            this.form.resetFields()

            //3.发送ajax请求
            const result = await reqAddCategory(parentId,categoryName)
            if(result.status === 0){
               //选择添加的分类就是当前分类列表下的分类
               if(parentId === this.state.parentId){
                  //重新获取当前分类列表数据
                  this.getCategory()
               }else if(parentId === '0'){
                  //如果在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要返回一级列表
                  //this.getCategory('0')  //这样会返回一级列表
                  this.getCategory('0')  //如果不想返回一级列表，需要在获取列表方法getCategory(parentId)中传入parentId
               }
               
               message.success("添加分类成功！")

            }else{
               message.error("添加分类失败！")
            }
         }
      })      
   }

   /* 
      弹框-确定按钮,修改分类
   */
   updateCategory = () => {

      this.form.validateFields(async (err,values) => {
         if(!err){
            //1.隐藏修改分类弹框
            this.setState({
               showStatus:0
            })

            console.log(values)

            //2.收集表单数据,发送请求需要传递参数的数据
            const categoryId = this.category._id
            // const categoryName = this.form.getFieldValue('categoryName')
            const {categoryName} = values

            //4.清除输入数据
            this.form.resetFields()

            //3.发送请求,更新分类
            const result = await reqUpdateCategory({categoryId,categoryName})
            if(result.status === 0){
               //3.重新显示分类列表
               this.getCategory()

               message.success("修改分类成功！")
               
            }else{
               message.error("修改分类失败！")
            }
         }
      })
   }

   /* 
      在render()之前,只执行一次
   */
   componentWillMount(){
      //初始化Table所有列的数组
      this.initColumns()
   }

   /* 
      在render()之后
      执行异步操作,发送ajax请求/启动定时器
   */
   componentDidMount(){
      //异步获取分类列表
      this.getCategory()
   }

   render(){
      //读取状态数据
      const {loading,categorys,parentId,parentName,subCategorys,showStatus} = this.state
      //读取指定的分类
      const category = this.category || {}
      
      const title = parentId==='0'?'一级分类列表': (
         <span className="categoryTitle">
            <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
            <Icon type='arrow-right' className="arrowName"></Icon>
            <span>{parentName}</span>
         </span>
      )
      const extra = (
         <Button type="primary" onClick={this.handelAddCategory}>
            <Icon type="plus" />添加
         </Button>
      )
      return(
         <div>
            <Card title={title} extra={extra}>
               <Table 
                  bordered
                  rowKey='_id'
                  loading={loading}
                  columns={this.columns} 
                  dataSource={parentId==='0'?categorys:subCategorys} 
                  pagination={{defaultPageSize:5,showQuickJumper:true}}
               />
            </Card>

            <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
               <AddForm 
                  categorys={categorys} 
                  parentId={parentId}
                  setForm={this.setForm}>
               </AddForm>
            </Modal>

            <Modal title="修改分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
               <UpdateForm 
                  categoryName={category.name} 
                  setForm={this.setForm}>
               </UpdateForm>
            </Modal>
         </div>
      )
   }
}           