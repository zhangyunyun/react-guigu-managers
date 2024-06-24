import React,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

import './bar.less'
/*
   后台管理的柱状图路由组件
*/
export default class Bar extends Component{

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
   getOption = (sales,stores) => {
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
               type: 'bar',
               data:sales
            }, 
            {
               name: '库存',
               type: 'bar',
               data: stores
            }
         ]
      }
   }

   render(){
      const {sales,stores} = this.state
      return(
         <div className="barCharts">
            <Card>
               <Button type='primary' onClick={this.updateData}>更新</Button>
            </Card>
            <Card title="柱状图">
               <ReactEcharts option={this.getOption(sales,stores)} style={{height:320}}></ReactEcharts>
            </Card>
         </div>
      )
   }
}