import React,{PureComponent} from 'react'
import {Form,Input,Select} from 'antd'

import PropTypes from 'prop-types'
/* 
   添加角色组件
*/
const Item = Form.Item
const Option = Select.Option
class UserAddUpdate extends PureComponent{

   static propTypes = {
      setForm:PropTypes.func.isRequired,
      user:PropTypes.object,
      roles:PropTypes.array
   }

   componentWillMount(){
      const {setForm} = this.props
      setForm(this.props.form) //将form通过setForm()方法传递给父组件
   }

   render(){
      const {user,roles} = this.props
      const { getFieldDecorator } = this.props.form
      console.log(user)

      //指定Item布局的配置对象
      const formItemLayout = {
         labelCol: { span: 4 },  //左侧label的宽度
         wrapperCol: { span: 15 }, //右侧包裹的宽度
      }

      return(
         <Form {...formItemLayout}>
            <Item label="用户名">
               {
                  getFieldDecorator('username',{
                     initialValue:user.username,
                     rules:[
                        {required:true,message:'请输入用户名'}
                     ]
                  }
                  )(
                     <Input type="text" placeholder="用户名" />
                  )
               }
            </Item>
            <Item label="密码">
               {
                  !user._id ? 
                  ( getFieldDecorator('password',{
                        initialValue:"",
                        rules:[
                           {required:true,message:'请输入密码'}
                        ]
                     }
                     )(
                        <Input type="password" placeholder="请输入密码"/>
                     )
                  ):null
               }
            </Item>
            <Item label="手机号">
               {
                  getFieldDecorator('phone',{
                     initialValue:user.phone,
                     rules:[
                        {required:true,message:'请输入手机号'}
                     ]
                  }
                  )(
                     <Input type="phone" placeholder="请输入手机号"/>
                  )
               }
            </Item>
            <Item label="邮箱">
               {
                  getFieldDecorator('email',{
                     initialValue:user.email,
                     rules:[
                        {required:true,message:'请输入邮箱'}
                     ]
                  }
                  )(
                     <Input type="email" placeholder="请输入邮箱"/>
                  )
               }
            </Item>
            <Item label="角色">
               {
                  getFieldDecorator('role_id',{
                     initialValue:user.role_id,
                     rules:[
                        {required:true,message:'请选择所属角色'}
                     ]
                  }
                  )(
                     <Select style={{width: 200}} placeholder='请选择所属角色'>
                        {/* <Option value='0' key="0">角色名称</Option> */}
                        {
                           roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                        }
                     </Select>
                  )
               }
            </Item>
         </Form>
      )
   }
}

 const UserAddUpdateForm = Form.create()(UserAddUpdate)
 export default UserAddUpdateForm