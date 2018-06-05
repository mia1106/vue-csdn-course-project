/**
 * Created by RanLI on 4/20/2018.
 */

/*定义过滤器*/
Vue.filter('price',function(num){
  return num +"元"
})

/*第二步定义元素组件类*/
var myHome={
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
    //请求数据
    this.$http.get('data/home.json')
              .then(res=>{
          var data=res.data;
          if(data&&data.errno===0){
            this.ad=data.data.ad;
            this.list=data.data.list;
          }
        })
  }
}

var list={
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
    console.log(this.$route)
    this.$http.get("data/list.json",{
        params:{
          id:this.$route.params.id
        }
    }).then((res)=>{
      let data=res.data
      if(data&&data.errno===0){
        this.list=data.data.slice(0,3);
        this.other=data.data.slice(3);
      }
    })
  }
};
var detail={
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
    this.$http.get('data/detail.json',{
      params:{
        id:this.$route.params
      }
    }).then(function(res){
      console.log(res.data)
      let data=res.data;
      if(data&&data.error===0){
        this.data=data.data;
        console.log(this.data)
      }
    })
  }
}

/*第三步定义路由规则*/
var routes=[
    //主页
  {
    path:'/home',
    component:myHome
  },
    //detail
  {
    path:'/detail/:id',
    component:detail
  },
  {
    path:'/list/:type/:id',
    component:list
  }
]

/*实例化路由*/
var router=new VueRouter({
  routes:routes
})

var vm=new Vue({
  el:'#app',
  data:{
    //存储路由数据
    //query:[],
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
  },
  //注册路由
  router:router,
  created:function(){
    console.log(this)
  }


})




