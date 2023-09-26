# React hooks重温之useRef

## **前情**

React和Vue是目前前端流行的主要框架，平时工作中都有用到，对于新版的react来说，函数组件和hooks是react的重中之重，特别是hooks给react带来了非常棒的开发体验，工作中疲于业务开发，停留在会使用相关hooks的阶段，并未细细学习react相关hooks，现在正是细细学习的时候了。

### 思考?

问题1：除了使用全局变量，怎么在函数组件生命周期中实现一个保持不变的值？

问题2：react怎么获取Dom元素实例？

问题3：react父组件怎么引用函数式子组件，访问子组件数据+调用子组件的方法？

## useRef

useRef函数返回一个可变的ref对象，该对象只有一个current属性，调用useRef函数时可以为其指定初始值，并且这个返回的ref对象在组件的整个生命周期内保持不变

### 基础语法

```jsx
const refObj = useRef(初始值)
console.log(refObj.current)
```

### 存储渲染周期之间的共享数据

假设我们有如下一个需求，就是每次点击updateCount按钮的时候希望重起一个定时器递增count。

错误示例：如下代码多次点击会发现定时器运行出现异常，变化频率随着你点击次数越多，变的越快，因为你每点一次都是新启一个定时器

```jsx
import { useState } from 'react';

export default function CountTimer() {
  const [count, setCount] = useState(0);

  let timer = null;

  const updateCount = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }
  console.log('Count run');
  return (
    <div className='App'>
      <p>当前count的值：{count}</p>
      <button onClick={updateCount}>updateCount</button>
    </div>
  );
}
```

正确代码代码：

```jsx
import { useState, useRef } from 'react';

export default function CountTimerOk() {
  const [count, setCount] = useState(0);

  let timer = useRef();

  const updateCount = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }
  console.log('Count run');
  return (
    <div className='App'>
      <p>当前count的值：{count}</p>
      <button onClick={updateCount}>updateCount</button>
    </div>
  );
}
```

> 注：因为组件rerender时useRef不会被重新初始化
> 

### useRef获取Dom元素实例

假设我们有如下一个需求，希望点击focus表单按钮，让表单获得焦点，此需求也不一定要通过useRef来实现，直接使用js原生dom获取方法也是可以实现。

示例代码：

```jsx
import { useRef } from 'react';

export default function InputFocus() {

  let inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  }
  return (
    <div className='App'>
      <input type="text" ref={inputRef} />
      <button onClick={focus}>focus表单</button>
    </div>
  );
}
```

### useRef获取函数式子组件引用，并获取子组件数据和调用子组件方法

useRef无法直接获取函数式子组件引用，需要借助forwardRef和useImperativeHandle的配合才能达到理想效果

示例代码：

```jsx

//----- Child组件代码  -----
import { useState, forwardRef, useImperativeHandle } from 'react'

const RefChild = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount((count) => count + Number(props.step));
  }

  // 向外面ref暴露内部数据和方法
  useImperativeHandle(ref, () => {
    return {
        count,
        updateCount
    }
  })

  return (
    <div className="warp">
      <div>child count：{count}</div>
      <button onClick={updateCount}>updateCount</button>
    </div>
  )
})

export default RefChild;

//----- Parent组件代码  -----
import { useRef } from 'react';
import ChildRef from './Child.jsx';

export default function ParentRef() {

  let childRef = useRef();

  const updateChildCount = () => {
    childRef.current.updateCount();
    console.log('---- updateChildCount ----:', childRef.current.count);
  }
  console.log('Count run');
  return (
    <div className='App'>
      <ChildRef step={5} ref={childRef} />
      <button onClick={updateChildCount}>updateChildCount</button>
    </div>
  );
}
```

**useImperativeHandle还支持第三个参数：**

- 如果省略则内部函数的任何状态变化都会重新useImperativeHandle初始化，这样外部ref能及时的获取到子组件的更新
- 如果传一个空数据，则是useImperativeHandle只会初始化一次，如果暴露内部的状态，外面ref获取的是不会跟子组件保持更新新的
- 如果传的是[状态值，状态值…]，则只有这些状态变化时才会重新useImperativeHandle初始化，这样是有利于性能的，这是推荐做法。

### useRef使用注意事项

- 组件rerender时useRef不会被重新初始化
- ref.current变化不会使组件重新渲染，如果要实现重新渲染应该使用useState
- ref.current变化不会使组件重新渲染，所以ref.current不能作为其它Hooks如useEffect、useMemo、useCallback等的依赖项

## 友情提示

如果你使用的是vs code，在书写React hooks时可以安装第三方的插件，快捷输入相关hooks，我个人有编写一款常用代码段插件**[Common-Code-Snippet](https://marketplace.visualstudio.com/items?itemName=msxw.common-code-snippet)**，里面就有与hooks相关的代码段，除了hooks相关的代码段，还有很多好用的代码段，具体使用规则可查看插件的说明文挡，插件会一直持续更新。

hooks相关示例说明：

```jsx
// 输入rusestate会生成如下代码段
const [example, setexample] = useState();

// 输入ruseeffect会生成如下代码段
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [state]); 
```