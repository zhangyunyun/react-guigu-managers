import React,{Component} from 'react'
import {Timeline} from 'antd'

import './log.less'

export default class Log extends Component{
   state = {
      timeList:[
         {
            title:'更新',
            context:'随着用户的访问量增大,功能不能满足需求，我们进行了重大更新',
            date:'2021-10-18',
            color:'green'
         },
         {
            title:'展望',
            context:'虽然功能还未健全，但是我们已迫不及待的让它去接受广大用户的火眼金睛',
            date:'2020-10-18',
            color:'gray'
         },
         {
            title:'探讨',
            context:'在集体探讨下，发现目前的HTML5 CSS3 发展历程已经不能满足需求',
            date:'2019-10-18',
            color:'gray'
         },
         {
            title:'推出',
            context:'推出了HTML5 CSS3 官方微博',
            date:'2018-10-18',
            color:'gray'
         }
      ]
   }
   render(){
      const {timeList} = this.state
      return(
         <div className="log">
            <Timeline>
               {
                  timeList.map(item => {
                     return <Timeline.Item color={item.color}>
                        <h2>{item.title}</h2>
                        <p>{item.context}</p>
                        <span>{item.date}</span>
                     </Timeline.Item>
                  })
                  
               }
            </Timeline>
         </div>
      )
   }
}