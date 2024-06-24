import React,{PureComponent} from 'react'
import {Card, Form, Input, Cascader, Icon, Button, message} from 'antd'
//import ImgCrop from 'antd-img-crop'

import {reqCategorys,reqAddOrUpdateProduct} from '../../../api'

import memoryUtils from '../../../utils/memoryUtils'

import LinkButton from '../../../components/link-button/link-button'
import PictureWall from '../../../components/pictures-wall/pictures-wall'
import RichTextEditor from '../../../components/rich-text-editor/rich-text-editor'

/* 
   添加、更新商品组件
   Product的添加和更新的子路由组件
*/
const Item = Form.Item
const TextArea = Input.TextArea

class ProductAddUpdate extends PureComponent{

   state = {
      options:[],  //根据categorys数组生成options数组
   }

   constructor(props){
      super(props)

      //用来保存ref标识的标签对象(组件对象)的容器，它将子组件包裹到这个容器里
      this.imgRef = React.createRef()
      this.detailRef = React.createRef()
   }

   /* 
      默认显示一级分类列表,根据一级分类id,默认显示二级分类列表
   */
   initOptions = async (categorys) => {
      //根据categorys数组生成options数组
      const options = categorys.map(c => ({
         value:c._id,
         label:c.name,
         isLeaf:false  //不是叶子
      }))

      
      /* 
         如果当前是更新, 且商品是一个二级分类的商品
         parentId == '0'是一级分类
      */
      const {isUpdate,product} = this
      const {parentId,pCategoryId} = product
      
      if(isUpdate && parentId !== '0'){
         //异步获取 product.pCategoryId 的二级分类列表
         const subCategorys = await this.getCategory(pCategoryId)
         if(subCategorys && subCategorys.length>0){
            // 生成二级的 option 数组
            const subOptions = subCategorys.map(c => ({
               value:c._id,
               label:c.name,
               isLeaf:true  //不是叶子
            }))

            //找到对应的option
            const targetOption = options.find(option => option.value === pCategoryId)
   
            // 将 cOptions 添加为对应的一级 option 的 children
            targetOption.children = subOptions
         }

      }

      //更新options状态
      this.setState({
         options
      })
   }


   /* 
      异步获取一级/二级分类列表数据
   */
   getCategory = async (parentId) => {
      const result = await reqCategorys(parentId)  //{status:0,data:[]}
      if(result.status === 0){
         const categorys = result.data
         if(parentId === '0'){
            //获取一级分类列表
            this.initOptions(categorys)
         }else{
            //返回二级分类,当前async函数返回的promise就会成功，并且value为categorys
            return categorys    
         }
      }
   }


   /* 
      根据指定分类id,显示下一级分类列表
   */
   loadData = async selectedOptions => {
      const targetOption = selectedOptions[0];  //数组里面只有一条数据
      targetOption.loading = true;

      //选择一级分类，根据一级分类id,异步请求二级分类并显示
      const subCategorys = await this.getCategory(targetOption.value)

      targetOption.loading = false;

      if(subCategorys && subCategorys.length>0){
         //如果有二级分类，根据childCategorys生成二级分类options
         const childOptions = subCategorys.map(c => ({
            value:c._id,
            label:c.name,
            isLeaf:true  //不是叶子
         }))
         //关联到当前options上
         targetOption.children = childOptions
      }else{
         //当前选中的分类没有二级分类
         targetOption.isLeaf = false
      }

      //更新options状态
      this.setState({
         //options:this.state.options //不建议这样写
         options:[...this.state.options] //使用PureComponent用此写法 
      })
  
      //模拟请求获取二级列表数据
      // setTimeout(() => {
      //   targetOption.loading = false;
      //   targetOption.children = options;
      //   //setOptions([...options]);
      // //   this.setState({
      // //    options:[...this.state.options]  //不建议这样写
      // //   })
      // }, 1000);
   };


   /* 
      自定义校验价格
   */
   validatePrice = (rule, value, callback) => {
      value = value * 1
      if(value > 0){
         callback()
      }else{
         callback('价格必须是大于0的数值')  
      }
   }

