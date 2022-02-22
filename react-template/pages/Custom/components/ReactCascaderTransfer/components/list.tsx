/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import ListItem from './listItem';
import '../less/list.less';
import { DataProps, ListProps } from '../interface';
import { isOffspring } from '../utils';

const List = (props: ListProps) => {
  // 渲染列(层)的数据源
  // 默认初始化时不展开，只展示第一层数据
  // listItems[0] 对应第一层数据
  // listItems[1] 对应当前展开的第二层数据
  // listItems[2] 对应当前展开的第三层数据
  // ...
  const [listItems, setListItems] = useState([[]]);

  const { width, onChange, handleOnExpand } = props;

  // 每列宽度
  const itemWidth = width ? ~~width : 250;
  // 列头名称数组
  const titles = props.titles || [];

  // 初始化渲染左侧list，避免重复渲染
  // init render left list, avoid render repeat
  useEffect(() => {
    if (JSON.stringify(props.dataSource) === JSON.stringify(listItems[0])) {
      return;
    }
    // if (!props.dataSource.length || listItems[0].length) {
    //   return;
    // }
    setListItems([props.dataSource]);
  }, [props.dataSource]);

  // checkbox改变触发，需要重新渲染进而实时展示checkbox状态
  const handleChange = (rowData: DataProps, checked: boolean) => {
    onChange(rowData, checked, rowData.level, rowData.parentId);
  };

  // 点击一行触发，如果有子数据，则展开
  const handleExpand = async (e: any, rowData: DataProps) => {
    /** 当前被点击层的层级 */
    const level = rowData.level || 0;
    /** 目前已经展开的最后一层的parentId */
    const currentHasExpandLastParentId = listItems.slice(-1)[0][1].parentId;
    // console.log(currentHasExpandLastParentId,'currentHasExpandLastParentId')
    // /** 判断已经展开的最后一层数据，是不是当前被点击层的后代 */
    // /** Determine whether the last layer of data that has been expanded is a descendant of the currently clicked layer */
    const isCurrRowOffspring = isOffspring(rowData.children, currentHasExpandLastParentId);
    // // 其子级已经展开，需要考虑直辖市这种特殊数据
    // // the child of the current click row has been expand
    if (isCurrRowOffspring && (!rowData.children || !rowData.children.length)) {
      return;
    }

    await setListItems([...listItems.slice(0, level + 1), rowData.children]);
    const newListItems = [...listItems.slice(0, level + 1), rowData.children];

    handleOnExpand(newListItems);
  };
  // 渲染树
  const handleRender = (titlesData: string[], data: Array<DataProps[]>) => {
    return titlesData.map((item, i) => {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <ListItem
          key={i}
          title={item}
          // width={itemWidth}
          width={!width || !Array.isArray(width) ? itemWidth : Number(width[i])}
          itemDataSource={data[i] ? data[i] : []}
          onChange={handleChange}
          onExpand={handleExpand}
          titles={titles}
        />
      );
    });
  };
// 计算父级宽度
  const newListWidth =
    !width || !Array.isArray(width)
      ? titles.length * itemWidth
      : width.reduce((prev, next) => {
          const newNext = Number(next);
          return Number(prev) + newNext;
        }, 0);

  return (
    <div className="rct-flex rct-list rct-radius" style={{ width: `${newListWidth}px` }}>
      {props.dataSource.length > 0 && handleRender(titles, listItems)}
    </div>
  );
};

export default List;
