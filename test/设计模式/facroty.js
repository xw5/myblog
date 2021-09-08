class Dog {
  constructor() {
    this.name = "旺财";
  }
}

class Cat {
  constructor() {
    this.name = "小白";
  }
}

function factory(type) {
  switch (type) {
    case 'dog':
      return new Dog();
    case 'cat':
      return new Cat();
    default: 
      console.log('没有该类型的动物');
      break;
  }
}

let dog = factory('dog');
let cat = factory('cat');
console.log(dog, cat);