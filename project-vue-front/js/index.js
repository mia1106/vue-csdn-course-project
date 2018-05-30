/**
 * Created by RanLI on 4/20/2018.
 */
//定义一些工具方法
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
/*定义过滤器*/
Vue.filter('price',function(num){
  return num +"元"
})

/*第二步定义元素组件类*/
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
var list=Vue.extend({
  template:'#tpl_list',
  //接受父组件传递的变量
  props:['query','search'],
  //定义数据
  data:function(){
    return{
      orders:[
        {id:'price',text:'价格排序'},
        {id:'sales',text:'销量排序'},
        {id:'evaluate',text:'好评排序'},
        {id:'discount',text:'优惠排序'}
      ],
      //绑定显示的数据
      list:[],
      //存储未显示的数据
      other:[]
    }
  },
  //定义动态绑定的数据
  computed:{
    //过滤出包含搜索字的条目
    listFilter:function(v){
      //对list数据进行过滤
      var result=[];
      /*为什么？v可以处理到数据啊*/
      v.list.forEach(function(item,index){
        if(item.title.indexOf(v.search)>=0){
          result.push(item)
        }
      })
      // 将结果返回
      return result;
    }
  },
  //定义方法
  methods:{
    //点击查看
    showOthers:function(){
      this.list=this.list.concat(this.other);
      this.other=[];
    },
    //点击排序
    itemOrder:function(id){
      //优惠排序
      if(id === 'discount'){
        //对list排序，比较原价-现价
        this.list.sort(function(a,b){
          return (a.originPrice-a.price)-(b.originPrice-b.price)
        })
      }else{
        //排列顺序
        this.list.sort(function(a,b){
          return a[id]-b[id]
        })
      }
    }
  },

  //获取数据
  created:function(){
    //创建query数据
    var str='';
    if(this.query[1]){
      str='?id='+this.query[1];
      console.log(str);
    }
    var that=this;
    Util.ajax('data/list.json'+str,function(res){
      //请求成功存储的数据
      if(res&&res.errno===0){
        //展示前三条数据
        that.list=res.data.slice(0,3);
        //存储未显示的数据
        that.other=res.data.slice(3)
      }
    })
  }
});
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

/*第三步注册组件*/

Vue.component('home',myHome);
Vue.component('list',list);
Vue.component('detail',detail);

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
//定义路由方法
function route(){
  var hash=location.hash;
  console.log(hash);
  //去除#或者#/
  hash=hash.replace(/^#\/?/,'');
  hash=hash.split('/');
  console.log(hash);
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
//监听hash的改变
window.addEventListener('hashchange',route);
//当页面加载完成的时候，也需要解析漏油
//为了解析路由提速
route();
