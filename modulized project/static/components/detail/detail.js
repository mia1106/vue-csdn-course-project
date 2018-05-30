/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,module){
  require('./detail.css');
  require('../../util/util.js');
  var detail=Vue.extend({
    template:'#tpl_detail',
    //绑定数据
    data:function(){
      return{
        data:{

        }
      }
    },
    //请求数据
    created:function(){
      var me=this;
      //请求数据
      Util.ajax('data/detail.json?id='+me.$parent.query[0],function(res){
        if(res&&res.error===0){
          me.data=res.data;
        }
      })
    }
  })

  Vue.component('detail',detail);
  module.exports=detail;

})