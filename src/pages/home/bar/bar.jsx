import React,{Component} from 'react'
import {
	Chart,
	Tooltip,
	Interval,
	Interaction
} from "bizcharts";

import './bar.less'

const data = [
	{ name: '销量', month: '1月', avgRainfall: 18.9 },
	{ name: '销量', month: '2月', avgRainfall: 28.8 },
	{ name: '销量', month: '3月', avgRainfall: 39.3 },
	{ name: '销量', month: '4月', avgRainfall: 20.4 },
	{ name: '销量', month: '5月', avgRainfall: 47 },
	{ name: '销量', month: '6月', avgRainfall: 20.3 },
	{ name: '库存', month: '1月', avgRainfall: 19.9 },
	{ name: '库存', month: '2月', avgRainfall: 28.8 },
	{ name: '库存', month: '3月', avgRainfall: 29.3 },
	{ name: '库存', month: '4月', avgRainfall: null },
	{ name: '库存', month: '5月', avgRainfall: 67 },
	{ name: '库存', month: '6月', avgRainfall: null },
	{ name: '生产', month: '1月', avgRainfall: 12.4 },
	{ name: '生产', month: '2月', avgRainfall: 23.2 },
	{ name: '生产', month: '3月', avgRainfall: 34.5 },
	{ name: '生产', month: '4月', avgRainfall: null },
	{ name: '生产', month: '5月', avgRainfall: 52.6 },
	{ name: '生产', month: '6月', avgRainfall: 35.5 },
];

export default class Bar extends Component {
   render(){
      
      return(
         <div className="bar">
            <Chart  
              padding="auto" 
              data={data} 
              autoFit 
              filter={[
                ['avgRainfall', val => val != null] // 图表将会只渲染过滤后的数据
              ]}>
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
                color="name"
                position="month*avgRainfall"
              />
              <Tooltip shared />
              <Interaction type="active-region" />
            </Chart>
         </div>
      )
   }
}