/* 
    自定义一个函数，用来设置样式(解决兼容性方法)

    obj 要获取样式的元素
    name 要获取的样式名
*/
function getStyle(obj,name){
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[name]
    }else{
        return obj.currentStyle[name]
    }
}
//调用
// result = getStyle(obj,'background')
// console.log(result)


/* 
    1.定义一个函数，用来向一个元素中添加指定的class属性值 
    
        参数：obj 要添加class属性的元素
              name 要添加的class值
*/
function addClass(obj,name){
    //判断元素是否含有指定的class名
    if(!hasClass(obj,name)){
        obj.className += name
    }
}



/* 
    2.判断元素中是否包含指定的class名 
      如果有name，则返回true，否则返回false
*/
function hasClass(obj,name){
    //判断obj中有没有name类名，这种方式不合适
    //return obj.className == name  

    //创建一个正则表达式 这种方式只能验证一个class名
    //var reg = /\bb2\b/
    //return reg.test(obj.className) 

    //创建一个构造函数
    var reg = new RegExp('\\b'+ name +'\\b')
    return  reg.test(obj.className)
}


/* 
    3.删除一个指定的class名
*/
function removeClass(obj,name){
    var reg = new RegExp('\\b'+ name +'\\b')
    
    //删除一个class
    obj.className = obj.className.replace(reg,'')
}

/* 
    4.切换class名
       如果元素中没有该类，则添加
       如果元素中具有该类，则删除
*/
function toggleClass(obj,name){
    if(hasClass(obj,name)){
        //有则删除
        removeClass(obj,name)
    }else{
        //没有则添加
        addClass(obj,name)
    }  
}



/* 
   自定义一个函数，用来为指定元素绑定响应函数(解决兼容性方法)

   参数：
   obj 绑定事件的对象
   eventStr 事件字符串(不要on)
   callback 回调函数
*/
//1.自定义方法
function bind(obj,eventStr,callback){
   //判断如果绑定事件的对象有addEventListener事件方法
   //则执行兼容其他浏览器代码，否则执行兼容IE8及以下代码
   if(obj.addEventListener){
       //兼容其他浏览器
       obj.addEventListener(eventStr,callback,false)
   }else{
       //兼容IE8及以下
       /* 
           改变this指向使用call或apply方法
           call是把参数按顺序传入
           apply是把实参打包成数组传递
           callback.call(obj)
       */
       obj.attachEvent('on'+eventStr,function(){
           //浏览器调用匿名函数，匿名函数中调用回调函数
           //callback()  //此时this在IE8及以下浏览器中还是指向window对象
           callback.call(obj) //此时this在IE8及以下浏览器中就指向绑定事件的button这个对象
       })
   } 
}
//2.调用方法
// bind(btn3, 'click', function(){
//     /* 
//         此时this在IE8及以下浏览器中还是指向window对象
//                 在其他浏览器中指向的是绑定事件的button这个对象
//     */
//     alert(this)      
// })



/* 
    定义一个函数，用来左右滑动一个或多个div

    obj 被移动的元素对象
    attr 修改元素的样式属性(是一个变量如，left,right,width,height)
    target 执行动画的目标位置
            0  移动到指定位置最左侧
            500 移动到指定位置最右侧 
    speed 移动的速度(向右(上)移动正值，向左(下)移动负值)
    callback 回调函数
*/
//1.自定义方法
function move(obj,attr,target,speed,callback){
    //关闭上一个定时器
    clearInterval(obj.timer)

    //获取元素目前的位置
    var current = parseInt(getStyle(obj,attr))  //0px 是一个字符串，需要转换成整型

    //判断speed是正值还是负值
    /* 
        //如果从0向500移动，则speed为正
        //如果从500向0移动，则speed为负

        //如果当前元素的位置(0)增大大于指定的位置(800)后，
    */
    if(current > target){
        //此时速度应为负值
        speed = -speed
    }

    //开启一个定时器，让div持续移动
    //向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
    obj.timer = setInterval(function(){
        //旧值 获取div样式表中的样式值
        var oldValue = parseInt(getStyle(obj,attr))  //0px 是一个字符串，需要转换成整型

        //console.log(oldValue)

        //设置新的值，向右移动(left值增大)
        var newValue = oldValue + speed

        //判断newValue是否大于500
        //从800向0移动
        //向左移动时，需要判断newValue是否小于target
        //            speed为负数时
        //newValue < target

        //向右移动时，需要判断newValue是否大于target
        //            speed为正数时
        //newValue > target

        if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
            newValue = target
        }

        //div离左侧距离值慢慢变大
        obj.style[attr] = newValue + 'px'

        //如果div移动到500这个位置就停止移动
        if(newValue == target){
            //达到目的，关闭定时器
            clearInterval(obj.timer)

            //动画执行完毕后,调用回调函数
            //这个函数只执行一次
            //如果不需要就不传递回调函数，需要就传回调函数
            callback && callback();
        }

    },80)
}
//2.调用
// btn04.onclick = function(){
//     move(moveBox2, 'width', 500, 10, function(){
//         alert('动画1执行完毕了')
//     })  
// }