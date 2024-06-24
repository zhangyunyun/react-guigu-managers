import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {reqPictureDelete} from '../../api'

//import {BASE_URL_IMG} from '../../utils/constants.js'

import PropTypes from 'prop-types' //接收数据

//import PubSub from 'pubsub-js'  //组件间传值

/* 
   管理商品图片的组件(上传/删除图片)
*/
export default class PicturesWall extends Component {

   static propTypes = {
      imgs:PropTypes.array
   }

   /* state = {
      previewVisible: false, //标识是否显示大图预览Model
      previewImage: '', //大图的url
      fileList: [
         {
            uid: '-1', //每个file都有自己唯一的id
            name: 'image.png', //图片文件名
            status: 'done',  //图片上传状态 uploading:正在上传  done:已经上传
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' //当前上传图片的路径
         }
      ]  //所有需要显示的图片信息对象的数组
   }; */

   //使用constructor可以自定义初始值
   constructor(props){
      super(props)

      /* 
         图片上传默认显示图片
      */
      let fileList = []

      const {imgs} = this.props
      console.log(imgs)  
      if(imgs && imgs.length > 0){
         fileList = imgs.map((img,index) => (
            {
               uid: -index, //每个file都有自己唯一的id
               name: img.name, //图片文件名
               status: 'done',  //图片上传状态 uploading:正在上传  done:已经上传
               url: img.url //当前上传图片的路径
            }
         ))
      }
     
      //初始化状态
      this.state = {
         previewVisible: false, //标识是否显示大图预览Model
         previewImage: '', //大图的url
         fileList
      }
   }

   //隐藏Model大图预览
   handleCancel = () => {
      this.setState({ 
         previewVisible: false 
      })
   };

   //显示大图预览
   handlePreview = async file => {
      //显示指定图片的大图预览
      /* 
         file.thumbUrl为大图对应的base64格式编码的串
      */
      this.setState({
         previewImage: file.url || file.thumbUrl, // 需要显示的大图的 url
         previewVisible: true,
      })
   };

   handleChange = async ({file, fileList }) => {
      /* 
         file:当前操作的图片文件(上传/删除)
         fileList:所有已上传图片文件对象的数组

         console.log(file, fileList.length, fileList===fileList[fileList-1])会打印3次是因为有上传的过程
         uploading 1 true正在上传 
         uploading 1 false正在上传 
         done 1 false上传完毕
      */
      console.log(file.status,fileList) 
      
      //图片已上传成功了
      if(file.status === "done"){
         const result = file.response
         if(result.status === 0){
            //上传成功了
            message.success('上传成功了')
            //获取上传成功图片的name和url,将上传成功的图片赋值给fileList
            const {name,url} = result.data
            file = fileList[fileList.length - 1]
            file.name = name
            file.url = url
         }else{
            //上传失败了
            message.error('上传失败了！')
         }
      }else if(file.status === "removed"){//removed只删除了界面上的图片并没有删除后台图片
         //删除后台图片，需要发送请求
         const result = await reqPictureDelete(file.name)
         console.log(result)
         if(result.status === 0){
            message.success('删除成功了！')
         }else{
            message.error('删除失败了！')
         }
      }
      
      //更新状态
      this.setState({
         fileList
      })

      console.log(fileList)
   }
   
   //传递给父组件的数据
   getImgs = () => {
      const {fileList} = this.state
      return fileList.map(file => file.response.data)
   }

   render() {
      const { previewVisible, previewImage, fileList} = this.state;
      const uploadButton = (
         <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
         </div>
      );
      return (
         <div>
            <Upload
                  action="/manage/img/upload" //上传图片的接口地址
                  accept="image/*" //只接受图片格式
                  name="image" //发到后台的文件参数名
                  listType="picture-card" //展示样式类型text 
                  fileList={fileList}  //已经上传的文件列表数组
                  onPreview={this.handlePreview} //点击文件链接或预览图标时的回调
                  onChange={this.handleChange} //上传文件改变时的状态
                  //beforeUpload={this.beforeUpload} //判断图片格式
               >
               {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
               >
               <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
         </div>
      )
   }
}