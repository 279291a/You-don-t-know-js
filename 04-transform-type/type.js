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

var d = new Date();

+d; //1507607173129

//解析和转换的关系

var a = '42';
var b = '42px';

Number(a); // 42
parseInt(a);  //42

Number(b); // NaN
parseInt(b); //42

//parseInt 针对字符串值,遇到非字符串值会强制转换为字符串
parseInt(true); // NaN
parseInt(function(){}) //NaN
parseInt([1,2,3]); // 1 

//字符串到数字的隠式转换
[] + {} // "[object Object]"
{} + [] // 0

//布尔值到数字转换
function onlyOne(){
  var sum = 0;
  for(var i = 0; i < arguments.length; i++ ){
    if(arguments[i]){
      sum += arguments
    }
  }
  return sum === 1
}

//Symbole 类型允许从符号到字符串的显式类型转换，隠式类型转换会报错。
var s1 = Symbol('cool');
String(s1); // "Symbol(cool)"

var s2 = Symbol('not cool');
s2 + ''; // VM757:2 Uncaught TypeError: Cannot convert a Symbol value to a string

// 对象和非对象之间的相等比较
var a = null;
var b = Object(a)
a; //null
b; //{}
a == b; //false


var c = undefined
var d = Object(c)
c == d; //false

var e = NaN;
var f = Object(e)
f; //Number {[[PrimitiveValue]]: NaN}
e == f //false