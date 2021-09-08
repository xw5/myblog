class Person{
  static instance;
  constructor(name) {
    if (!Person.instance) {
      Person.instance = this;
    } else {
      return Person.instance;
    }
    this.name = name;
  }
}

let zhangsan = new Person("张三");
let lisi = new Person("李四");

console.log(zhangsan, lisi);