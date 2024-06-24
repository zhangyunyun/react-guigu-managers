import React,{Component} from 'react'
import {Card,List,Icon} from 'antd'

import memoryUtils from '../../../utils/memoryUtils'

import LinkButton from '../../../components/link-button/link-button'

import "../product.less"

const Item = List.Item

export default class ProductDetail extends Component{

   /* 
      卸载之前清楚之前保存的数据
   */
   componentWillUnmount(){
      memoryUtils.product = {}
   }

   render(){
      console.log(memoryUtils.product)
      const {name,desc,price,imgs,detail} = memoryUtils.product
      const title = (
         <span>
            <LinkButton onClick={() => this.props.history.goBack()}>
               <Icon type='arrow-left' style={{fontSize:20}}/>
            </LinkButton>
            <span>商品详情</span>
         </span>
      )
      return (
         <Card title={title} className='productDetail'>
            <List>
               <Item>
                  <span className="labelText">商品名称:</span>
                  <span>{name}</span>
               </Item>
               <Item>
                  <span className="labelText">商品描述:</span>
                  <span>{desc}</span>
               </Item>
               <Item>
                  <span className="labelText">商品价格:</span>
                  <span>{price}</span>
               </Item>
               <Item>
                  <span className="labelText">所属分类:</span>
                  <span>xxx</span>
               </Item>
               <Item>
                  <span className="labelText">商品图片:</span>
                  <span>
                     <img src={imgs.url} alt="" key={imgs.name}  className="productImg" />
                     {/* {
                        imgs.map(img => {
                           return (
                              <img src={img.url} alt="" key={img.name}  className="productImg" />
                           )
                        })
                     } */}
                  </span>
               </Item>
               <Item>
                  <span className="labelText">商品详情:</span>
                  <span className="detailText" dangerouslySetInnerHTML={{__html:detail}}></span>
               </Item>
            </List>
         </Card>
      )      
   }

}