   /* 
      添加/修改商品，提交
   */
   handleSubmit = () => {
      // 对所有表单字段进行校验,校验成功，就发送ajax请求
      const form = this.props.form
      //收集数据
      form.validateFields( async (err,values) => {
         if(!err){
            //收集产品相关信息
            const {name,desc,price,categoryIds} = values
            
            //父组件得到子组件中的对象, 调用子组件对象的getImgs()方法, 获取到子组件里的数据
            const imgs = this.imgRef.current.getImgs() //需要发送到后台的imgs数据
            
            //父组件得到子组件中的对象，调用子组件对象的getDetail()方法,获取到子组件里的数据
            const detail = this.detailRef.current.getDetail() //需要发送到后台的详情数据

            //console.log(imgs,detail)

            //收集一级分类id 二级分类id数据
            let pCategoryId = ''
            let categoryId = ''

            if(categoryIds.length === 1){//只有一个值表示选择的是一级分类
               pCategoryId = '0'
               categoryId = categoryIds[0]
            }else{
               //如果是两个值表示选择了一级分类和二级分类
               pCategoryId = categoryIds[0]
               categoryId = categoryIds[1]
            }

            //分装成对象
            const product = {name,desc,price,pCategoryId,categoryId,imgs,detail}

            // 如果是更新, 指定 product 的_id 属性值
            if(this.isUpdate) {
               product._id = this.product._id
            }
            
            //保存数据,发送ajax请求
            const result = await reqAddOrUpdateProduct(product)  

            if(result.status === 0){
               message.success(`${this.isUpdate?'更新':'添加'}商品成功!`)
            }else{
               message.error(`${this.isUpdate?'更新':'添加'}商品失败!`)
            }               
         }
      })
   }

   /* 
      render()之前，只执行1次
   */
   componentWillMount(){
      //取出跳转携带的state数据
      const product = memoryUtils.product
      //标识是添加商品还是修改商品  !!xxx 将一个数据强制转换成布尔类型
      this.isUpdate = !!product._id //true
      //如果没有值就赋值为空对象
      this.product = product || {}
   }

   /* 
      render()之后，只执行1次，这里发送ajax请求
   */
   componentDidMount(){
      //页面刚进来就显示一级列表
      this.getCategory('0')
   }

   /* 
      卸载之前清楚之前保存的数据
   */
   componentWillUnmount(){
      memoryUtils.product = {}
   }

   render(){
      const {product,isUpdate} = this
      const {pCategoryId,categoryId,detail,imgs} = product
      const {options} = this.state
      const {getFieldDecorator} = this.props.form

      //页面跳转修改跳转标题
      const title = (
         <span>
            <LinkButton onClick={() => this.props.history.goBack()}>
               <Icon type='arrow-left' style={{fontSize:20}}/>
            </LinkButton>
            <span>{!isUpdate?'添加商品':'修改商品'}</span>
         </span>
      )
      //指定Item布局的配置对象
      const formItemLayout = {
         labelCol: { span: 2 },  // 左侧label的宽度
         wrapperCol: { span: 8 }, // 右侧包裹的宽度
      }

      const categoryIds = []  //显示级联分类列表(可能只有1级，可能有2、3级)数组
      if(isUpdate){ 
         /* 
            isUpdate为true 说明是有修改商品，有修改传入过来的产品数据了
            isUpdate为false说明是添加商品，没有产品数据
         */
         if(pCategoryId === '0'){
            //pCategoryId为0，说明是一个一级分类产品
            categoryIds.push(categoryId)
         }else{
            //说明是一个二级分类产品
            categoryIds.push(pCategoryId)
            categoryIds.push(categoryId)
         }
      }
      

      return(
        <Card title={title}>
           <Form {...formItemLayout}>
            <Item label="商品名称">
               {
                  getFieldDecorator('name',{
                     initialValue:product.name,
                     rules:[
                        {required: true, message: '必须输入商品名称'}
                     ]
                  })(
                     <Input placeholder='请输入商品名称'></Input>
                  )
               }
            </Item>
            <Item label="商品描述">
               {
                  getFieldDecorator('desc',{
                     initialValue:product.desc,
                     rules:[
                        {required: true, message: '必须输入商品描述'}
                     ]
                  })(
                     <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
                  )
               }
            </Item>
            <Item label="商品价格">
               {
                  getFieldDecorator('price',{
                     initialValue:product.price,
                     rules:[
                        {required: true, message: '商品价格必须输入'},
                        {validator: this.validatePrice}
                     ]
                  })(
                     <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                  )
               }
            </Item>
            <Item label="商品分类">
               {
                  getFieldDecorator('categoryIds',{
                     initialValue:categoryIds,
                     rules:[
                        {required: true, message: '请指定商品分类'},
                     ]
                  })(
                     <Cascader 
                        placeholder='请指定商品分类'
                        options={options}  /*需要显示的分类列表数据数组*/
                        loadData={this.loadData} /*当选择某个分类列表项, 加载下一级分类列表的监听回调*/
                     />
                  )
               }
               
            </Item>
            <Item label="商品图片">
               {/* 上传图片 */}
               {<PictureWall ref={this.imgRef} imgs={imgs}></PictureWall>} 
            </Item>
            <Item label="商品详情"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 20 }}>
               {/* 副文本编辑器 */}
               <RichTextEditor ref={this.detailRef} detail={detail}></RichTextEditor>
            </Item>
            <Item>
               <Button type="primary" onClick={this.handleSubmit}>提交</Button>
            </Item>
         </Form>
        </Card>
     )
  }
}

const ProductAddUpdateWrap = Form.create()(ProductAddUpdate)
export default ProductAddUpdateWrap