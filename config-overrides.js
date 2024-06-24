/* 
   用于修改默认配置
*/
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
   fixBabelImports(
      'import',
      {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: true,
      },
      'ant-design-icons'
   ),   
   addLessLoader({
      javascriptEnabled: true,
      modifyVars: {'@primary-color': '#1DA57A'},  //切换主题
   }),         
);