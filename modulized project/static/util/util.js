/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,module){
  var Util={
    /**
     *  封装异步请求方法
     *  @url    请求地址
     *  @fn     回调函数
     *
     * ***/
    ajax:function(url,fn){
      // 创建xhr
      var xhr=new XMLHttpRequest();
      //监听状态变化
      xhr.onreadystatechange=function(){
        //监听状态是4时，
        if(xhr.readyState===4){
          //判断状态码
          if(xhr.status===200){
            //执行回调函数
            fn(JSON.parse(xhr.responseText));
          }

        }
      }
      //打开请求
      xhr.open('GET',url,true)
      //发送数据
      xhr.send(null);
    }
  }
  /*暴露接口*/
  module.exports=Util;
})