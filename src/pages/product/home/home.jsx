import React,{Component} from 'react'
import {Card,Table,Select,Input,Button,Icon,Modal} from 'antd'

import {reqProductsPage, reqSearchProductsPage} from '../../../api'

// import memoryUtils from '../../../utils/memoryUtils'

import {PAGE_SIZE} from '../../../utils/constants'

//import PubSub from 'pubsub-js'

import LinkButton from '../../../components/link-button/link-button'

import '../product.less'

const Option = Select.Option

export default class ProductHome extends Component{

   state = {
      loading:false,
      total:'',
      products:[],  //商品列表
      searchName:'', //搜索商品关键字
      searchType: 'productName',  //搜索类型 根据商品名称productName/商品描述productDesc搜索
      showStatus:0, //是否显示对话框  0不显示，1显示
   }

   /* 
      初始化table所有列的数组
   */
   initColumns = () => {
      this.columns = [
         {
           title: '商品名称',
           dataIndex: 'name',
           width:120
         },
         {
            title: '商品图片',
            width:120,
            dataIndex: 'imgs',
            render:(imgs) => {
               // console.log(imgs)
               // if(imgs && imgs.length>0){
               //    return <div className="imgBox"><img src={imgs[0].url} alt="" key={imgs[0].name} /></div>
               // }
            }
         },
         {
           title: '商品描述',
           dataIndex: 'desc'
         },
         {
           title: '价格',
           dataIndex:'price',
           width:120,
           render:(price) => ( //当前指定了对应的属性，传入的是对应的属性值
              <div className="pricesBox">
                 <p>￥{price}</p>
              </div>
           )
         },
         {
           title: '状态',
           dataIndex:'status',
           width:120,
           render:(status) => (
            <div className="stateBox">
               <p><Button type="primary">下架</Button></p>
               <p><span>在售</span></p>
            </div>
           )
         },
         {
           title: '操作',
           width:120,
           render:(product) => {
               return (
                  <div className="operateBox">
                     {/* <p><LinkButton onClick={() => this.props.history.push('/product/detail',product)}>详情</LinkButton></p> */}
                     <p><LinkButton onClick={() => this.props.history.push('/product/detail',{product})}>详情</LinkButton></p>
                     <p><LinkButton onClick={() => this.props.history.push('/product/addUpdate',product)}>修改</LinkButton></p>
                     {/* <p><LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton></p> */}
                     <p><LinkButton onClick={this.handelDelProduct}>删除</LinkButton></p>
                  </div>
               )
           }
         },
       ]
   }

   /* 
      使用HashRouter之后跳转详情携带参数跳转不过去
      HashRouter不支持携带对象格式的参数
      跳转到产品对应的详情
   */
   /* 跳转到产品详情界面 */
   // showDetail = (procut) => {
   //    //缓存product对象，给detail组件使用
   //    memoryUtils.product = procut
   //    this.props.history.push('/product/detail')
   // }

   /* 跳转到修改商品界面 */
   // showUpdate = (procut) => {
   //    //缓存product对象，给detail组件使用
   //    memoryUtils.product = procut
   //    this.props.history.push('/product/addupdate')
   // }

   /* 
      异步获取指定页的数据
   */
   getProductsPage = async (pageNum) => {

      /* 
         pageNum:当前第几页
         pageSize:每一页显示的条数
      */
      this.pageNum = pageNum

      this.setState({
         loading:true
      })

      const {searchName,searchType} = this.state

      let result
      //如果有搜索内容，发送搜索商品请求
      if(searchName){
         result = await reqSearchProductsPage(pageNum,PAGE_SIZE,searchName,searchType)

         console.log("搜索数据：", result)
      }else{
         //否则发送一般的数据请求
         result = await reqProductsPage(pageNum,PAGE_SIZE)

         console.log("一般数据：", result)
      }

      this.setState({
         loading:false
      })

      if(result.status === 0){
         //得到响应的数据，取出(总条数，当前页的条数)的数据(页数=总条数/当前页的条数)
         const {total, list} = result.data
         console.log(list)
         
         this.setState({
            total,
            products:list
         })
      }
   }

   /* 
      点击删除按钮，显示弹框
   */
   handelDelProduct = () => {
      this.setState({
         showStatus:1
      })
   }


   /* 
      点击删除产品弹框取消按钮，隐藏弹框
   */
   handleCancelDel = () =>{
      this.setState({
         showStatus:0
      })
   }

   
   /* 
      点击删除产品弹框确定按钮，隐藏弹框,删除产品
   */
   delProduct = () => {

   }


   /* 
      收集数据select input数据
   */
   selectValue = (value) => {
      this.value = value
      this.setState({
         searchType:this.value
      })
   }

   inputValue = (e) => {
      const value = e.target.value
      this.setState({
         searchName:value
      })
   }   

   /* 
      在render()之前，只执行一次
   */
   componentWillMount(){
      //初始化Table所有列的数组
      this.initColumns() 
   }

   /* 
      在render()之后，只执行一次
   */
   componentDidMount(){
      //异步获取指定页的数据，默认显示第1页的数据
      this.getProductsPage(1)
   }

   render(){
      console.log(this)
      //取出状态值
      const {loading,products,total,searchName,searchType,showStatus} = this.state
      const title = (
         <div className="searchBox">
            <Select className="search-select" value={searchType} onChange={value => this.selectValue(value)}>
               <Option value="productName">商品名称</Option>
               <Option value="productDesc">商品描述</Option>
            </Select>
            <Input className="search-input" placeholder="请输入搜索内容" value={searchName} onChange={this.inputValue}></Input>
            <Button className="search-button" type="primary" onClick={() => this.getProductsPage(1)}>搜索</Button>
         </div>
      )

      const extra = (
         <div className="addBox">
            <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
               <Icon type="plus" />添加商品
            </Button>
         </div>
      )

      return(
         <div className="product">
            <Card className="searchTitle" title={title} extra={extra}>
               <Table 
                  loading={loading}
                  className="searchTable"
                  bordered
                  rowKey='_id'
                  columns={this.columns} 
                  dataSource={products} 
                  pagination={{
                     current:this.pageNum,
                     total,   
                     defaultPageSize:PAGE_SIZE,
                     showQuickJumper:true,
                     // onChange:(pageNum) => {this.getProductsPage(pageNum)}
                     onChange:this.getProductsPage
                  }}
               />
            </Card>

            <Modal title="删除产品" visible={showStatus===1} onOk={this.delProduct} onCancel={this.handleCancelDel}>
               
            </Modal>
         </div>
     )
   }
}