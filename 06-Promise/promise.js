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
  then: function (cb) {
    cb(42);
  }
}

p
  .then(
  function fulfilled(val) {
    console.log(val);  //42
  },
  function rejected(err) {
    console.log(err);  //永远不会运行
  }
  )

//另一种
var p = {
  then: function (cb, errcb) {
    cb(42);
    errcb('wrong');
  }
};

p
  .then(
  function fulfilled(val) {
    console.log(val);  //42
  },
  function rejected(err) {
    console.log(err);  //wrong
  }
  )

/**
 * 向封装的Promise引入异步，仍然可以工作
 */

var p = Promise.resolve(21);

p.then(function (v) {
  console.log(v);

  //创建一个promise 并返回
  return new Promise(function (resolve, reject) {
    //引入异步
    setTimeout(function () {
      resolve(v * 2);
    }, 3000);
  });
})
  .then(function (v) {
    //在前一步中的3000ms延迟之后运行
    console.log(v);
  })

/**
 * 推迟Promise创建
 */
function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

delay(1000)
  .then(function STEP2() {
    console.log('step 2 after 100ms');
    return delay(2000)
  })
  .then(function STEP3() {
    console.log('step3 after another 2000ms');
  })
  .then(function STEP4() {
    console.log('step4 after (next job)');
    return delay(50);
  })
  .then(function STEP5() {
    console.log('step 5 after another 50ms')
  })

/**
 * 默认拒绝处理函数只是把错误重新抛出，这最终会使得p2 用同样的错误理由拒绝，
 * 从本质上来说，这使得错误可以继续沿着Promise链传播下去，中到遇到显式定义的拒绝处理函数
 */
var p = new Promise(function (resolve, reject) {
  reject('OOps');
});

var p2 = p.then(
  function fulfilled() {
    console.log('aaaaa');  //永远不会到达这里
  },
  function (err) {
    throw err;
  }
);

/**
 * 如果没有给then()传递一个适当有效的函数作为完成处理函数参数，还是会有作为替代的一个默认处理函数
 * 默认的完成处理函数只是把接收到的传入值传递给下一个步骤（Promise）而已。
 */
var p = Promise.resolve(42);

p.then(
  function (v) {
    return v;
  },
  null,
  function rejected(err) {
    //永远不会到达这里
  }
)

/**
 * 错误处理：很容易被吞掉
 */

 //正常情况
 var p = Promise.reject('Oops');

 p.then(
   function fulfilled(){
     //永远不会到达这里
   },
   function rejected(err){
     console.log(err); //Oops
   }
 );

 //错误被吞掉
 var p = Promise.resolve(42);
 
  p.then(
    function fulfilled(msg){
      console.log(msg.toLowerCase());//会跑出错误
    },
    function rejected(err){
      console.log(err); //永远不会到达这里
    }
  );

/**
 * done处理异常
 */

var p = Promise.resolve(42);

p.then(
  function fulfilled(msg) {
    console.log(msg.toLowerCase());
  }
)
  .done(null, handleErrors);
