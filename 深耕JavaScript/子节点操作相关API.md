# 子节点操作相关API

## firstChild,firstElementChild,childNodes,children的异同
编者注：由于都2020年了，所以本文并不考虑其在现代浏览器与老版本的IE6，7，8浏览器的区别😁
## firstChild
1. 只读属性，返回父级节点的第一个子元素，如果没有子节点则返回`null`
2. 会包含换行符，制表符，回车符，空格符等特殊的文本节点，所以除非以压缩的形式写代码，否则在获取元素时可能要用`nodeType`进行一次判断以排除文本节点。下图是nodeType的节点类型
  ![nodeType](/深耕JavaScript/2020-05-02-21-46-45.png)
   