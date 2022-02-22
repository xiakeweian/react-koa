import { DataProps } from '../interface';

// 平铺数据结构
// 可以直接用concat链接，代码省事，不过它会创建新数组
export const flatTree = (data: DataProps[]) => {
  return data.reduce((prev: any[], next: DataProps) => {
    prev.push(next);
    if (next.children) {
      const arr = flatTree(next.children);
      arr.forEach(item => prev.push(item));
    }
    return prev;
  }, []);
};

/**
 *
 * @param data
 * @param parentId
 * @description 判断是不是后代子孙
 */
export const isOffspring = (data, parentId) => {
  const flatData = flatTree(data);
  return flatData.some(item => item.parentId === parentId);
};


/**
 *
 * @param {*} data
 * @returns
 * 选中的数据data中有父级以及子级，如果有父级只取父级的数据，如果没有父级取当前的数据
 */
export const getSelectData = data => {
  console.log(data,'hhh')
  const children = [];
  const obj = {};

  data.map(item => {
    data.map((n, i) => {
      if (item.value === n.parent_value) {
        !obj[n.value] && children.push(n);
        obj[n.value] = true;
      }
    });
  });
  const newChildren = children.map(item => item.value);
  const newData = data.filter(item => !newChildren.includes(item.value) && item);
  return newData;
};