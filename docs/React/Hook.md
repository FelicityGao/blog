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
::: tip
原地修改 state 并调用 setState **不会**引起重新渲染。
:::

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

### 1. useRef

```js
const refContainer = useRef(initialValue);
```
`useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数`（initialValue）`。返回的 ref 对象在组件的整个生命周期内`保持不变`。

`useRef()` 创建的是一个**普通 Javascript 对象**, `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 `ref` 对象。

::: tip 注意
因为在Hooks中每次都会重新调用函数，所以是没有常量这个概念的，也可以利用`useRef`的特性，用他的`current`来保存常量。保存在`current`中的值是不会随着hook的调用而改变的，如果你不进行操作的话。
:::

### 2. useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps])
```
`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

// 父组件
function Father(){
  // ……
  const fInput = useRef()
  // ....
  fInput.current.focus()
  //……
  <FancyInput ref={fInput} />
}
```
在本例中，渲染 `<FancyInput ref={inputRef} />` 的父组件`finput`可以调用 `inputRef.current.focus()`。

### 3. useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
可以把第一个参数的函数缓存起来从而达到`优化性能`的结果。会根据第二个参数的变化情况来调用第一个参数传入函数。只有当第二个参数（deps）的数组中的值发生改变时才会重新调用函数计算结果。如果没有提供第二个参数就会每次都调用了。感觉跟vue的计算属性差不多的功能。

我们按照下面这样写的时候，每次点击按钮就会触发`Example`重新render,其返回的 React Element 也将重新渲染，由于 `{main}`包含的`Element`节点也将会重新渲染，如果其render时消耗特别大的话就会造成卡顿。因为在`setCount`的时候，`main`并没有变化，所以，实际上我们可以把它缓存起来。
```js
function Example(props) {
    const [count, setCount] = useState(0);
    const [foo] = useState("foo");

    const main = (
        <div>
            <Item key={1} x={1} foo={foo} />
            <Item key={2} x={2} foo={foo} />
            <Item key={3} x={3} foo={foo} />
            <Item key={4} x={4} foo={foo} />
            <Item key={5} x={5} foo={foo} />
        </div>
    );

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            {main}
        </div>
    );
}
```

优化后： 
```js
function Example(props) {
    const [count, setCount] = useState(0);
    const [foo] = useState("foo");

    const main = useMemo(() => (
        <div>
            <Item key={1} x={1} foo={foo} />
            <Item key={2} x={2} foo={foo} />
            <Item key={3} x={3} foo={foo} />
            <Item key={4} x={4} foo={foo} />
            <Item key={5} x={5} foo={foo} />
        </div>
    ), [foo]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            {main}
        </div>
    );
}
```
只有当`foo`变化时`main`才会重新render, `foo`不变时就会直接返回上次结果。从而使子组件跳过此次渲染。

:::tip 注意
useMemo 会额外带来空间成本（缓存上一次的结果）了，所以使用时需要衡量，不可滥用。
如：当`deps`依赖数组为空时，说明你只是希望存储一个值，这个值在重新 render 时永远不会变。这时可以使用`useRef`替换或者直接第一一个常量。
:::


还有：useCallback、useReducer、useLayoutEffect、useDebugValue。目前没用到，用到后再补充。
