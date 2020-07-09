# 节点操作相关API
## 1.1 节点属性
```javascript
Node.nodeName  //返回节点名称，只读  $0.nodeName ='BODY'
Node.nodeType  // 返回节点类型的常数值，只读  $0.nodeType == '1'
Node.nodeValue  // 返回Text或Comment节点的文本值，只读
Node.textContent // 返回当前节点和它的所有后代节点的文本内容，可读写
Node.baseURI  // 返回当前网页的绝对路径, 随便找一个dom节点就可以

Node.ownerDocument  //返回当前节点所在的顶层文档对象，即document
Node.nextSibling  //返回紧跟在当前节点后面的第一个兄弟节点
Node.previousSibling  //返回当前节点前面的、距离最近的一个兄弟节点
Node.parentNode  //返回当前节点的父节点
Node.parentElement  //返回当前节点的父Element节点
Node.childNodes  //返回当前节点的所有子节点
Node.firstChild  //返回当前节点的第一个子节点
Node.lastChild  //返回当前节点的最后一个子节点

// parentNode接口
Node.children  //返回指定节点的所有Element子节点
Node.firstElementChild  //返回当前节点的第一个Element子节点
Node.lastElementChild  //返回当前节点的最后一个Element子节点
Node.childElementCount  // 返回当前节点所有Element子节点的数目
```
## 1.2 操作
```javascript
Node.appendChild(node)  //向节点添加最后一个子节点
Node.hasChildNodes()  // 返回布尔值，表示当前节点是否有子节点
```

