import React, {Component} from 'react'
import {Form,Input} from 'antd'

import PropTypes from 'prop-types'

const Item = Form.Item

class UpdateForm extends Component{
   
   //接收父组件传递的数据
   static propTypes = {
      categoryName:PropTypes.string.isRequired,
      setForm:PropTypes.func.isRequired
   }

   componentWillMount(){
      //接收父组件的setForm方法，将组件form作为参数传递给父组件
      const {setForm} = this.props
      setForm(this.props.form)
   }

   render(){
      const { categoryName } = this.props
      const { getFieldDecorator } = this.props.form

      return(
         <Form>
            <Item>
               {
                  getFieldDecorator('categoryName',{
                     initialValue:categoryName,
                     rules:[
                        {required:true,message:'请输入分类名称'}
                     ]
                  })(
                     <Input placeholder="分类名称"></Input>
                  )
               }
            </Item>
         </Form>
      )
   }
}

const updateCategoryForm = Form.create()(UpdateForm)
export default updateCategoryForm