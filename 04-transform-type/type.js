/*eslint-disable */
// JSON.stringify()

// 以下四种：安全JSON值
JSON.stringify(42); // "42"
JSON.stringify('42'); // ""42""
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"

// 不安全json值,undefined,function,symbol 自动忽略，在数组中则会返回null
JSON.stringify(undefined); // undefined
JSON.stringify(() => {}); // undefined
JSON.stringify(Symbol); // undefined

JSON.stringify([1, undefined, function () {}, 4]); // "[1,null,null,4]"
JSON.stringify({ a: 2, b() {} }); // "{"a":2}"

var o = {};

var a = {
  b: 42,
  c: o,
  d() {},
};

// 在a中创建一个循环引用
o.e = a;

// 循环引用在这里会产生错误
JSON.stringify(a); // VM2335:13 Uncaught TypeError: Converting circular structure to JSON

// a.toJSON = () => ({ b: this.b });
a.toJSON = function toJSON() {
  return { b: this.b };
};

JSON.stringify(a); // "{"b":42}"

var a = {
  b:42,
  c:'42',
  d: [1,2,3]
};

JSON.stringify(a,['b','c']); // "{"b":42,"c":"42"}"
JSON.stringify(a, function(k,v){
  if(k !== 'c') return v;
});  // "{"b":42,"d":[1,2,3]}"

var a = {
  b:42,
  c:'42',
  d:{
    a:'111',
    b:'222',
    c:'3333'
  }
};

JSON.stringify(a, function(k,v){
  if(k !== 'c') return v;
}); //"{"b":42,"d":{"a":"111","b":"222"}}"

JSON.stringify(a,null,3);
// "{
//   "b": 42,
//   "c": "42",
//   "d": {
//      "a": "111",
//      "b": "222",
//      "c": "3333"
//   }
// }"

JSON.stringify(a, null, '----' );
// "{
//   ----"b": 42,
//   ----"c": "42",
//   ----"d": {
//   --------"a": "111",
//   --------"b": "222",
//   --------"c": "3333"
//   ----}
//   }"


// ToBoolan  假值对象

var a = new Boolean(false);
var b = new Boolean(0);
var c = new Boolean('');

var d = a && b && c;
var e = Boolean(a && b && c);

d; // Boolean {[[PrimitiveValue]]: false}
e; //true

Boolean(document.all); // false