import React,{Component} from 'react'
import {Card, Col, Row, Icon} from 'antd'

import Line from './line/line.jsx'
import Bar from './bar/bar.jsx'
import Cloud from './cloud/cloud.jsx'
import Log from './log/log.jsx'
import Info from './info/info'
import Calendars from './calendars/calendars.jsx'

import './home.less'

export default class Home extends Component{
  render(){
     const cardList = [
        {color:'#ffba5b',type:'video-camera',title:'视频播放器'},
        {color:'#6dd5d0',type:'table',title:'表格'},
        {color:'#b886d5',type:'database',title:'源码'},
        {color:'#60bceb',type:'book',title:'书籍'},
        {color:'#ffa181',type:'notification',title:'公告'},
        {color:'#ffb800',type:'message',title:'评论'},
        {color:'#ff8bbb',type:'gift',title:'礼物'},
        {color:'#6ee270',type:'coffee',title:'休息一下'}
     ]
     return(
         <div className="home">
            <Row gutter={{ xs: 8, sm: 16}}>
               <Col className="gutter-row" span={6}>
                  <Card title="访问量" bordered={false}>
                     <Line></Line>
                  </Card>
               </Col>
               <Col className="gutter-row" span={6}>
                  <Card title="授权数" bordered={false}>
                     <Bar></Bar>
                  </Card> 
               </Col>
               <Col className="gutter-row" span={12}>
                  <Card title="云标签" bordered={false}>
                     <Cloud></Cloud>
                  </Card> 
               </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16}} className='cardRow'>
               {
                  cardList.map(item => {
                     return <Col className="gutter-row" span={3}>
                        <Card className="cardItem">
                           <Icon className="cardItem_ico" type={item.type} style={{color:item.color}} />
                           <p className="cardItem_txt">{item.title}</p>
                        </Card>
                     </Col>
                  })
               }
            </Row>
            <Row gutter={{ xs: 8, sm: 16}} className='infoRow'>
               <Col className="gutter-row" span={14}>
                  <Card title="更新日志" bordered={false}>
                     <Log></Log>
                  </Card> 
               </Col>
               <Col className="gutter-row" span={10}>
                  <Card title="日历" bordered={false}>
                     <Calendars></Calendars>
                  </Card> 
               </Col>
            </Row>  
            <Row gutter={{ xs: 8, sm: 16}} className='infoRow'>
               <Col className="gutter-row">
                  <Card title="依赖信息" bordered={false}>
                     <Info></Info>
                  </Card>  
               </Col>
            </Row> 
         </div>
     )
  }
}