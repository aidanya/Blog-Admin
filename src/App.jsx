import React from "react";
import { Layout, BackTop, Icon } from "antd";
import NavLeft from "./components/navLeft/index";
import MyHeader from "./components/header/index";
import "./styles/App.less";
import { connect } from "react-redux";
import { getAdminInfo } from "@/redux/admin.redux.js";

const { Content, Sider } = Layout;
@connect(
  state => state.admin,
  { getAdminInfo }
)
class App extends React.Component {
  state = {};
  componentWillMount() {
    this.props.getAdminInfo();
  }
  render() {
    return (
      <Layout className="container">
        <Sider className="left">
          <NavLeft />
        </Sider>
        <Layout className="right">
          <MyHeader />
          <Content className="appContent">
            {this.props.children}
            <BackTop>
              <div className="ant-back-top-inner">
                <Icon type="caret-up" theme="outlined" />
              </div>
            </BackTop>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
