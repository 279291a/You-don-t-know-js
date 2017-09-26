/*eslint-disable */
var a;
a;  //undefined
b;  //ReferenceError: b is not defined

typeof a;   //undefined
typeof b;   //undefined

//typeof undeclared

//这样会抛出错误
if(DEBUG){
  console.log('Debugging is starting');
}

//这样是安全的

if(typeof DEBUG === 'undefined'){
  console.log('Debugging is starting');
}