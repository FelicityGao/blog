# Ref
Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。
## React.createRef
自React16.3版本后Refs 是通过 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
``` jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();   // 通过React.createRef()创建ref，并把它赋值给一个变量
    }
  render() {
    return <input type="text" ref={this.inputRef} />;   // 通过ref把该变量挂载到dom节点上
    }
  componentDidMount() {
    this.inputRef.current.focus();  //对该节点的引用可以在 ref 的 current 属性中被访问。 
    }
}
```
## 回调Refs
React 也支持另外一种refs的设置方式，称为“回调refs”
```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;  // ref回调函数得到该节点dom元素并赋值给变量
    };
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();  // 使用原生 DOM API 使 text 输入框获得焦点
    };
  }
  componentDidMount() {
    this.focusTextInput(); // 组件挂载后，让文本框自动获得焦点
  }
  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
react 会在挂载的时候调用`ref`的回调并把dom元素传入，会在卸载的时候再次调用并传入`null`
**注**： 
1. 你不能在函数组件上使用 ref 属性，因为他们没有实例。
2. 以前使用的 `this.refs.textInput` 这种方式并不能访问到refs ，必须使用回调函数或 createRef API 的方式代替。

## React.forwardRef


