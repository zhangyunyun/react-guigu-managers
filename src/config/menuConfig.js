const menuList = [
   {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的 path(路由路径)
      icon: 'home', // 图标名称
      isPublic:true //每个用户进来都能看到的菜单状态 
   },
   {
      title: '商品',
      key: '/products', 
      icon: 'appstore',
      children:[
         {
            title: '分类管理',
            key: '/category', 
            icon: 'bars', 
         },
         {
            title: '商品管理',
            key: '/product', 
            icon: 'tool', 
         },
      ]
   },
   {
      title: '权限管理',
      key: '/role', 
      icon: 'safety', 
   },
   {
      title: '用户管理',
      key: '/user', 
      icon: 'user', 
   },
   {
      title: '状态管理',
      key: '/state', 
      icon: 'star',
   },
   {
      title: '图形图表',
      key: '/charts', 
      icon: 'area-chart', 
      children:[
         {
            title: '柱形图',
            key: '/charts/bar',
            icon: 'bar-chart'
         },
         {
            title: '折线图',
            key: '/charts/line',
            icon: 'line-chart'
         },
         {
            title: '饼图',
            key: '/charts/pie',
            icon: 'pie-chart'
         }
      ]
   }
]

export default menuList