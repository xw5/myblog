function getUsers() {
  return [
    {
      name: 'zs',
      age: 30
    },
    {
      name: 'ls',
      age: 20
    }
  ]
}

// 不想修改上面代码，但想获取 [{zs: 30}, {ls: 20}]格式的数据

/**
 * 适配器
 * @param {Array} users 
 */
function adaptor(users) {
  let result = [];
  users.forEach(user => {
    result.push({
      [user.name]: user.age
    })
  });
  return result;
}

let res = getUsers();
console.log(res);
// [ { name: 'zs', age: 30 }, { name: 'ls', age: 20 } ]
console.log(adaptor(res));
// [ { zs: 30 }, { ls: 20 } ]