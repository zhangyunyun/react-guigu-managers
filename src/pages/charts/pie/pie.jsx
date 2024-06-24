import React,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

import './pie.less'
/*
   后台管理的柱状图路由组件
*/
export default class Pie extends Component{
   
   constructor(props){
      super(props)

      this.state = {
         visitors:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:648, name:'搜索引擎'}
         ]
      }
   }

   /* 
      更新数据
   */
   updateData = () => {
      this.setState((state) => ({
         visitors:state.visitors.reduce((pre,visitor) => {
            pre.push({
               value:visitor.value + 200,
               name:visitor.name
            })
            return pre
         },[])
      }))
   }


   /* 
      设置默认参数
   */
   getOption = (visitors) => {
      return {
         title : {
            text: '某站点用户访问来源',
            subtext: '测试数据',
            x:'center'
         },
         tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
         },
         legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
         },
         series : [{
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:visitors,
            emphasis: {
               shadowBlur: 10,
               shadowOffsetX: 0,
               shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
         }]
      }
   }

   render(){
      const {visitors} = this.state
      return(
         <div className="pieCharts">
            <Card>
               <Button type='primary' onClick={this.updateData}>更新</Button>
            </Card>
            <Card title="饼图">
               <ReactEcharts option={this.getOption(visitors)} style={{height:320}}></ReactEcharts>
            </Card>
         </div>
      )
   }
}