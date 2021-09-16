let obj1 = {
  fn() {
    console.log('fn1');
  }
}

let obj2 = {
  fn() {
    console.log('fn2');
  }
}

class MyEvent{
  constructor() {
    this.handles = {};
  }

  /**
   * 事件注册
   * @param {String} eventName 
   * @param {Function} fn 
   */
  addEvent(eventName, fn) {
    if (typeof this.handles[eventName] === 'undefined') {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(fn);
  }

  /**
   * 事件触发
   * @param {String} evnetName 
   */
  trigger(evnetName) {
    if (!(evnetName in this.handles)) {
      return ;
    }
    this.handles[evnetName].forEach(fn => {
      fn();
    })
  }
}

let eventObj = new MyEvent();
// 事件注册
eventObj.addEvent('myevent', obj1.fn);
eventObj.addEvent('myevent', obj2.fn);

// 事件触发
setTimeout(() => {
  eventObj.trigger('myevent');
}, 1100);