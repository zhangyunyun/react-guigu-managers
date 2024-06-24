import React, { Component } from 'react'

import PropsTypes from 'prop-types'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

/* 
   富文本编辑器组件
*/
export default class RichTextEditor extends Component {

   //4.接收父组件传递过来的标签格式的文本
   static propTypes = {
      detail:PropsTypes.string  
   }


   /* 
      1.创建初始状态是空的编辑对象
   */
   // state = {
   //    editorState: EditorState.createEmpty(),  
   // }


   /*
      5.创建一个带文本数据的编辑对象，方法如下构造器
         1)先接受到父组件传递过来的detail数据(第4条)
         2)使用draftjs-to-html
   */
   //构造器里可以自定义初始值
   constructor(props){
      super(props)

      /* 
         将标签形式的字符串默认写入到富文本编辑器中
         标签形式的字符串：'<p>测试测试测试</p>'
      */
      const { detail } = this.props //取出传递过来的数据，是标签格式的文本(html格式的文本 如：detail: "<p>eeeee</p>\n")
      const detailHtml = detail 
      if (detailHtml) {
         const contentBlock = htmlToDraft(detailHtml) //生成的是内部的一个模块，如果格式正确就创建成功
         if(contentBlock){ //固定写法
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
               editorState  //默认显示数据的编辑对象
            };
         }
      }else{
         this.state = {
            editorState: EditorState.createEmpty()  //默认为一个空的编辑对象
         }
      }
   }

   //2.实时获取编辑器输入的内容
   onEditorStateChange = (editorState) => {
      this.setState({
         editorState,
      });
   };

   //3.先将标签格式的文本数据传递给父组件，父组件接收数据并展示
   getDetail = () => {
      const {editorState} = this.state
      /*
         这个值为标签格式的字符串，需要将这个值传递给父组件
         返回输入的数据对应的标签格式的文本(html格式的文本)
      */
      return draftToHtml(convertToRaw(editorState.getCurrentContent())) //将原始js格式转换成html字符串
   }

   //富文本编辑器中的上传图-->本地上传图片
   uploadImageCallBack = (file) => {
      return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/manage/img/upload');
          const data = new FormData();
          data.append('image', file);
          xhr.send(data);  //发送请求
          xhr.addEventListener('load', () => {
            //发送成功，返回响应数据 
            const response = JSON.parse(xhr.responseText);
            const url = response.data.url //得到图片的url
            //resolve(url);
            resolve({data: {link: url}})
          });
          xhr.addEventListener('error', () => {
            //发送失败的提示
            const error = JSON.parse(xhr.responseText);
            reject(error);
          });
        }
      );
   }
       
   render() {
      const { editorState } = this.state;
      return (
         <div>
            <Editor
               editorState={editorState}
               editorStyle={{minHeight: 200, border: '1px solid #f1f1f1', padding: '0 30px'}}
               onEditorStateChange={this.onEditorStateChange}
               toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {uploadCallback:this.uploadImageCallBack, alt:{present:true, mandatory:true}},
                }}
            />
            {/* <textarea
               disabled
               value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
         </div>
      )
   }
}