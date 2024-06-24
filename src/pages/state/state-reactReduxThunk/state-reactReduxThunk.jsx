/* 
  UI组件
*/
import React, {Component} from 'react'
import {Select,Button} from 'antd'

import PropTypes from 'prop-types'

/* 
   react-redux状态管理
*/

const Option = Select.Option

export default class StateReactRedux extends Component{

   static propTypes = {
      count:PropTypes.number.isRequired,
      increment:PropTypes.func.isRequired,
      decrement:PropTypes.func.isRequired
   }

   state = {
      selList:['1','2','3','4','5','6','7','8','9'],
      selValue:'1'
   }

   getValue = (value) => {
      //获取被选中的值
      this.setState({
         selValue:value
      })
   }

   /* 
      增加
   */
   increments = () => {
      //1.获取当前选中的值
      const {selValue} = this.state 
      const selVal = selValue * 1
      this.props.increment(selVal)
   }

   /* 
      减少
   */
   decrements = () => {
      const {selValue} = this.state
      const selVal = selValue * 1 
      this.props.decrement(selVal)
   }

   /* 
      如果是奇数就增加
   */
   incrementIfOdd = () => {
      const {selValue} = this.state
      const selVal = selValue * 1 
      if(this.props.count%2 === 1){
         this.props.increment(selVal)
      } 
   }

   /* 
      延迟加载
   */
   incrementAsync = () => {
      const {selValue} = this.state 
      const selVal = selValue * 1
      setTimeout(() => {
         this.props.increment(selVal)
      }, 1000); 
   }

   render(){
      const {count} = this.props
      const {selList,selValue} = this.state
      return(
         <div className="senior">
            <div className="num">
               <span>click me <em>{count}</em> times</span>
               <Select className="selList" defaultValue={selValue} onChange={this.getValue}>
                  {
                     selList.map((s,index) => <Option value={s} key={index}>{s}</Option>)
                  }
               </Select>
            </div>
            <div className="btn">
               <Button type="primary" onClick={this.increments}>增加</Button>
               <Button type="primary" onClick={this.decrements}>减少</Button>
               <Button type="primary" onClick={this.incrementIfOdd}>如果是奇数就增加</Button>
               <Button type="primary" onClick={this.incrementAsync}>延迟增加</Button>
            </div>
         </div>
      )
   }
}