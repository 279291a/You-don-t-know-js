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

var o = new Promise(function(resolve,reject){
  resolve(42);
});

var x= o.then(
  function fulfilled(msg){
    foo.bar();
    console.log(msg);//永远不会到达这里
  },
  function rejected(err){
    console.log(err);//永远不会到达这里
  }
)

x.then(
  function fulfilled(msg){
    foo.bar();
    console.log(msg);
  },
  function rejected(err){
    console.log(err);//永远不会到达这里
  }
);