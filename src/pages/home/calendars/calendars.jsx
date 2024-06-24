import React,{Component} from 'react'
import {Calendar} from 'antd'
import 'moment/locale/zh-cn';

import './calendars.less'

export default class Calendars extends Component{
   state = {
      locale: {
          lang: {
            month: '月',
            year: '年'
          }
      }
   }

   onPanelChange = (value, mode) => {
      console.log(value.format('YYYY-MM-DD'), mode);
   }
   render(){
      const {locale} = this.state
      return(
         <div className="calendars">
            <Calendar 
               fullscreen={false} 
               locale={locale}
               onPanelChange={this.onPanelChange}
            ></Calendar>
         </div>
      )
   }
}