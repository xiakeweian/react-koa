import React from "react";
import UploadCom from "./UploadCom";
import { Button, Form, Input } from "antd";

class UserCenter extends React.Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.form.setFieldsValue(user);
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div style={{ width: 500, marginTop: 20 }}>
        <Form {...formItemLayout}>
          <Form.Item label="用户名">
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入你的用户名!" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入你的邮箱" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="昵称">
            {getFieldDecorator("nickname", {
              rules: [{ required: true, message: "请输入你的昵称" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="头像">
            {getFieldDecorator("avatar", {
              rules: [{ required: true, message: "请输入你的昵称" }],
            })(<UploadCom />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary">修改</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create({})(UserCenter);
