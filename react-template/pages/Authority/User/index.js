/*
 * @Author: wuyanxia
 * @Date: 2021-11-11 18:53:17
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2021-11-25 10:14:49
 */
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { connect } from "dva";
import API_ROOT from "@/utils/config";
import { downloadImg } from "@/service/user";
const User = (props) => {
  const {
    user: {
      userData: { list, pagination },
    },
    dispatch,
  } = props;
  const download = (url) => {
    console.log(url, "ddd");
    // downloadImg({ url });

    window.open("http://localhost:3000/download/userImg?url=" + url, "_blank");
  };

  const columns = [
    {
      title: "用户ID",
      dataIndex: "userId",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      render: (text, record) => {
        return (
          <img
            src={`${API_ROOT}${text}`}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              cursor: "pointer",
            }}
            onClick={() => download(text)}
          />
        );
      },
    },
  ];
  const showSizeChange = (page) => {
    console.log(page, "dsdpage");
  };
  useEffect(() => {
    dispatch({ type: "user/fetchList", payload: { size: 10, current: 1 } });
  }, []);

  return (
    <>
      <Table
        dataSource={list}
        columns={columns}
        pagination={{
          ...pagination,
          pageSize: pagination.size,
          showSizeChanger: true,
          showQuickJumper: true,
          size: "small",
          pageSizeOptions: [10, 20, 50, 100],
        }}
        // onChange={onChange}
        onShowSizeChange={showSizeChange}
      />
    </>
  );
};
export default connect(({ user }) => ({ user }))(User);
