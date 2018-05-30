/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,modules){
  require('./home.css');
  require('../item.css');
  require('../../util/util.js');
  var myHome=Vue.extend({
    template:'#tpl_home',
    //定义数据
    data:function(){
      return{
        types:[
          {id:1,url:'img/icon/0.png',text:'美食'},
          {id:2,url:'img/icon/1.png',text:'猫眼电影'},
          {id:3,url:'img/icon/2.png',text:'酒店'},
          {id:4,url:'img/icon/3.png',text:'休闲娱乐'},
          {id:5,url:'img/icon/4.png',text:'外卖'},
          {id:6,url:'img/icon/5.png',text:'火锅'},
          {id:7,url:'img/icon/6.png',text:'丽人'},
          {id:8,url:'img/icon/7.png',text:'购物'},
          {id:9,url:'img/icon/8.png',text:'周边游'},
          {id:10,url:'img/icon/9.png',text:'KTV'}
        ],
        ad:[],
        list:[]
      }
    },
    //数据绑定之后
    created:function(){
      //由于Util.ajax中的this是window,因此这里要绑定this
      var that=this;
      //请求成功，存储数据
      Util.ajax('data/home.json',function(res){
        if(res&&res.errno===0){
          that.ad=res.data.ad;
          that.list=res.data.list;
        }
      })
    },



  });
  /*注册组件*/
  Vue.component('home',myHome);
  /*暴露接口*/
  module.exports=myHome;

})