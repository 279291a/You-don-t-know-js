// // 可以使用Number.EPSILON 来比较两个数字是否相等

// function numberCloseEnoughToEqual(n1, n2) {
//   return Math.abs(n1 - n2) < Number.EPSILON;
// }

// const a = 0.1 + 0.2;
// const b = 0.3;

// numberCloseEnoughToEqual(a, b);

// // 为es6之前的版本写polyfill

// if (!Number.EPSILON) {
//   Number.EPSILON = Math.pow(2, -52);
// }

// Number.MAX_SAFE_INTEGER;
// Number.MIN_SAFE_INTEGER;

// if (!Number.isInteger) {
//   Number.isInteger = num => typeof num === 'number' && num % 1 === 0;
// }

// if (!Number.isNaN) {
//   Number.isNaN = n => n !== n;
// }

// function foo(x) {
//   x.push(4);
//   x;

//   x = [4, 5, 6];
//   x.push(7);
//   x;
// }

// var a = [1,2,3];

// foo(a);

function foo2(x) {
  x.push(4);
  console.log(x);

  x.length = 0;
  x.push(4, 5, 6, 7);
  console.log(x);
}

const c = [1, 2, 3];

foo2(c);

// 通过值复制的方式来传递复合值（如数组），为其创建一个副本

foo2(c.slice());

// 将基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合值（对象或者数组中），然后通过引用复制的方式传递。

function foo(wrapper) {
  wrapper.a = 42;
}

const obj = {
  a: 2,
};

foo(obj);

obj.a; // 42
