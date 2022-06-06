import React from "react";
import UploadCom from "./UploadCom";
import { Button, Input } from "antd";
import API_ROOT from "@/utils/config";
import { modifyUser, getUser } from "@/service/user";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

class UserCenter extends React.Component {
  state = {
    imageUrl: "",
  };
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));

    getUser({ userId: user.userId }).then((res) => {
      if (res && res.code === 1) {
        this.props.form &&
          this.props.form.setFieldsValue({
            ...res.result,
          });
        this.setState({
          imageUrl: `${API_ROOT}${res.result.avatar}`,
        });
      }
    });
  }

  handleModify = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        modifyUser({ ...values, userId: user.userId }).then((res) => {
          if (res && res.code === 1) {
            getUser({ userId: user.userId });
            this.setState({
              imageUrl: `${API_ROOT}${values.avatar}`,
            });
          }
        });
      }
    });
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { imageUrl } = this.state;
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
        <Form {...formItemLayout} onSubmit={this.handleModify}>
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
              rules: [{ required: true, message: "请上传头像" }],
            })(<UploadCom imageUrl={imageUrl} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create({})(UserCenter);
