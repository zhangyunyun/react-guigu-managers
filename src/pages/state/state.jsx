import React,{Component} from 'react'
import {Tabs} from 'antd'

import StateBase from './state-base/state-base'
import StateRedux from './state-redux/state-redux'
/* import StateReactReduxs from './state-reactRedux/state-reactRedux' */

import './state.less'

const {TabPane} = Tabs

export default class State extends Component{
   render(){
      return(
         <div className="reduxBox">
            <Tabs defaultActiveKey="1" type="card">
               <TabPane tab="普通状态管理" key="1">
                 <StateBase></StateBase>
               </TabPane>
               <TabPane tab="redux状态管理" key="2">
                  <StateRedux></StateRedux>
               </TabPane>
               {/* <TabPane tab="react-redux状态管理" key="3">
                  <StateReactReduxs></StateReactReduxs>
               </TabPane> */}
            </Tabs>
         </div>
      )
   }
}
