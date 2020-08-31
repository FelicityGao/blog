# Hook

Hook 是一些可以让你在函数组件里"钩入"React state 及生命周期等特性的函数。React 内置了一些像`useState`这样的 Hook。你也可以创建自己的 Hook 来复用不同组件之间的状态逻辑。
**Hook 规则**
1. **只可以在最顶层使用**（即不要再循环，条件或嵌套函数中使用），不然他们的调用顺序会出现问题。如果想使用循环或判断的话，可以在Hook里面使用。 只可以在最顶层使用
2. **只在 React 函数中调用 Hook**，只能在react函数组件及自定义Hook中使用。不能在javascript函数中使用。

**原因：** 感觉跟函数的参数是一样的，我们写的hook就相当于一个个传入函数中的参数，react在初始时会一一建立对应。但是当你在循环或判断中写上时，当某次运行跳过或多出某个hook时，react还是按原来的个数对应着走，然后就会出现混乱。
```js
 useEffect(function persistForm() {
    // 👍 将条件判断放置在 effect 中
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

## State Hook

`useState` 返回一个 `state`，以及更新 state 的函数`setState`。我们可以使用结构赋值的方式接收，名字非固定，可以随意填写。`initialState`是指默认的`state`的值，非必填，只会在组件的初始渲染中起作用，后续渲染时会被忽略，也`可以传入一个函数`，在函数中计算并返回初始的 state。

```js
const [state, setState] = useState(initialState)
```

`setState`更改 state 时，页面会重新渲染。在`setState`中可以写一个函数，参数就是上次的`state`值,可以用对象合并的方式更改本次要修改的值，而不必每次都把所有值写一遍。（因为`useState`不会自动合并更新对象，如果你在设置里不写的话，就会没有了。这点跟以前的 setState 不一样）

```js
setState((prevState) => {
  // 也可以使用 Object.assign
  return { ...prevState, ...updatedValues }
})
```

## Effect Hook

**副作用：** 我们把在组件中执行的数据获取、订阅和手动修改 Dom 等操作统一称之为“副作用”。
`useEffect`用来替代生命周期钩子函数。

1. 当组件重新渲染时会调用`useEffect`。
2. 如果其有返回函数的话，就会在组件卸载的时候执行该返回函数,清除`effect`。如果组件多次渲染（通常如此），则在执行下一个 `effect` 之前，上一个 `effect` 就已被清除。
3. 第二个参数是一个数组，可以规定在哪个参数变化时才调用该`Effect`

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
  }
}, [props.friend.id]) // 仅在 props.friend.id 发生变化时，重新订阅
```

> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。

## Context Hook
`useContext` 接收一个**context 对象**(React.createContext 的返回值)并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。
**注：**必须是contesxt对象，不能传入`MyContext.Consumer`之类的context的属性。

```js
const value = useContext(MyContext);
```

> useContext(MyContext) 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。

调用了 useContext 的组件总会在 context 值变化时**重新渲染**。如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化。


## 自定义Hook
自定义Hook是为了把一些需要使用使用到Hook的函数封装为可复用的组件时使用的。（因为Hook规则不允许Hook出现在别的组件中，会导致运行错误）

自定义Hook实际上就是一个函数，但它比较特别的是必须使用**use**开头，这样React内部就会自动识别它为Hook，将其置为顶层函数，提前执行。噢，还有这个函数就可以在内部调用其他Hook了。

## 其他Hook

### useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
### useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
