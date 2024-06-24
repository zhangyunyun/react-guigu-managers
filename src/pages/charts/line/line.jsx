import React,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

import './line.less'
/*
   后台管理的柱状图路由组件
*/
export default class Line extends Component{

   state = {
      sales:[15, 30, 80, 20, 20, 40], //销量的数据
      stores:[10, 20, 60, 10, 50, 10] //库存的数据
   }


   /* 
      更新数据
   */
  updateData = () => {
     this.setState(state => ({
         sales:state.sales.map(sale => sale + 10),
         stores:state.stores.reduce((pre,store) => {
            pre.push(store + 20)
            return pre
         },[])
     }))
  }
   

   /* 
      设置默认参数
   */
   getOption1 = (sales,stores) => {
      return {
         tooltip: {},
         legend: {
            data:['销量', '库存']
         },
         xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
         },
         yAxis: {},
         series: [
            {
               name: '销量',
               type: 'line',
               data:sales
            }, 
            {
               name: '库存',
               type: 'line',
               data: stores
            }
         ]
      }
   }

   getOption2 = () => {
      return {
         xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
         },
         yAxis: {
            type: 'value'
         },
         series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
         }]
      }
   }

   render(){
      const {sales,stores} = this.state
      return(
         <div className="lineCharts">
            <Card>
               <Button type='primary' onClick={this.updateData}>更新</Button>
            </Card>
            <Card title="折线图1">
               <ReactEcharts option={this.getOption1(sales,stores)} style={{height:320}}></ReactEcharts>
            </Card>
            <Card title="折线图2">
               <ReactEcharts option={this.getOption2(sales,stores)} style={{height:320}}></ReactEcharts>
            </Card>
         </div>
      )
   }
}