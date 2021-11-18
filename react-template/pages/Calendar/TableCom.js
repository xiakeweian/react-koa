import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";

const TableCom = (props) => {
  const {
    title,
    data: { list, pagination },
    onChange,
  } = props;
  const columns = [
    {
      title: "活动ID",
      dataIndex: "cmc_campaign_id",
    },
    {
      title: "活动名称",
      dataIndex: "campaign_name",
    },
    {
      title: "活动开始时间",
      dataIndex: "cmc_campaign_modify_time",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "品牌",
      dataIndex: "brand_name",
    },
    {
      title: "创建人",
      dataIndex: "created_by",
    },
  ];
  const showSizeChange = (page) => {
    console.log(page, "dsdpage");
  };

  return (
    <>
      <h3 style={{ marginBottom: "16px" }}>{title}</h3>
      <Table
        dataSource={list}
        columns={columns}
        pagination={{
          ...pagination,
          pageSize: pagination.size,
          showSizeChanger: true,
          showQuickJumper: true,
          size: "small",
          pageSizeOptions: [5, 10, 20, 50, 100],
        }}
        onChange={onChange}
        onShowSizeChange={showSizeChange}
      />
    </>
  );
};
export default TableCom;
