# React使用useRef调用子组件方法

### **前情**

公司前端主技术栈是react系，最近在提取组件的时候想到vue可以通过ref获取子组件，再调用子组件的方法，于是想在react中实现同样效果。

### 实现原理

父组件调用useRef获取ref对象，再通过属性把ref对象传入子组件，子组件通过useImperativeHandle向外暴露方法给父组件调用

[useRef – React 中文文档](https://zh-hans.react.dev/reference/react/useRef)

[useImperativeHandle – React 中文文档](https://zh-hans.react.dev/reference/react/useImperativeHandle)

### 关键代码

父组件

```jsx
import { useRef } from 'react';
import Child from './child';

export default function Father() {
    const childRef = useRef();
    const childAction = () => {
        //updateChildText 就是子组件暴露给父组件的方法
        childRef.current && childRef.current.updateChildText ('父组件调用子组件方法');
    }

    return (
        <div>
            {/* 此处注意需要将childRef通过props属性从父组件中传给自己 cRef={childRef}  */}
            <Child cRef={childRef}/>
            <button onClick={childAction}>触发子组件方法</button>
        </div>
    )

}
```

子组件

```jsx
//这个为子组件
import {useState, useImperativeHandle, useState} from 'react';

export default function Child({cRef})  {
		const [text, setText] = '我是子组件'
		const updateChildText = (str) => {
			setText(str);
		}

    //useImperativeHandle(ref, createHandle, [deps])   
    useImperativeHandle(cRef,() => ({
        //test即为子组件暴露给父组件的方法
        updateChildText
    }))

    return (
        <div>{text}</div>
    )
}
```