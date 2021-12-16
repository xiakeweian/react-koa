import React, { useEffect } from "react";
import { Button, Table, Input, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { downloadList } from "@/service/file";
import { connect } from "dva";
import moment from "moment";
import styles from "./index.less";

const File = (props) => {
  const {
    dispatch,
    file: { data },
  } = props;
  useEffect(() => {
    dispatch({
      type: "file/fetchFileList",
      payload: { size: 10, current: 1 },
    });
  }, []);
  const onSearch = () => {};
  const handleTableChange = () => {};

  //导出列表
  const download = () => {
    downloadList();
    // window.open("http://localhost:3000/download/file-list", "_blank");
  };
  //下载文件
  const downloadFile = () => {};
  //删除文件
  const deleteFile = (record) => {};
  const column = [
    {
      title: "文件id",
      dataIndex: "id",
      width: 200,
      ellipsis: true,
    },
    {
      title: "文件名称",
      dataIndex: "file_name",
      // render: (text, record) => {
      //   return <a onClick={() => downloadFile(text)}>{text}</a>;
      // },
    },
    {
      title: "文件更新时间",
      dataIndex: "update_time",
      width: 200,
      ellipsis: true,
      render: (text) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "文件所属",
      dataIndex: "file_owner",
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => deleteFile(record)}>
            删除
          </Button>
        );
      },
    },
  ];
  const uploadProps = {
    name: "file",
    action: "http://localhost:3000/file/upload",
    accept: ".xlsx,.xls,.docx,.doc,.pdf,.pptx,.png,.jpeg,.jpg,.mp4,.mov",
    method: "post",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(info.file, "llll");
        message.success(`${info.file.name} file uploaded successfully`);
        dispatch({
          type: "file/fetchFileList",
          payload: { size: 10, current: 1 },
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "16px",
        }}
      >
        <Input.Search style={{ width: 200 }} onSearch={onSearch} allowClear />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Upload {...uploadProps} className={styles.fileUpload}>
            <Button
              // icon={<UploadOutlined />}
              style={{ marginRight: 16 }}
              type="primary"
            >
              上传文件
            </Button>
          </Upload>

          <Button type="primary" onClick={download}>
            导出列表
          </Button>
        </div>
      </div>

      <Table
        dataSource={data.list}
        style={{ margin: "0px 16px" }}
        columns={column}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          ...data.pagination,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};
export default connect(({ file }) => ({ file }))(File);
