import { Component } from "react";
import { Layout, Icon, message } from "antd";
import router from "umi/router";
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData } from "../common/menu";
import logo from "../assets/logo.webp";
import GlobalHeader from "../components/GlobalHeader";
import Login from "../pages/Login";
import styles from "./index.css";

const { Content, Header, Footer } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentWillMount() {
    //根据token和hash值对登陆状态进行拦截
    const token = sessionStorage.token;
    const { hash } = location;
    console.log("token值为", token);
    if (!token && hash != "#/login") {
      router.push("/login");
    }
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick = (e) => {
    console.log(e, "ddddd");
    if (e.key === "user") {
      router.push("/user-center");
    } else if (e.key === "logout") {
      router.push("/login");
      sessionStorage.clear();
    }
  };
  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    if (location.pathname === "/login") {
      return <Login></Login>;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: user.username,
                avatar:
                  "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
                userid: user.userId,
                notifyCount: 12,
              }}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleClick}
            />
          </Header>
          <Content
            className={styles["content-wrap"]}
            style={{
              margin: "16px",
              height: "100%",
              background: "#fff",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
