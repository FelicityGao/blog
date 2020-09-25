# redux

 ## 1. Store
Store 就是保存数据的地方，你可以把它看成一个容器，它就是一个把 `action`, `state` ,`reducer` 联系到一起的**对象**。整个应用只能有一个 Store。Store 提供了三个方法: `store.getState()`，`store.dispatch()`，`store.subscribe()`。

Redux 提供createStore这个函数，用来生成 Store。
 ```js
 import { createStore } from 'redux'
 let store = createStore(todoApp)
 ```
 `createStore()` 的第二个参数是可选的, 用于设置 state 初始状态。这通常是服务器给出的。
 ```js
 let store = createStore(todoApp, window.STATE_FROM_SERVER)
 ```
 `window.STATE_FROM_SERVER`就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 `Reducer` 函数的默认初始值。

 下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。
 ```js
 const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
 ```


 ## 2. State
因为 store 中的数据是实时变化的，所以 State 指的就是`当前时刻`的store中的变量，可以通过store.getState()拿到。

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。
```js
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```

## 3. Action
State 的变化，会导致 View 的变化。但我们不能直接修改 state ，修改 state 要通过 Action，Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 本质上是一个 **普通对象**。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用`单独的模块或文件`来存放 action。

```js
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
} 
```
::: tip 注意
actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state
:::
### 3.1 Action 创建函数
注意区分 `action` 和 `action 创建函数`，这是两个概念。我们一般会把一个 `action对象`用一个函数包裹一下这就是**action创建函数**。如下:

```js
function addTodo(text) {   // action函数
  return {                 // action
    type: ADD_TODO,
    text
  }
}
```
### 3.2 dispatch
store.dispatch()是 View 发出 Action 的唯一方法。
```js
dispatch(addTodo(text))
```
或者创建一个 被绑定的 action 创建函数 来自动 dispatch, 然后直接调用它们:
```js
const boundAddTodo = text => dispatch(addTodo(text))
boundAddTodo(text);
```
`store.dispatch`方法会触发 `Reducer` 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```js
import { createStore } from 'redux';
const store = createStore(reducer);
```
## 4. Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

reducer 只是一个接收 state 和 action，并返回新的 state 的函数。 **没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算**。
```js
const reducer = function (previousState, action) {
  // ...
  return newState;
};
```
初始时，state 是 `undefined`, 所以可以给它设一个默认值。
```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
      case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```
 ### 4.1 拆分reducer
 这我们可以把不同属性的 Reducer 函数拆分， 不同的函数负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。如上面的代码
 ```js
 function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
 default:
      return state
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
default:
      return state
  }
}
 ```
 这样一拆，Reducer 就易读易写多了。而且，这种拆分与 React 应用的结构相吻合：一个 React 根组件由很多子组件构成。这就是说，子组件与子 Reducer 完全可以对应。

 最后我们写一个总的函数，把reducer们合并起来，方便调用，Redux 提供了 `combineReducers()` 工具类来合并reducer：
 ```js
import { combineReducers } from 'redux'
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
 ```
 上面这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。如果不同名就要采用下面的写法：
 ```js
 const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
// 等价于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
 ```
 每个 reducer 根据它们的 `key` 来筛选出 `state` 中的`一部分`数据并处理，如果 combineReducers() 中包含的所有 reducers 都没有更改 state，那么也就**不会创建一个新的对象**。

::: warning 永远不要在 reducer 里做这些操作：
- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()。
:::

 ## 5. store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
```js
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```
显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```
 ## 6. 异步Action 创建函数
把同步 action 创建函数和网络请求结合起来要引入 `redux-thunk` 这个中间件.通过使用指定的 `middleware`，`action 创建函数`除了返回 `action` 对象外还可以`返回函数`。这时，这个 action 创建函数就成为了 `thunk`。
 ```js
import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
 ```
默认情况下，`createStore()` 所创建的 Redux store 没有使用 `middleware`，所以只支持`同步数据流`。

你可以使用 `applyMiddleware()` 来增强 `createStore()`。虽然这不是必须的，但是它可以帮助你用简便的方式来**描述异步的 action**。

## 5. Middleware
middleware 的实现原理
```js
function logger(store) {
  // 这里的 next 必须指向前一个 middleware 返回的函数：
  let next = store.dispatch

  // 我们之前的做法:
  // store.dispatch = function dispatchAndLog(action) {

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}
```
可以在 Redux 内部提供一个可以将实际的 `logger` 应用到 `store.dispatch` 中的辅助方法：
```js
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  )
}
```
然后像这样应用多个 middleware：
```js
applyMiddlewareByMonkeypatching(store, [ logger, crashReporter ])
```
现在让我们替换原来的 `dispatch`，因为这样我们就可以在后面直接调用它，但是还有另一个原因：就是每一个 middleware 都可以操作（或者直接调用）前一个 middleware 包装过的 `store.dispatch`

如果 `applyMiddlewareByMonkeypatching` 方法中没有在第一个 middleware 执行时立即替换掉 `store.dispatch`，那么 `store.dispatch` 将会一直指向原始的 `dispatch` 方法。也就是说，第二个 middleware 依旧会作用在原始的 `dispatch` 方法。

但是，还有另一种方式来实现这种链式调用的效果。可以让 middleware 以方法参数的形式接收一个 `next()` 方法，而不是通过 store 的实例去获取。
```js
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```
我们可以写一个 applyMiddleware() 方法替换掉原来的 applyMiddlewareByMonkeypatching()。在新的 applyMiddleware() 中，我们取得最终完整的被包装过的 dispatch() 函数，并返回一个 store 的副本：

```js
// 警告：这只是一种“单纯”的实现方式！
// 这 *并不是* Redux 的 API.

function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}
```
这与 Redux 中 applyMiddleware() 的实现已经很接近了， 最终方法：
```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  // applyMiddleware() 告诉 createStore() 如何处理中间件
  applyMiddleware(logger, crashReporter)
)
```
就是这样！现在任何被发送到 store 的 action 都会经过 logger 。