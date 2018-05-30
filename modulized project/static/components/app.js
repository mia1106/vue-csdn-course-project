/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,module){
  //引入其它所需文件
  require('./app.css')
  require('home/home');
  require('list/list');
  require('detail/detail');
  var vm=new Vue({
    el:'#app',
    data:{
      view:list,
      //存储路由数据
      query:[],
      //存储搜索内容
      search:'',
      //传递给子组建的
      searchValue:''
    },
    methods:{
      showSearchResult:function(){
        this.searchValue=this.search;
      },
      //返回按钮
      goBack:function(){
        history.go(-1);
      }
    }
  })

  //暴露接口
  module.exports=vm;

})