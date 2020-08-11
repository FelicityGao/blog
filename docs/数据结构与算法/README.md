# 列表
当不需要在一个很长的序列中查找元素，或者对其进行排序时，列表显得尤为有用。列表应该是最简单的一个数据结构了。
## 列表数据结构的实现
我们一个选定一个数据存储结构`dataSource`，选用的是数组。`listSize`来表示列表的长度，`pos`属性来表示在列表中的位置。

然后，我们还需要一些方法显示列表属性：`length()`返回列表长度,`currPos()`返回当前位置，`toString()`返回所有列表的数据
#### 一些增删改查操作：
* `append()`在列表最后添加元素
* `remove()`在删除指定元素
* `find()`在删除元素时寻药先使用此方法判断该元素是否存在，存在则返回所在位置
* `insert()`在指定元素后插入元素
* `contains()`列表中是否包含某个元素
* `clear()`清空列表
#### 位置
* `front()`最前面的一个元素
* `end()`最后面的一个元素
* `next()`移动到当前元素的下一个元素
* `prev()`移动到当前元素的上一个元素
* `moveTo(n)`移动到`n`位置
* `getElement()`当前元素

```javascript
class List {
  constructor() {
    this.pos = 0
    this.listSize = 0
    this.dataSource = []
  }
  length() {
    return this.listSize
  }
  currPos() {
    return this.pos
  }
  toString() {
    return this.dataSource
  }
  append(element) {
    this.dataSource[this.listSize++] = element
  }
  find(element) {
    for (let i = 0; i < this.listSize; i++) {
      if (this.dataSource[i] === element) {
        return i
      }
    }
    return -1
  }
  remove(element) {
    let findAt = this.find(element);
    if (findAt !== -1) {
      this.dataSource.splice(findAt, 1)
      --this.listSize
      return true
    }
    return false
  }
  insert(element, after) {
    let findAt = find(after)
    if (findAt !== -1) {
      this.dataSource.splice(findAt + 1, 0, element)
      ++this.listSize;
      return true
    }
    return false
  }
  contains(element) {
    for (let i = 0; i < this.listSize; i++) {
      if (this.dataSource[i] === element) {
        return true
      }
    }
    return false
  }
  clear() {
    this.dataSource = []
    this.listSize = 0
    this.pos = 0
  }
  moveTo(n) {
    this.pos = n
  }
  front() {
    return this.pos = 0
  }
  end() {
    return this.listSize - 1
  }
  next() {
    if (this.pos < this.listSize) {
      this.pos++
    }
  }
  prev() {
    if (this.pos > 0) {
      this.pos--
    }
  }
  getElement() {
    return this.dataSource[this.pos]
  }
}
```

## 使用迭代器访问列表
经过上面的封装以后我们就可以很方便的使用迭代器来访问列表了，跟使用数组索引的方式相比，使用迭代器访问列表有如下优点：
* 我们不必关心底层数据的结构
* 当数据发生增删等操作时，这些方法的返回值都会动态的改变，不会影响已经写好的代码
* 我们可以更换List类的数据存储方式
```javascript
for(names.front(); names.currPos() < names.length(); names.next()) { 
  console.log(names.getElement());
}
```