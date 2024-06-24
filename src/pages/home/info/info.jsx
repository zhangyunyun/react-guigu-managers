import React,{Component} from 'react'
import { Descriptions} from 'antd'

import './info.less'

export default class Info extends Component{
   
   render(){
      return(
         <div className="info">
            <Descriptions bordered>
               <Descriptions.Item label="react">^17.0.2</Descriptions.Item>
               <Descriptions.Item label="react-dom">^17.0.2</Descriptions.Item>
               <Descriptions.Item label="redux">^4.1.1</Descriptions.Item>
               <Descriptions.Item label="react-redux">^7.2.5</Descriptions.Item>
               <Descriptions.Item label="redux-thunk">^2.3.0</Descriptions.Item>
               <Descriptions.Item label="axios">^0.21.1</Descriptions.Item>
               <Descriptions.Item label="antd">^3.18.1</Descriptions.Item>
            </Descriptions>
         </div>
      )
   }
}