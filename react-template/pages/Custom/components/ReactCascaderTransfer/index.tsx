/* eslint-disable no-throw-literal */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import Selected from './components/selected';
import List from './components/list';
import { DataProps, CascaderTransferProps } from './interface';
import './less/base.less';
import { flatTree,getSelectData } from './utils';
import { Item } from 'rc-menu';

const ReactCascaderTransfer = (props: CascaderTransferProps) => {
  const [selected, setSelected] = useState<DataProps[]>([]);
  const [value, setValue] = useState<Array<number | string>>(props.value);
  const [dataSource, setDataSource] = useState<DataProps[]>([]); // 数据源
  const { width, selectedWidth, titles, onChange } = props;
  const [expandData, setExpandData] = useState<DataProps[][]>();

  /**
   *
   * @param data
   * @param level 层级，第一级为0，第二级为1，依次累加
   * @description 对数据源进行改变,增加level字段,以及判断是否有parentId，没有的话增加
   *              从第二层开始检测有没有parentId，没有的话，将上层value作为该层parentId
   */
  const changeData = (
    data: DataProps[],
    level: number,
    parentId?: number | string,
    rootValue?: number | string
  ) => {
    const newData = data.map((item: DataProps) => {
      const parent_id = parentId || null; // 父节点parentId
      const root_value = level === 0 ? item.value : rootValue; // 该节点最顶层根节点的value
      const children =
        !item.children || item.children.length === 0
          ? null
          : changeData(item.children, level + 1, item.value, root_value);

      return Object.assign(item, {
        level,
        parentId: parent_id,
        children,
        checked: false,
        rootValue: root_value,
      });
    });
    if (newData[0].label !== '全选') {
      newData.unshift({
        level,
        parentId: null,
        children: null,
        checked: false,
        rootValue,
        label: '全选',
        value: rootValue ? `all-${level}-${rootValue}-${parentId}` : `all-${level}-0`,
        prevParent: parentId,
      });
    }

    return newData;
  };

  // 设置当前节点及其子孙节点选中
  // 如果当前节点以及兄弟节点都没有被选中，设置当前节点还要设置和当前节点同级的全选的节点
  const handleSetChecked = (target: DataProps, checked: boolean) => {
    if (!target) return;
    // eslint-disable-next-line no-param-reassign
    target.checked = checked;
    const children = flatTree(target.children || []);
    children.forEach((item: DataProps, index: number) => {
      children[index].checked = checked;
      // eslint-disable-next-line no-unused-expressions
      item.children && handleSetChecked(children[index], checked);
    });
    return children;
  };

  // 只在初始化时将数据源转为需要的格式，只执行一次
  // change data structure when init. only excute once
  useEffect(() => {
    if (Object.prototype.toString.call(props.dataSource) !== '[object Array]') {
      throw '请传入符合要求的数据源数组';
    }
    setDataSource(changeData(props.dataSource, 0));
  }, [props.dataSource]);

  // 只在初始化时执行一次
  // 初始化改造完数据结构后，如果存在已选数据，则需要初始化右侧已选面板数据
  // 先平铺数据源，再找到已选的数据，注意过滤不存在的数据；同时设置左侧checkbox选中状态
  // 如果存在子节点，不要忘了设置子节点的选中状态
  // only excute when initial.
  // after init change data structure, if there are some selected data,
  // flat the dataSource, find all the initial selected data and filter the undefined. (if exist)
  // set the corresponding left checkbox checked
  useEffect(() => {

    if (!dataSource.length || !props.value.length) {
      const flatDataSource = flatTree(dataSource);
      flatDataSource.map((item) => {
        handleSetChecked(item, false);
      })
      setValue([]);
      setSelected([]);
      return;
    }
   
    // 初始化的时候，要看看子节点是否全被选中，如果全被选中，只需传他本身的value，如果子节点只是选中部分，则要把自己设置成不选择的状态
    const flatDataSource = flatTree(dataSource);
    flatDataSource.map((item) => {
      handleSetChecked(item, false);
    })
    
    const selectedArr = props.value
      .map((val: string | number) => {
        const selectedItem = flatDataSource.find((dataItem: DataProps) => dataItem.value === val);
        const curData = flatDataSource.find(item => item.value === val);
        if(!curData) return
        const {level} = curData;
        const curLevelAllData = flatDataSource.filter(item => item.level === level);
        handleSetChecked(selectedItem, true);
  
        const curLevelIsAllChecked = curLevelAllData.slice(1).every(item => item.checked === true);
        if (curLevelIsAllChecked) {
          handleSetChecked(curLevelAllData[0], true);
        }

        return selectedItem;
      })
      .filter((dataItem: DataProps) => !!dataItem);
console.log(selectedArr,'selectedArr')
    setValue(props.value);
    setSelected(selectedArr);
    setDataSource(dataSource);
  }, [dataSource, props.value]);

  const switchChangeData = (newSelected, newValues) => {
    const newSelectedData = newSelected.filter(item => item.label !== '全选' && item);
    const newValuesData = newValues.filter(item => item.indexOf('all') <= -1 && item);

    onChange(newSelectedData, newValuesData);
  };




  // 左侧改变checkbox，导致右侧已选变化
  // 存在以下可能（假设当前节点为 n，父节点即上一层节点为 p）：
  // 1. 改变其选中状态，不会改变其父节点的选中状态（第一级没有父节点），只需简单的将该行添加到右侧已选
  // 2. 改变其选中状态，会改变其父节点的选中状态：
  //    2.1 选中，设置所有子孙节点为 **选中状态**，向上寻找，
  //        2.1.1 由于选中导致其 **父节点 p** 也被选中，但是父节点的其他兄弟节点存在未被选中的，
  //              把该 **父节点 p** 数据添加到右侧已选数据，从右侧已选数据中删除 **父节点 p** 下的所有子孙节点
  //        2.1.2 由于选中导致其 **父节点 p** 也被选中，同时父节点的其他兄弟节点都被选中的，那么继续向上寻找，
  //              直到出现 2.1.1 情况 或 到达第一级（最顶层）
  //    2.2 取消选中，设置其子节点为 **未选中状态** 向上寻找，
  //        2.2.1 由于取消选中导致其父节点也取消选中，其父节点兄弟节点存在未被选中的，从已选数据中删除该 **父节点 p** 数据，
  //              把 **该节点 n** 同级的兄弟节点添加到已选数据中
  //        2.2.2 由于取消选中导致其父节点也取消选中，同时其父节点兄弟节点都被选中，那么继续向上寻找，
  //              直到出现 2.2.1 情况 或 到达第一级（最顶层）
  // change left checkbox, right selected change together
  const handleOnChange = (
    rowData: DataProps,
    checked: boolean,
    initLevel: number,
    initParentId?: number | string
  ) => {
    // 如果选中的level === 0 ，全选，或全不选，如果选中的不是level，全选会影响父级以及与父级同等级的全选checkbox的状态
    if (rowData.level === 0 && rowData.label === '全选') {
      const oldSelected = selected;
      let newValues = [];
      let newSelected = [];
      const {level} = rowData;
      const {rootValue} = rowData;
      const flatSameRootData = flatTree(dataSource);
      if (checked) {
        newSelected = flatSameRootData
          .filter((item: DataProps) => item.level === 0)
          .map((item: DataProps) => ({ ...item, checked }));
        newValues = newSelected.map(item => item.value);

        newSelected.map(item => {
          handleSetChecked(item, checked);
          return item;
        });
      } else {
        newSelected = [];
        newValues = [];
      }
      for (let i = 0; i < flatSameRootData.length; i++) {
        flatSameRootData[i].checked = checked;
      }
      setSelected(newSelected);
      setValue(newValues);
      switchChangeData(newSelected, newValues);

      return;
    }
    if (rowData.level !== 0 && rowData.label === '全选') {
      // 全选，当前同等级的都被选中，同时当前的父级也被选中
      console.log(rowData,'rowData')
     

      let newValues:any = [];
      let newSelected:any = [];
      const flatSameRootData = flatTree(dataSource);

      const expandDataChildren = expandData[rowData.level];

      const parentData = flatSameRootData.filter((item) => item.value === rowData.prevParent)

      const commonLevelData = flatTree(expandDataChildren).filter(
        (item: DataProps) => item.level === rowData.level
      );
    
      const commonLevelParent = commonLevelData[1];
      const commonLevelParentValue = commonLevelParent.parentId;
      // console.log(expandDataChildren,commonLevelData,commonLevelParent,commonLevelParentValue,'llllll')
      // 全选先被选中，然后其他兄弟节点全部被选中，然后遍历全部数据，当前节点的children全部被选中的话，当前节点也被选中
      console.log(parentData,commonLevelData,commonLevelParent,commonLevelParentValue,'kkk')
      new Promise((resolve, reject) => {
        flatSameRootData.map(data => {
          if (data.value === rowData.value) {
            commonLevelData.map(item => {
              handleSetChecked(item, checked);
            });
          } else {
            return data;
          }
        });
        resolve(true);
      })
        .then(res => {
          flatSameRootData.map(item => {
            if (item && item.children && !!item.children.length) {
              if (item.value === commonLevelParentValue) {
                // 被点击的全选同级数据
                const isChildrenCheckedAll = item.children.every(child => child.checked === true);

                // 被点击的全选上一级的数据
                const prevLevelData = flatSameRootData.filter(
                  unit => unit.level === item.level && item.rootValue === unit.rootValue
                );

                // 被点击全选的上一级数据的全选
                const commonLevelAllData = prevLevelData[0];
                const highestLevelNode = flatSameRootData.filter(
                  (data: DataProps) => data.value === rowData.rootValue
                )[0];

                if (isChildrenCheckedAll) {
                  handleSetChecked(item, isChildrenCheckedAll);

                  // 被点击的全选上一级的数据是否全选
                  const isParentCheckedAll = prevLevelData
                    .slice(1)
                    .every(data => data.checked === true);

                  if (isParentCheckedAll) {
                    handleSetChecked(commonLevelAllData, isChildrenCheckedAll);
                    handleSetChecked(highestLevelNode, isChildrenCheckedAll);
                  } else {
                    handleSetChecked(commonLevelAllData, isParentCheckedAll);
                  }
                } else {
                  const topData = flatSameRootData.filter(item => item.level === 0);
                  const topDataAll = topData.find(item => item.value.indexOf('all') > -1);
                  // console.log('coming',topDataAll,item,highestLevelNode,commonLevelAllData)
                  handleSetChecked(topDataAll, false);
                  handleSetChecked(item, false);
                  handleSetChecked(commonLevelAllData, false);
                  handleSetChecked(highestLevelNode, false);
                  
                  // 如果取消会影响祖先元素，则也会影响上级节点的兄弟节点，如果不影响祖先元素，则也不会影响上级节点的兄弟节点
                  // 是否影响祖先元素，决定取消选中是否影响上级节点的兄弟节点
                  const prevParentSiblings = highestLevelNode.children.slice(1).filter((chi) => chi.value !== rowData.prevParent)
                  const prevParentSiblings2 = flatSameRootData.filter((item) => item.parentId === parentData[0].parentId) 

                  const b = prevParentSiblings2.slice(1).filter((item) => item.value !== parentData[0].value)
               
      
                  // 1.父节点的兄弟节点已全部被选中；取消会影响父组件，将兄弟节点都取出来，取消当前级别全选，不能影响父级兄弟节点的选中状态
                  // 2.父节点的兄弟节点已部分被选中；取消不会影响父组件，将兄弟节点都取出来，取消当前级别全选，不能影响父级兄弟节点的选中状态

                  // 选中数据中是否包含rootValue，如果包含，取消的时候父节点的兄弟节点保留选中状态，选中数据不包含rootValue,取消的时候父级兄弟节点不受影响

                  const prevParentSiblingsChildren  = []
                
                  b.map((sib) => {
                    sib.children && prevParentSiblingsChildren.push(...sib.children)
                  })

                 const isTrue =  prevParentSiblings.some((sib) => value.includes(sib.parentId))
           
                 if(rowData.level > 1) {
                  if(isTrue){
                    prevParentSiblings.map((sibling) => {
                      handleSetChecked(sibling,  true);
                    })
  
                   }else {
                    prevParentSiblings.map((sibling) => {
                      handleSetChecked(sibling,  value.includes(sibling.value));
                    })
                   }
                   // 取消选中，每个父级兄弟节点的子节点的选中的情况根据具体选中内容决定
                   prevParentSiblingsChildren.map((chi) => {
                    handleSetChecked(chi,  value.includes(chi.value));
                   })
                 }
                 
                }
              }
            } else {
              return item;
            }
          });

          newSelected = flatSameRootData.filter(item => item.checked === true);
          newSelected =  getSelectData(newSelected);
          console.log(newSelected,'newSelected')

          newValues = newSelected?.map(item => item.value);

        })
        .then(() => {
          setSelected(newSelected);
          setValue(newValues);
          switchChangeData(newSelected, newValues);
        });

      return;
    }

    const oldSelected = selected;
    let newValues = [];
    let newSelected = [];
    const {level} = rowData;
    const {rootValue} = rowData;

    // 平铺对应根节点的数据源
    // flat the top level node data which the rootValue equal the target rowData's rootValue
    const flatSameRootData = flatTree(
      dataSource.filter((data: DataProps) => data.rootValue === rootValue)
    );

    // 切换顶级节点的checkbox
    // change the top level checkbox
    if (level === 0) {
      // 由于 flatTree 内部使用的是 push，从根节点触发时始终保证根节点为第一个元素
      // inside the flatTree, the push was applying to ensure the top level node alaways in the index 0.
      const root = flatSameRootData[0];

      // 说明点击的目标节点就是顶级根节点，不是通过递归上来的
      // the target is not reached by recursion
      if (initLevel === 0) {
        for (let i = 0; i < flatSameRootData.length; i++) {
          flatSameRootData[i].checked = checked;
        }
      }

      const flatData = flatTree(dataSource);
      // 全选的状态由同level的数据来决定，如果同level全部选择全选为选中状态(true)，如果选中部分，或者全部不被选中则为false
      const currentAllChecked = flatData.filter(
        (data: DataProps) => data.level === rowData.level && data.label === '全选'
      );

      const sblingsData = flatSameRootData.filter(
        (data: DataProps) =>
          data.level === rowData.level &&
          data.parentId === rowData.parentId &&
          data.value !== rowData.value
      );

      const curCommonLevelData = sblingsData.concat(rowData);
      // 同级别数据全选为true, 不全选为false
      const isCommonLevelTrue = curCommonLevelData.every(data => data.checked === true);
      if (isCommonLevelTrue) {
        handleSetChecked(currentAllChecked[0], true);
      } else {
        handleSetChecked(currentAllChecked[0], false);
      }

      // 先过滤出非该根节点下的数据
      newSelected = oldSelected.filter((data: DataProps) => {
        if (data.rootValue !== rootValue) {
          newValues.push(data.value);
          return true;
        }
        return false;
      });
      // 选中，不论是递归到顶部还是点击顶部设置选中状态
      if (checked) {
        newSelected.push(root);
        newValues.push(root.value);
      }

      // 递归到顶部，且取消选中
      // if reached by recursion, need add the checked offspring
      if (!checked && initLevel !== 0) {
        flatSameRootData.forEach(item => {
          if (item.checked && (item.level === root.level + 1 || item.parentId === initParentId)) {
            newSelected.push(item);
            newValues.push(item.value);
          }
        });
      }

      setSelected(newSelected);
      setValue(newValues);
      switchChangeData(newSelected, newValues);
      return;
    }

    // 值相同的节点其选中状态必须相同，值相同只可能是几个节点间连续继承，且在它们的层级上是唯一存在的节点，没有兄弟节点
    // filter the same value node, the index 0 is the highest level node in these nodes
    const highestLevelNode = flatSameRootData.filter(
      (data: DataProps) => data.value === rowData.value
    )[0];
    const commonLevelData = flatSameRootData.filter((data: DataProps) => data.level === highestLevelNode.level && data.parentId === highestLevelNode.parentId && data.value !== highestLevelNode.value && data.label !=='全选') || []

    // 拿到 highestLevelNode 的兄弟节点，如果兄弟节点选中状态不一致，则不影响祖先节点
    // 如果所有的兄弟节点都是选中状态，则会影响父节点；否则不会
    // get the highest level node's brother nodes,
    // if the brothers has different checked state, do not effect parent
    // if the brother nodes are all checked, effect parent
    const isEffectParent = commonLevelData.every((data: DataProps) => data.checked === true)

    // 全选的状态由同level的数据来决定，如果同level全部选择全选为选中状态(true)，如果选中部分，或者全部不被选中则为false
    const currentAllChecked = flatSameRootData.filter(
      (data: DataProps) =>
        data.level === highestLevelNode.level &&
        data.label === '全选' &&
        data.rootValue === highestLevelNode.rootValue && data.prevParent === highestLevelNode.parentId
    );
    // 影响父节点，注意根节点（顶级）没有父节点
    if (isEffectParent) {
      const parent =
        flatSameRootData.find(
          (data: DataProps) =>
            data.value === highestLevelNode.parentId && data.level === highestLevelNode.level - 1
        ) || highestLevelNode;
      parent.checked = checked;
      // 确保只设置第一次点击目标节点及其子孙节点的选中状态
      // ensure to set the clicked(the first one) target node and its offspring checked state
      initLevel === rowData.level && handleSetChecked(highestLevelNode, checked);
      currentAllChecked &&
        !!currentAllChecked.length &&
        handleSetChecked(currentAllChecked[0], checked);
      handleOnChange(parent, checked, initLevel, initParentId);

      return;
    }

    // 不影响父节点，但会影响子孙节点，如果是选中的话要过滤已选中的子孙节点
    // do not effect parent node, but can effect offspring node, if checked, filter the selected offspring node
    initLevel === rowData.level && handleSetChecked(highestLevelNode, checked);
    const flatHighestLevelNode = flatTree([highestLevelNode]);
    if (checked) {
      newSelected = oldSelected.filter((data: DataProps) =>
        flatHighestLevelNode.every((item: DataProps) => data.value !== item.value)
      );
      newValues = value.filter((val: number | string) =>
        flatHighestLevelNode.every((item: DataProps) => val !== item.value)
      );
      newSelected.push(highestLevelNode);
      newValues.push(highestLevelNode.value);
    } else {
      newSelected = oldSelected.filter(
        (data: DataProps) =>
          data.value !== highestLevelNode.value && data.value.indexOf('all') <= -1
      );
      newValues = value.filter(
        (val: number | string) => val !== highestLevelNode.value && val.indexOf('all') <= -1
      );

      // 递归过来的
      if (initLevel !== rowData.level) {
        flatHighestLevelNode.forEach(item => {
          if (
            item.checked &&
            (item.level === highestLevelNode.level || item.parentId === initParentId)
          ) {
            newSelected.push(item);
            newValues.push(item.value);
          }
        });
      }
    }
    setSelected(newSelected);
    setValue(newValues);
    switchChangeData(newSelected, newValues);
  };

  // 右侧已选删除，将数据对应的节点及其所有子孙节点全部设为未选中状态
  // remove right selected
  const handleOnDelete = (val: number | string) => {
    let targetIndex = -1;
    const newValue = value.filter((v: number | string) => v !== val);
    const newSelected = selected.filter((item: DataProps, index) => {
      if (item.value === val) {
        targetIndex = index;
      }
      return item.value !== val;
    });
    const target = selected[targetIndex];
    handleSetChecked(target, false);
    setValue(newValue);
    setSelected(newSelected);
    onChange(newSelected, newValue);
  };
  /**
   *
   */
  const onExpand = (listItems: DataProps[][]) => {
    setExpandData(listItems);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="rct-flex">
      <List
        dataSource={dataSource || []}
        width={width}
        titles={titles}
        selected={selected}
        onChange={handleOnChange}
        handleOnExpand={onExpand}
      />
      {/* <Selected
        selectedWidth={selectedWidth || 150}
        selected={selected}
        onDelete={handleOnDelete}
      /> */}
    </div>
  );
};

export default ReactCascaderTransfer;
