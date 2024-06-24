import React,{Component} from 'react'
import {
   Chart,
   Area,
   Line,
   Tooltip
 } from 'bizcharts';

import './line.less'

export default class LabelLine extends Component{
   render(){
      const data = [
         { year: '2016', value: 15468 },
         { year: '2017', value: 16100 },
         { year: '2018', value: 15900 },
         { year: '2019', value: 17409 },
         { year: '2020', value: 17000 },
         { year: '2021', value: 31056 }
       ];
       
       const scale = {
         value: {
           min: 10000,
           nice: true,
         },
         year: {
           range: [0, 1],
         },
       };
      return(
         <div className="line">
            <Chart scale={scale} data={data} autoFit>
               <Tooltip shared />
               <Area position="year*value" />
               <Line position="year*value" />
            </Chart>
         </div>
      )
   }
}