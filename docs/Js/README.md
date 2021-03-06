# 基础知识
  ## 易错点整理
  ### 1. 生僻语句
  1. label 语句：label 可以在代码中添加标签，一般在for循环中跟`break`和`continue`配合使用
   ```javascript
   // 1. break
   var num = 0;
   outermost:   // label 标签名
    for(var i= 0; i< 10; i ++ ){
      for(var j =0; j < 10; j ++ ){
        if(j == 5){
          break outermost;  //break: 跳出循环, 使用outermost标签的话会让break不止跳出内层循环,还会跳出到外层循环
        }
        num ++;
      }
    }
    alert(num)  // 结果: num = 5
    // 2. contine
    var num = 0;
    outermost:
    for(var i= 0; i< 10; i ++ ){
      for(var j =0; j < 10; j ++ ){
        if(j == 5 && i == 5){
          continue outermost;  //continue: 跳出本次循环, 继续下次循环；使用outermost标签会让continue直接跳到外层的循环开始i=6时的循环,如果没有label标签的话，返回值应该是99
        }
        num ++;
      }
    }
    alert(num)  // 结果: num = 95
   ```
  2. with 语句： 将代码的作用域设置到一个特定对象中；但`严格模式`下不支持,会报错，且其会降低性能，不建议使用
    ```javascript
      with (location){
        var hostname = hostname;  // 相当于 var hostname = location.hostname
      }
    ```
  ### 2. switch语句
1. case 后可以不添加break语句用来表示，好几种情况都需要同一种方式执行，但是最好写好注释说明并不是有意忘掉`break`的
   ```javascript
    switch (i){
      // 合并两种情形
      case 25:
      case 30:
        alert('25 or 30');
        break;
      case 40:
        alert ('40');
        break;
    }
   ``` 
2. case 后可以跟表达式，跟表达式时每个case 的返回值是一个`布尔值`，所以在switch 中传递的表达式是`true`
   ```javascript
    var num = 25;
    switch (true){
      case num < 0:
       alert('小于0');
       break;
      case num >= 0 && num <= 10:
       alert('在0到10之间');
       break;
      default:
       alert('大于10');  
    }
    // 执行结果： alert('大于10')
    // 每个case 会按照顺序求值，直到返回true或者遇到default的语句为止，才会执行执行语句，弹出alert
   ```