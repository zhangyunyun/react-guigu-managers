/* 
   登录组件
*/
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {Form, Input,Icon, Button, message} from 'antd'

import { reqLogin } from '../../api'

import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'

import './login.less'
import logo from '../../assets/images/logo.png'

const Item = Form.Item  //不能定义在import之前

class Login extends Component {  
   /* 
      函数使用箭头函数解决this指向
   */

   //自定义表单验证(验证密码)
   validatorPwd = (rule, value, callback) => {
      const thisValLen = value && value.length
      const pwdReg = /^[a-zA-Z0-9]+$/
      if(!value){
         callback('必须输入密码')
      }else if(thisValLen < 4){
         callback('密码必须大于4位')
      }else if(thisValLen > 12){
         callback('密码必须小于12位')
      } else if (!pwdReg.test(value)) {
         callback('密码必须是英文、数字或下划线组成')
      }else{
         callback() //验证通过,必须调用callback
      }
   }

   //提交表单
   handleSubmit = (e) => {
      //阻止事件默认行为，防止提交表单时页面跳转
      e.preventDefault();

      setTimeout(() => {
         //对所有表单字段进行校验
         this.props.form.validateFields(async(err, values) => {
            //校验成功
            if (!err) {
               //console.log('校验成功', values)

               //1.这里发送请求，获取登录信息
               const {username, password} = values

               //2.发送请求，发送请求是否成功; 而不是登录是否成功
               /* 
                  情况1：reqLogin(username, password) 返回的是一个promise对象

                         问题：不想要promise对象，而是请求成功返回的具体value数据
               */
               // reqLogin(username, password).then(response => {
               //    console.log('登录请求后台接口成功', response.data)
               // }).catch(error => {
               //    console.log('登录请求后台接口失败', error)
               // })

               /* 
                  情况2：我想要的是返回的具体结果值value，而不是一个promise对象
                         需要用到async & await等待响应的结果

                         只能返回成功的数据,想要失败的错误提示
                         需要用到try{} catch(){}来捕获异常

                         问题： 每次都要写到try{} catch(){}中请求，代码重复太多
                                到ajax分装请求函数中统一处理请求异常
               */
               // try{
               //    const result = await reqLogin(username, password)
               //    console.log('登录请求后台接口成功' + result.data)
               // }catch(error){
               //    console.log('登录请求后台接口失败' + error.messages)
               // }

               /* 
                  情况3：优化后
               */
               const result = await reqLogin(username, password)
               console.log('登录请求后台的结果:',result)

               //3.登录是否成功
               if (result.status === 0) {
                  //登录成功，提示登录成功信息
                  message.success('登录成功')

                  //存储用户信息
                  const user = result.data
                  memoryUtils.user = user //保存到内存中
                  storageUtils.saves(user) //保存到local中

                  //跳转到管理主界面(不需要回退到登录界面)push repalce goBack
                  this.props.history.replace('/')
               }else{
                  //登录失败，提示登录失败信息
                  message.error(result.msg)
               }

            } else {
               //如果校验失败
               console.log('校验失败' + err)
            }
         })
      }, 0);
   
      //得到form对象
      // const form = this.props.form
      // //获取表单项的输入数据(是一个对象)
      // const values = form.getFieldsValue()
      // console.log(values)
   }

   render(){
      //判断用户是否登录
      if (memoryUtils.user && memoryUtils.user._id) {
         //已经登录，跳转到admin
         return <Redirect to="/" />
      }
      
      const { getFieldDecorator } = this.props.form

      return (
         <div className='login'>
            <header className='login-header'>
               <img src={logo} alt="logo" />
               <h1>React 项目: 后台管理系统</h1>
            </header>
            <section className='login-content'>
               <h3>用户登陆</h3>
               <Form className="login-form" onSubmit={this.handleSubmit}>
                  <Item>
                     {
                        /*
                           getFieldDecorator 是一个高阶函数(返回值是一个函数)
                           getFieldDecorator('标识名称'，配置对象)(组件标签) 返回新的标签
                           经过 getFieldDecorator 包装的表单控件会自动添加 value 和 onChange，数据同步将被 form 接管
                        */
                        getFieldDecorator('username', {
                           //声明式验证(直接使用别人定义好的验证规则)
                           rules: [
	                           {required: true, whitespace: true, message: '请输入用户名'},
	                           {min: 4, message: '用户名必须大于 4 位'},
	                           {max: 12, message: '用户名必须小于 12 位'},
	                           {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
                           ]
                        })(
                           <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />} 
                              placeholder="请输入用户名" />
                        )
                     }
                  </Item>
                  <Item>
                     {
                       getFieldDecorator('password', {
                           //自定义表单验证规则
                           rules: [
	                           {
                                 validator: this.validatorPwd
                              }
                           ]
                       })(
                           <Input prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />}
                             type="password"
                             placeholder="请输入密码" />
                       )
                     }
                  </Item>
                  <Item>
                     <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                  </Item>
               </Form>
            </section>
         </div>
      )
   }
}
/* 
   高阶组件本质就是一个函数
   接收一个组件(被包装组件)，返回一个新的组件，包装组件会向被包装组件传递特定的属性
   高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
*/
const WrapLogin = Form.create({})(Login)
export default WrapLogin