class Dog{
  constructor() {
    this.name = "旺财";
  }

  showAbility() {
    console.log("我会叫旺旺");
  }
}

let dog = new Dog();

dog.showAbility();
console.log("=".repeat(30))

function stand() {
  console.log("我会双腿站立一分钟");
}

function catchMouse() {
  console.log("我会抓老鼠");
}

// 增加装饰器方法
Function.prototype.docorator = function (fn) {
  let self = this;
  return function() {
    self();
    fn();
  }
}

dog.showAbility.docorator(stand).docorator(catchMouse)()
// 我会叫旺旺
// ==============================
// 我会叫旺旺
// 我会双腿站立一分钟
// 我会抓老鼠
