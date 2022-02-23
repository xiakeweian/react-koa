import router from "umi/router";
import { Button, Input, Table, Divider, message } from "antd";
import React, { useEffect } from "react";
import { connect } from "dva";
import { deleteCampaign } from "@/service/campaign";

const monitor = (props) => {
  const { dispatch, campaignData } = props;
  const { data, pagination } = campaignData;
  useEffect(() => {
    dispatch({ type: "campaign/fetchList", payload: { current: 1, size: 10 } });
  }, []);
  const onSearch = (value) => {
    dispatch({
      type: "campaign/fetchList",
      payload: {
        search: value,
        size: pagination.size,
        current: 1,
      },
    });
  };
  const handleDelete = (record) => {
    deleteCampaign({ id: record.id }).then((res) => {
      if (res.code === 1) {
        message.success(res.msg);
        dispatch({
          type: "campaign/fetchList",
          payload: {
            size: pagination.size,
            current: 1,
          },
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  const columns = [
    {
      dataIndex: "campaign_id",
      title: "ID",
    },
    {
      dataIndex: "campaign_name",
      title: "Name",
    },
    {
      dataIndex: "campaign_status",
      title: "Status",
      render: (text, record) => {
        const status = {
          8: "待发布",
          9: "已发布",
        };
        return status[text];
      },
    },
    {
      dataIndex: "created_by",
      title: "created by",
    },
    {
      dataIndex: "cmc_campaign_business_sector",
      title: "belongTo",
    },
    {
      dataIndex: "team",
      title: "Team",
    },
    {
      dataIndex: "child_activity_count",
      title: "subCamCount",
    },
    {
      dataIndex: "modify_time",
      title: "modify_time",
    },
    {
      title: "Operation",
      render: (record) => {
        return (
          <>
            <a onClick={() => handleDelete(record)}>删除</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                router.push(`/edit/${record._id}`);
              }}
            >
              修改
            </a>
          </>
        );
      },
    },
  ];
  const handleTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: "campaign/fetchList",
      payload: {
        size: pagination.pageSize,
        current: pagination.current,
      },
    });
  };
  return (
    <div style={{ margin: 16 }}>
      <h1>主列表</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "16px",
        }}
      >
        <Input.Search style={{ width: 200 }} onSearch={onSearch} allowClear />
        <Button
          type="primary"
          onClick={() => {
            router.push("/create");
          }}
        >
          新建
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          ...pagination,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default connect(({ campaign: { campaignData, campaign_detail } }) => ({
  campaignData,
  campaign_detail,
}))(monitor);
