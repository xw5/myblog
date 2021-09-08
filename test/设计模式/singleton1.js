class Person{
  constructor(name) {
    this.name = name;
  }
}

// 通用单例
function createInstance(fn){
  let instance;
  return function(...args) {
    if (!instance) {
      instance = new fn(...args);
    }
    return instance;
  }
}

let singlePerson = createInstance(Person);
let zhangsan = singlePerson("张三");
let lisi = singlePerson("李四");
console.log(zhangsan, lisi);