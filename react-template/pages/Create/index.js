import React, { useEffect, useState } from "react";
import { Input, Select, Modal, Card, Spin, Row, Col, Button } from "antd";
import { connect } from "dva";
import { getMainCampaignId, getMainCampaignDetail } from "@/service/create";
import router from "umi/router";
import { Form } from "@ant-design/compatible";
const { Option } = Select;

@connect(({ campaign }) => ({
  campaign,
}))
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: "",
    };
  }
  async componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    if (!params.id) {
      getMainCampaignId().then((res) => {
        console.log(res, "dddres");
        if (res.code === 1) {
          this.setState({
            campaign_id: res.result.id,
          });
          this.props.form.setFieldsValue({
            campaign_id: res.result.id,
          });
        }
      });
    } else {
      await dispatch({
        type: "campaign/fetchCampaignDetail",
        payload: { id: params.id },
        callback: (data) => {
          const {
            campaign_id,
            cmc_campaign_year,
            campaign_name,
            campaign_en_name,
            cmc_campaign_business_sector,
          } = data;
          this.props.form.setFieldsValue({
            campaign_id,
            cmc_campaign_year,
            campaign_name,
            campaign_en_name,
            cmc_campaign_business_sector,
          });
        },
      });
    }
  }

  handleFinish = (e) => {
    e.preventDefault();

    const {
      dispatch,
      match: { params },
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = params.id
          ? { ...values, campaign_status: 9, id: params.id }
          : { ...values, campaign_status: 9 };
        dispatch({
          type: "campaign/addOrEditCampaign",
          payload: data,
        });
      }
    });
  };
  handleBelongChange = () => {};
  handleYearChange = () => {};
  handleCancel = () => {
    router.push("/dashboard/monitor");
  };
  handleSave = () => {
    const {
      dispatch,
      match: { params },
    } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = params.id
          ? { ...values, campaign_status: 8, id: params.id }
          : { ...values, campaign_status: 8 };
        dispatch({
          type: "campaign/addOrEditCampaign",
          payload: data,
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={false}>
        <Form layout="vertical" onSubmit={this.handleFinish}>
          <Card
            title="新建"
            bordered={false}
            style={{
              width: "100%",
              background: "#fff",
              borderBottom: "16px solid #f0f2f5",
            }}
          >
            <Form.Item label={"主ID"}>
              {getFieldDecorator("campaign_id", {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="text"
                  style={{
                    width: 220,
                    border: "none",
                    pointerEvents: "none",
                    cursor: "not-allowed",
                  }}
                />
              )}
            </Form.Item>
            <Row style={{ width: "100%" }}>
              <Col span={4}>
                <Form.Item
                  label={"year"}
                  style={{ marginRight: 8 }}
                  rules={[
                    {
                      required: true,
                      message: "请选择year",
                    },
                  ]}
                >
                  {getFieldDecorator("cmc_campaign_year", {
                    rules: [
                      {
                        required: true,
                        message: "请选择year",
                      },
                    ],
                  })(
                    <Select onChange={this.handleYearChange}>
                      <Option value={"2018"}>2018</Option>
                      <Option value={"2019"}>2019</Option>
                      <Option value={"2020"}>2020</Option>
                      <Option value={"2021"}>2021</Option>
                      <Option value={"2022"}>2022</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"belongTo"}>
                  {getFieldDecorator("cmc_campaign_business_sector", {
                    rules: [
                      {
                        required: true,
                        message: "请选择belongTo",
                      },
                    ],
                  })(
                    <Select onChange={this.handleBelongChange}>
                      <Option value={"lingyue"}>领悦</Option>
                      <Option value={"bmw"}>宝马</Option>
                      <Option value={"mini"}>迷你</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={"中文名称"}>
                  {getFieldDecorator("campaign_name", {
                    rules: [
                      {
                        required: true,
                        message: "请输入中文名称",
                      },
                    ],
                  })(<Input placeholder={"请输入中文名称"} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={"英文名称"}>
                  {getFieldDecorator("campaign_en_name", {
                    rules: [
                      {
                        required: true,
                        message: "请输入英文名称",
                      },
                    ],
                  })(<Input placeholder={"请输入英文名称"} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button onClick={this.handleCancel}>取消</Button>
                  <Button
                    onClick={this.handleSave}
                    type="primary"
                    style={{ margin: "0px 16px" }}
                  >
                    保存
                  </Button>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Spin>
    );
  }
}

export default Form.create({})(Create);
