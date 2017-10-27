//吞掉错误或异常
var p = new Promise(function (resolve, reject) {
  foo.bar();
  resolve(42);
});

p.then(function fulfilled() {
  console.log('fulfill');
},
  function rejected(err) {
    console.log(err);
  }
)