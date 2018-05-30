/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,module){
  var app=require('../components/app.js')
  //定义路由方法
  function route(){
    var hash=location.hash;
    //去除#或者#/
    hash=hash.replace(/^#\/?/,'');
    hash=hash.split('/');
//根据第一个成员决定渲染哪个页面，就是决定使用哪个组件，就是决定vm.view的参数值
    vm.view=hash[0];
    //定义可以改变的关系表
    var map={
      home:true,
      list:true,
      detail:true
    }

    //如果hash[0]可以正确切换，就切换组件
    if(map[hash[0]]){
      vm.view=hash[0]
    }else{
      //进入默认路由
      vm.view='home'
    }
    //
    vm.query=hash.slice(1);
  }
  //module.exports=router;
})