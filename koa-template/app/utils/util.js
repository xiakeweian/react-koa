/**
 *
 * @param {*} arr
 * @returns
 * 数组中随机选择一个
 */
const arrayRandomOne = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
module.exports = {
  arrayRandomOne,
};
