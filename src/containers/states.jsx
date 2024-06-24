/* 
   容器组件
*/
import {connect} from 'react-redux'

import {increment,decrement} from '../redux/actions.js'

import State from '../pages/state/state'

function mapStateToProps(state){
   return{
      count:state
   }
}

function mapDispatchToProps(dispatch){
   return{
      increment:(number) => dispatch(increment(number)), 
      decrement:(number) => dispatch(decrement(number)) 
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(State)