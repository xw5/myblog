let zhangsan = {
  sellHouse(num) {
    console.log("卖了"+num+"万元");
  }
}

// 中介
let proxySeller = {
  sellHouse(hasSold, num) {
    // 通过中介卖掉的要中介费
    if (hasSold) {
      zhangsan.sellHouse(num -2)
    } else {
      zhangsan.sellHouse(num)
    }
  }
}

proxySeller.sellHouse(true, 100);
// 98