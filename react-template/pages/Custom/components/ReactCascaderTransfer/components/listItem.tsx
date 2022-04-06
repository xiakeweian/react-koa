import React, { useEffect, useState } from "react";
import { Checkbox, Empty, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "../less/listItem.less";
import { formatMessage } from "umi/locale";
import { DataProps, ListItemProps } from "../interface";
import { flatTree } from "../utils";

const ListItem = (props: ListItemProps) => {
  const { title, width, disabled, itemDataSource, onChange, onExpand } = props;
  const [curSelectData, setCurSelectData] = React.useState<number | string>();

  // checkbox变化触发
  const handleOnChange = (e: any, rowData: DataProps) => {
    // eslint-disable-next-line no-unused-expressions
    onChange && onChange(rowData, e.target.checked);
  };

  // 点击一行触发，如果有子数据，则展开
  const handleExpand = (e: any, rowData: DataProps) => {
    setCurSelectData(rowData.value);
    if (
      rowData.children &&
      rowData.children.length &&
      e.target.type !== "checkbox" &&
      onExpand
    ) {
      onExpand(e, rowData);
    }
  };

  // 本身的状态要看子孙的状态决定，子孙中有选中的和未选中的，他的状态就是indeterminate，子孙中全部选中，状态时checked,子孙中全不选中状态时unchecked
  const indeterminate = (rowData: DataProps) => {
    // 如果全选的不是0级，则0级别的有被选中
    if (rowData.value === "all-0-0") {
      const isTopLevelIndeterminate = flatTree(itemDataSource)
        .filter((item: DataProps) => item.label !== "全选" && item)
        .some((item: DataProps) => item.checked === true);
      const isTopLevelIndeterminate2 = flatTree(itemDataSource)
        .filter((item: DataProps) => item.label !== "全选" && item)
        .every((item: DataProps) => item.checked === true);

      if (isTopLevelIndeterminate2) {
        return false;
      }
      if (isTopLevelIndeterminate) {
        return true;
      }
      return false;
    }

    if (rowData.label === "全选") {
      const flatData = flatTree(itemDataSource);

      const aa = flatData.filter(
        (item) =>
          item.level === rowData.level &&
          item.parent_value === rowData.prevParent &&
          item.value !== rowData.value
      );

      const bb = flatTree(aa).filter((item) => item.label !== "全选");
      const isIndeterminate =
        !bb.every((item) => item.checked === true) &&
        !bb.every((item) => item.checked === false);
      return isIndeterminate;
    }
    if (rowData.children && !!rowData.children.length) {
      const flatChildrenData = flatTree(rowData.children);

      const isIndeterminate =
        flatChildrenData.some((item: DataProps) => item.checked === true) &&
        flatChildrenData.some((item: DataProps) => item.checked === false);
      return isIndeterminate;
    }
  };
  // 每行渲染的内容
  // every row render
  const rowContent = (rowData: DataProps, key) => {
    const active = curSelectData === rowData.value ? "rct-active" : "";

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <span
        className={`rct-flex rct-space-between rct-pointer rct-item-row ${active}`}
        key={`${rowData.value}-${key}`}
        onClick={(e) => handleExpand(e, rowData)}
      >
        <span className="rct-flex">
          <Checkbox
            className="rct-checkbox"
            checked={rowData.checked}
            onChange={(e) => handleOnChange(e, rowData)}
            indeterminate={indeterminate(rowData)}
          />
          <span className="rct-label">
            {rowData.label === "全选"
              ? formatMessage({ id: "custom.cascaderTransfer.all" })
              : rowData.label}
          </span>
        </span>
        {rowData.children && rowData.children.length ? (
          <RightOutlined
            className="rct-pointer rct-left"
            style={{ fontSize: 12 }}
          />
        ) : null}
      </span>
    );
  };

  // 有数据的listItem
  const listItemWithData = (
    <div>
      <div className="rct-title">{title}</div>
      <div
        style={{ overflowY: "auto", height: 370 }}
        className={
          itemDataSource && itemDataSource.length <= 0
            ? "rtc-empty-content"
            : "rtc-content"
        }
      >
        {(itemDataSource &&
          !!itemDataSource.length &&
          itemDataSource.map((item, i) => rowContent(item, i))) || (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );

  return (
    <div className="rct-flex-1 rct-item" style={{ width: `${width}px` }}>
      {listItemWithData}
    </div>
  );
};

export default ListItem;
