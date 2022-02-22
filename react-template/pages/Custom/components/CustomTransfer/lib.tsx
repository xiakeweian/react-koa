// 根据同一字段分组
const toGroupByField = (data) => {
    const map = {};
      const dest = [];
    for (let i = 0; i < data.length; i++) {
      const ai = data[i];
  
      if (!map[ai.groupName]) {
        if (ai.key === '') return
        dest.push({
          groupName: ai.groupName,
          children: [{ disabled: false, checked: false, ...ai }],
        });
        map[ai.groupName] = ai;
      } else {
        for (let j = 0; j < dest.length; j++) {
          const dj = dest[j];
          if (dj.groupName == ai.groupName) {
            dj.children.push({ disabled: false, checked: false, ...ai });
            break;
          }
        }
      }
    }
    return dest;
  };
  /**
 * 
 * @param {*} list 原数组
 * @param {*} uid 唯一识别字段
 * 对象数组根据某个唯一uid/字段去重
 */
const uniqArrObj = (list, uid) => {
    const obj = {}; let newArr = []
    newArr = list && !!list.length && list.reduce((prev, cur) => {
      obj[cur[`${uid}`]] ? '' : (obj[cur[`${uid}`]] = true && prev.push(cur))
      return prev
    }, []) || []
    return newArr
  
  }

  export default {
    toGroupByField,
    uniqArrObj
  }