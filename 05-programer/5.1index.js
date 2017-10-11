//以下是控制台返回结果值，而不是真正的输出

var b;  //< undefined

if(true){
  b = 4+38;  //< 42
}

// 获取语句结果值

var a,b;
a = eval('if(true){b = 4+38}');
a; //<42

function foo(){
  a=a+1;
}

var a = 1;
foo();

// 语句系列逗号运算符
var a = 42, b;
b = (a++, a);

a; //43
b; //43

// 大括号

var a = {
  foo: bar()
}