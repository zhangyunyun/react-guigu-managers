/* 
   包含n个日期时间处理的工具函数模块

   日期格式化
*/
function setTime(obj){
   if(obj < 10){
      return obj = '0' + obj
   }
   return obj
}

export function formateDate(time){
   if(!time){
      return ''
   }
   let date = new Date(time)
   return date.getFullYear() +'-'+ setTime((date.getMonth() + 1)) +'-'+ setTime(date.getDate()) +' '+ setTime(date.getHours()) +':'+ setTime(date.getMinutes()) +':'+ setTime(date.getSeconds())
}