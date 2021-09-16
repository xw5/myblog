class Yase{
  constructor(name){
    this.name = name;
  }
}

class Skills{
  hurt() {
    console.log("造成伤害");
  }
  walk() {
    console.log("走路");
  }
  release() {
    console.log("释放技能");
  }
}

/**
 * 混入模式
 * @param {Object} receivingClass 
 * @param {Object} givingClass 
 */
function mixin(receivingClass, givingClass) {
  if (typeof arguments[2] != "undefined") {
    for(let i=2; i<arguments.length; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
}

mixin(Yase, Skills, "hurt", "walk", "release");

let yase = new Yase("亚瑟");
yase.hurt();
yase.walk();
yase.release();