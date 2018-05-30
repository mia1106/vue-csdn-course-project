/**
 * Created by RanLI on 5/22/2018.
 */
define(function(require,exports,module){
  require('./list.css');
  require('../item.css');
  require('../../util/util.js');
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

  /*注册组件*/
  Vue.component('list',list);
  /*暴露接口*/
  module.export=list;

})