/*eslint-disable */
var a = new String('abc');    //undefined
typeof a    //"object"
a instanceof String    //true
console.log(a);    //VM2036:1 String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

//内部属性[[Class]],无法直接查看，一般通过Object.prototype.toString()来查看

Object.prototype.toString.call([1,2,3]); //[object Array]
Object.prototype.toString.call(/js/i);  //[object RegExp]
