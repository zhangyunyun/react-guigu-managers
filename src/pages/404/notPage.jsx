import React, {Component} from 'react'
import {Button} from 'antd'

import './notPage.less'
/*
   前台 404 页面
*/
export default class NotFound extends Component {
   goHome = () => {
      this.props.history.replace('/home')
   }
   render() {
      return (
         <div className='notFound'>
            <div className="notFoundRow">
               <div className='left'>
                  <div className="notFoundImg"></div>
               </div>
               <div className='right'>
                  <h1>404</h1>
                  <h2>抱歉，你访问的页面不存在</h2>
                  <div>
                     <Button type='primary' onClick={this.goHome}>回到首页</Button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}