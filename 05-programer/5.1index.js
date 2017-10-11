//以下是控制台返回结果值，而不是真正的输出

var b;  //< undefined

if(true){
  b = 4+38;  //< 42
}

// 获取语句结果值

var a,b;
a = eval('if(true){b = 4+38}');
a; //<42
