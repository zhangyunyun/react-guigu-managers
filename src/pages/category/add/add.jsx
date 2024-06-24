import React, {Component} from 'react'
import {Form,Select,Input} from 'antd'

import PropTypes from 'prop-types'

/* 
   添加分类组件
*/
const Item = Form.Item
const Option = Select.Option
class AddForm extends Component{

   static propTypes = {
      categorys:PropTypes.array.isRequired,
      parentId:PropTypes.string.isRequired,
      setForm:PropTypes.func.isRequired
   }

   componentWillMount(){
      //接收父组件的setForm方法，将组件form作为参数传递给父组件
      const {setForm} = this.props
      setForm(this.props.form)
   }

   render(){
      const {categorys,parentId} = this.props
      const { getFieldDecorator } = this.props.form

      console.log(categorys)

      return(
         <Form>
            <Item>
               {
                  getFieldDecorator('parentId',{
                     initialValue:parentId
                  })(
                     <Select>
                        <Option value='0'>一级分类</Option>
                        {
                           categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                        }
                        {/* <Option value='0'>一级分类</Option>
                        <Option value='1'>001</Option>
                        <Option value='2'>002</Option>
                        <Option value='3'>003</Option> */}
                     </Select>
                  )
               }
            </Item>
            <Item>
               {
                  getFieldDecorator('categoryName',{
                     initialValue:'',
                     rules:[
                        {required:true,message:'请输入分类名称'}
                     ]
                  })(
                     <Input placeholder="请输入分类名称"></Input>
                  )
               }
            </Item>
         </Form>
      )
   }
}

const addCategoryForm = Form.create()(AddForm)
export default addCategoryForm