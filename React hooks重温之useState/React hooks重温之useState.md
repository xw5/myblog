# React hooks重温之useState

## **前情**

React和Vue是目前前端流行的主要框架，平时工作中都有用到，对于新版的react来说，函数组件和hooks是react的重中之重，特别是hooks给react带来了非常棒的开发体验，工作中疲于业务开发，停留在会使用相关hooks的阶段，并未细细学习react相关hooks，现在正是细细学习的时候了。

## useState

是react hooks中最基础同时也是使用量最多的一个，它能让函数组件拥有自己的状态，通过useState可以实现状态的初始化、读取、更新。

### 基础语法

```jsx
const [状态名，set函数] = useState(初始值)
```

其中状态名代表的数据，可以被函数组件使用，如果修改状态名所表示的数据，需要调用set函数，状态变化会触发函数组件的重新执行。

示例代码：

```jsx
import { useState } from 'react';

export default function Count() {
  const [count, setCount] = useState(0);
	console.log('Count run');
  return (
    <div className='App'>
      <p>当前count的值：{count}</p>
      <button onClick={() => setCount(count + 1)}>count++</button>
    </div>
  );
}
```

### 以函数的形式为状态赋初始值

在使用useState定义状态时，除了可以直接给定初始值，还可以通过函数返回值的形式为状态赋初始值，语法如下：

```jsx
const [msg, setMsg] = useState(() ⇒ 初始值)
```

示例代码：

```jsx
import { useState } from 'react';

export default function StateFunction() {
  const [date, setDate] = useState(() => {
    const dateObj = new Date();
    console.log('-- useState init --');
    return {
      Y: dateObj.getFullYear(),
      M: dateObj.getMonth() + 1,
      D: dateObj.getDate(),
      h: dateObj.getHours(),
      m: dateObj.getMinutes(),
      s: dateObj.getSeconds(),
    }
  });

  /**
   * 更新状态date
   */
  const updateDate = () => {
    const dateObj = new Date();
    setDate({
      Y: dateObj.getFullYear(),
      M: dateObj.getMonth() + 1,
      D: dateObj.getDate(),
      h: dateObj.getHours(),
      m: dateObj.getMinutes(),
      s: dateObj.getSeconds(),
    })
  }
  return (
    <div className='App'>
      <p>今天日期是:{date.Y}年{date.M}月{date.D}日{date.h}时{date.m}分{date.s}秒</p>
      <button onClick={updateDate}>现在时间</button>
    </div>
  );
}
```

> 注：只有组件初始化的时候才会执行状态的初始方法
> 

### useState是异步变更状态的

调用useState()会返回一个变更状态的函数，这个函数内部是以异步的形式修改状态的，所以修改状态后无法立即拿到最新的状态。

示例代码：

```jsx
import { useState } from 'react';

export default function Count() {
  const [count, setCount] = useState(0);
  console.log('CountAsync run');

  const updateCount = () => {
    setCount(count + 1);
		// 这是拿到的更新前的值
    console.log('---- updateCount ----:', count);
  }
  return (
    <div className='App'>
      <p>当前count的值：{count}</p>
      <button onClick={updateCount}>count++</button>
    </div>
  );
}
```

**通过useEffect hooks可以监听状态值的变化，并执行相应的回函数，示例代码如下：**

```jsx
import { useState, useEffect } from 'react';

export default function CountAsyncByUseEffect() {
  const [count, setCount] = useState(0);
  console.log('CountAsyncByUseEffect run');

  const updateCount = () => {
    setCount(count + 1);
    console.log('---- updateCount ----:', count);
  }

  useEffect(() => {
    console.log('---- useEffect  ----:count变化了', count);
  }, [count]);
  return (
    <div className='App'>
      <p>当前count的值：{count}</p>
      <button onClick={updateCount}>count++</button>
    </div>
  );
}
```

### 连续调用状态更新函数，值更新不及时的问题？

当连续多次以相同的操作更新状态时，React内部会对传递过来的新值进行比较，如果值相同，则会屏蔽后续的更新行为，从而防止组件频繁渲染问题。

问题示例代码：

```jsx
import { useState } from 'react';

export default function Counting() {
  const [count, setCount] = useState(0);
  console.log('Counting run');

  const updateCount = () => {
    setCount(count + 1);
    setCount(count + 1);
    // 第一次调用后实际上count的值是1不是2
  }

  return (
    <div className='App'>
      <p>Counting-当前count的值：{count}</p>
      <button onClick={updateCount}>count++</button>
    </div>
  );
}
```

**解决方法：状态设置函数传递一个带返回值的函数去更新状态，不是直接传递更新的状态值，**

示例代码如下：

```jsx
import { useState } from 'react';

export default function CountingFunction() {
  const [count, setCount] = useState(0);
  console.log('CountingFunction run');

  const updateCount = () => {
    setCount((countPrev) => countPrev + 1);
    setCount((countPrev) => countPrev + 1);
    // 执行第一次后count值为2
  }

  return (
    <div className='App'>
      <p>Counting-当前count的值：{count}</p>
      <button onClick={updateCount}>count++</button>
    </div>
  );
}
```

### useState更新对象类型的值

如果要更新对象类型的值，并触发组件的重新渲染，则必须展开运算符或者Object.assign()，JSON.parse+JSON.stringify，或者使用第三方像lodash实现对象的拷贝等生成一个新的对象，用新的对象覆盖旧对象，才能正常触发组件的重新渲染，示例代码如下：

```jsx
import { useState } from 'react';

export default function StateObj() {
  const [useInfo, setUseInfo] = useState({
    name: '小黑',
    sex: '男',
    age: 18
  });
  console.log('StateObj run');

  const updateInfo0 = (name, sex) => {
    useInfo.name = name;
    useInfo.sex = sex;
    setUseInfo(useInfo);
  }
  const updateInfo1 = (name, sex) => {
    setUseInfo({
      ...useInfo,
      name,
      sex
    });
  }
  const updateInfo2 = (name, sex) => {
    setUseInfo(Object.assign({...useInfo}, {
      name,
      sex
    }));
  }
  const updateInfo3 = (name, sex) => {
    const userInfoTemp = JSON.parse(JSON.stringify(useInfo));
    userInfoTemp.name = name;
    userInfoTemp.sex = sex;
    setUseInfo(userInfoTemp);
  }

  return (
    <div className='App'>
      <p>StateObj-当前用户信息：用户名：{useInfo.name}性别：{useInfo.sex}年龄：{useInfo.age}</p>
      <button onClick={() => updateInfo0('小红0', '女0')}>小红0女0</button>
      <button onClick={() => updateInfo1('小红1', '女1')}>小红1女1</button>
      <button onClick={() => updateInfo2('小红2', '女2')}>小红2女2</button>
      <button onClick={() => updateInfo3('小红3', '女3')}>小红3女3</button>
    </div>
  );
}
```

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