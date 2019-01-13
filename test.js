const DISC_ALL_RESULT = ['D', 'DI', 'DIS', 'DIC', 'DS', 'DC', 'I', 'ID', 'IDS', 'IDC', 'IS', 'ISC', 'IC', 'S', 'SD', 'SDC', 'SI', 'SIC', 'SC', 'C', 'CD', 'CDS', 'CI', 'CIS', 'CS'];
// const options = ["D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D"];
// // 结果包括 D/I/S/C
// const optionCount = {};
// options.forEach(option => {
//   const currentCount = optionCount[option] || 0;
//   optionCount[option] = currentCount + 1;
// });
const optionCount = {
  D: 15,
  I: 13,
  S: 9,
  C: 3,
}

const optionArray = Object.keys(optionCount).map((key) => {
  return {
    key,
    value: optionCount[key],
  }
});

// 降序排序
optionArray.sort((a, b) => {
  return a.value < b.value;
})

let resultStr = optionArray
  // 40 道题，答案数超过 10 才纳入计算范围
  .filter(item => item.value >= 10)
  .map(item => item.key)
  .join('');

// 找到最终结果
while (resultStr.length > 0) {
  if (DISC_ALL_RESULT.indexOf(resultStr) > -1) {
    break;
  } else {
    resultStr = resultStr.substr(0, resultStr.length - 1);
  }
}

console.log(resultStr);

// 排序之后，从后面组合，找到结果。

// console.log(optionCount);