var a = 1;
var b = 2;

function* foo() {
  a++;
  yield;
  b = b * 2;
  a = (yield b) + 3;
}

function* bar() {
  b--;
  yield;
  a = (yield 8) + b;
  b = a * (yield 2);
}

function step(gen) {
  var it = gen();
  var last;

  return function () {
    last = it.next(last).value;
  }
}

var s1 = step(foo);
var s2 = step(bar);

s2();
s2();
s1();
s2();

s1();

s1();
s2();

// 实现标准的迭代器接口
var something = (function () {
  var nextVal;

  return {
    //for..of循环需要
    [Symbol.iterator]: function () { return this; },

    //标准迭代器接口方法
    next: function () {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = (3 * nextVal) + 6;
      }

      return { done: false, value: nextVal }
    }
  }
})();

for(var v of something){
  console.log(v);

  //不要死循环
  if(v>500){
    break;
  }
}