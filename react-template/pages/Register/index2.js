import { Form, Icon, Input, Button, Checkbox, Message } from "antd";
import { connect } from "dva";
import router from "umi/router";
import styles from "./index.css";

const FormItem = Form.Item;

@connect(({ register }) => ({
  register,
}))
class NormalRegisterForm extends React.Component {
  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = { account: values.username, password: values.password };
        dispatch({
          type: "register/fetchRegister",
          payload: obj,
          callback: (res) => {
            if (res.code === 1) {
              Message.success(res.msg);
              // sessionStorage.setItem("token", res.data.userId);
              router.push("/login");
            } else {
              Message.warning(res.msg);
            }
          },
        });
      } else {
        sessionStorage.setItem("token", "");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.loginBox}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <h3>Management Center</h3>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入你的用户名!" }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入你的密码!" }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default WrappedNormalRegisterForm;
