//吞掉错误或异常
var p = new Promise(function (resolve, reject) {
  foo.bar();
  resolve(42);//永远不会到达这里
});

p.then(function fulfilled() {
  console.log('fulfill');//永远不会到达这里
},
  function rejected(err) {
    console.log(err);
  }
)

//promise.then 中发生异常

var o = new Promise(function (resolve, reject) {
  resolve(42);
});

var x = o.then(
  function fulfilled(msg) {
    foo.bar();
    console.log(msg);//永远不会到达这里
  },
  function rejected(err) {
    console.log(err);//永远不会到达这里
  }
)

x.then(
  function fulfilled(msg) {
    foo.bar();
    console.log(msg);
  },
  function rejected(err) {
    console.log(err);//永远不会到达这里
  }
);

//如果向Promise.resolve() 传递一个非Promise、非thenable 的立即值，就会得到一个用这个值填充的Promise。
//下面的p1,p2行为完全一样
var p1 = new Promise(function (resolve, reject) {
  resolve(42);
});
var p2 = Promise.resolve(42);

//向Promise.resolve()中传递一个真正的Promise，就会返回同一个Promise
var p3 = Promise.resolve(42);
var p4 = Promise.resolve(p3);

p3 === p4;//true

//传递非Promise 的thenable 值，将会试图展开这个值，而且展开过程会持续到提取出一个具体的非类Promise的最终值

var p = {
  then:function(cb){
    cb(42);
  }
}

p
  .then(
    function fulfilled(val){
      console.log(val);  //42
    },
    function rejected(err){
      console.log(err);  //永远不会运行
    }
  )

//另一种
var p = {
  then:function(cb,errcb){
    cb(42);
    errcb('wrong');
  }
};

p
.then(
  function fulfilled(val){
    console.log(val);  //42
  },
  function rejected(err){
    console.log(err);  //wrong
  }
)