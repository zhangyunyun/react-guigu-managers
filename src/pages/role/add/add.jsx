import React,{PureComponent} from 'react'
import {Form,Input} from 'antd'

import PropTypes from 'prop-types'
/* 
   添加角色组件
*/
const Item = Form.Item

class AddForm extends PureComponent{

   static propTypes = {
      setForm:PropTypes.func.isRequired
   }

   componentWillMount(){
      //接收父组件的setForm方法，将组件form作为参数传递给父组件
      const {setForm} = this.props
      setForm(this.props.form)
   }

   render(){
      const { getFieldDecorator } = this.props.form

      //指定Item布局的配置对象
      const formItemLayout = {
         labelCol: { span: 4 },  // 左侧label的宽度
         wrapperCol: { span: 15 }, // 右侧包裹的宽度
      }

      return(
         <Form {...formItemLayout}>
            <Item label="角色名称">
               {
                  getFieldDecorator('roleName',{
                     initialValue:'',
                     rules:[
                        {required:true,message:'请输入角色名称'}
                     ]
                  }
                  )(
                     <Input placeholder="请输入角色名称" />
                  )
               }
            </Item>
         </Form>
      )
   }
}

 const AddRoleForm = Form.create()(AddForm)
 export default AddRoleForm