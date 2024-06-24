/* 
  包含n个接口请求函数的模块

  要求：根据接口文档定义接口请求函数 
  每个函数返回promise对象
 */
import ajax from './ajax'

import jsonp from 'jsonp'

import { message } from 'antd'

//这里的基础路径后台时多少这里就配置成多少
// const BASE_URL = 'http://localhost:5000'
//const BASE_URL = ''

const BASE_URL = '/api'

//登录请求接口函数
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', { username, password }, 'POST')


//获取一级/某个二级分类列表请求接口函数
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list', { parentId })
//添加分类请求接口函数
export const reqAddCategory = (parentId,categoryName) => ajax(BASE_URL + '/manage/category/add', { parentId, categoryName }, 'POST')
//更新分类请求接口函数
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE_URL + '/manage/category/update', { categoryId, categoryName }, 'POST')

//获取产品分页列表请求接口函数
export const reqProductsPage = (pageNum,pageSize) => ajax(BASE_URL + '/manage/product/list',{pageNum,pageSize})
//搜索商品分页列表(根据商品名称)
// export const reqSearchProductsPageName = (pageNum,pageSize,searchName) => ajax(BASE_URL + '/manage/product/search',{
//   pageNum,
//   pageSize,
//   productName:searchName
// })
//搜索商品分页列表(根据商品描述)
// export const reqSearchProductsPageDesc = (pageNum,pageSize,searchName) => ajax(BASE_URL + '/manage/product/search',{
//   pageNum,
//   pageSize,
//   productDesc:searchName
// })

//搜索商品分页列表(根据商品名称/商品描述)
/* 
  serachType:搜索的类型，变量的值作为属性名，属性名不确定需用方括号
  serachType的值为商品名称productName或者为商品productDesc 
                         [productName]:searchName
                         [productDesc]:searchName
  [serachType]:searchName               
*/
//根据id/name搜索产品分页列表请求接口函数
export const reqSearchProductsPage = (pageNum,pageSize,searchName,serachType) => ajax(BASE_URL + '/manage/product/search',{
  pageNum,pageSize,[serachType]:searchName
})

//添加\修改商品请求接口函数
export const reqAddOrUpdateProduct = (product) => ajax(BASE_URL + '/manage/product/' + ( product._id ? 'update' : 'add' ), product ,'POST')
//删除图片
export const reqPictureDelete = (name) => ajax(BASE_URL + '/manage/img/delete',{name},'POST')


//获取角色列表接口函数
export const reqRoles = () => ajax(BASE_URL + '/manage/role/list')
//添加角色接口函数
export const reqAddRole = (roleName) => ajax(BASE_URL + '/manage/role/add',{roleName},'POST')
//更新角色权限列表接口函数，(注意：这里role是一个对象不用花括号{})
export const reqUpdateRole = (role) => ajax(BASE_URL + '/manage/role/update',role,'POST')


//获取用户列表接口函数
export const reqUsers = () => ajax(BASE_URL + '/manage/user/list')
// //添加用户接口函数
// export const reqAddUsers = (user) => ajax(BASE_URL + '/manage/user/add',user,'POST')
// //更新用户列表接口函数
// export const reqUpdateUser = (user) => ajax(BASE_URL + '/manage/user/update',user,'POST')
//添加\更新用户请求接口函数，(注意：这里user是一个对象不用花括号{})
export const reqAddOrUpdateUser = (user) => ajax(BASE_URL + '/manage/user/' + (user._id ? 'update' : 'add'),user,'POST')
//删除用户接口函数
export const reqDeleteUser = (userId) => ajax(BASE_URL + '/manage/user/delete',{userId},'POST')



//天气请求接口函数
/* 
   jsop请求的接口请求函数 
   接口请求函数返回的是一个promise对象
*/
export const reqWeather = (city) => {
  //返回结果
  return new Promise((resolve,reject) => {
    //const url = `http://api.map.baidu.com/telematics/v3/weather?location=116.305145,39.982368&output=json&ak=WnA0oUHqw00TzR9THwddVYI4AukheeH5`
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    //发送jsonp请求
    jsonp(url,{}, (err,data) => {
      //如果成功了
      if(!err && data.status === 1000){
        console.log(data)
        //取出需要的数据
        // const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        // resolve(dayPictureUrl, weather)
        const {date, type} = data.data.forecast[0]
        resolve({date, type})
      }else{
        //如果失败了
        message.error('获取天气信息失败！')
      }
    })
  })
}