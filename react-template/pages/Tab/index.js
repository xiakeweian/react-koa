import React, { useState } from "react";

import { Tabs, Input, Button } from "antd";

import { Form } from "@ant-design/compatible";

import "@ant-design/compatible/assets/index.css";
import "./index.less";
const { TabPane } = Tabs;

let newTabIndex = 1;
const defaultPanes = [
  {
    inputValue: "你好",
    key: "1",
    closable: false,
    title: "newTab1",
    desc: "dsfsdfsfdsdfewrfrewwwrwewer",
  },
];

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      panes: defaultPanes,
    };
  }
  onEdit = (targetKey, action) => {
    if (action === "add") {
      this.add(targetKey);
    }
  };
  handleFinish = (e) => {
    e.preventDefault();
    const { panes } = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", panes, values);
        const newPanes = panes.filter(
          (item) => item.inputValue === "" || item.desc === ""
        );
        if (newPanes.length > 0) {
          const jumpKey = newPanes[0].key;
          setActiveKey(jumpKey);
          this.setState({
            activeKey: jumpKey,
          });
        }
      }
    });
  };
  add = (e) => {
    newTabIndex++;
    const { panes, activeKey } = this.state;

    // eslint-disable-next-line no-plusplus
    const newActiveKey = `newTab${newTabIndex}`;
    const newPanes = [...panes];
    newPanes.push({
      inputValue: "",
      key: `${newActiveKey}`,
      closable: true,
      title: newActiveKey,
      desc: "",
    });

    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  handleInputChange = (e, key, index) => {
    const newPanes = this.state.panes;
    newPanes[index].inputValue = e.target.value;
    this.setState({
      panes: newPanes,
    });
  };
  handleTextChange = (e, key, index) => {
    const { panes } = this.state;

    const curPane = panes.find((item) => item.key === key);
    const newPanes = panes.map((item) => {
      if (item.key === key) {
        return { ...item, desc: e.target.value };
      }
      return item;
    });
    this.setState({
      panes: newPanes,
    });
  };

  render() {
    const { form } = this.props;
    const { panes, activeKey } = this.state;
    return (
      <div>
        <Form form={form} onSubmit={this.handleFinish}>
          <Form.Item label="" name="">
            <Tabs
              type="editable-card"
              onChange={this.onChange}
              activeKey={activeKey}
              onEdit={this.onEdit}
            >
              {!!panes.length &&
                panes.map((pane, i) => (
                  <TabPane
                    tab={pane.title}
                    key={pane.key}
                    closable={pane.closable}
                  >
                    <Input
                      defaultValue={pane.inputValue}
                      onChange={(e) => this.handleInputChange(e, pane.key, i)}
                      key={`input-${pane.key}`}
                    />
                    <Input.TextArea
                      defaultValue={pane.desc}
                      onChange={(e) => this.handleTextChange(e, pane.key, i)}
                      key={`area-${pane.key}`}
                    />
                  </TabPane>
                ))}
            </Tabs>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>

        <div className="clip-path-test">
          <div class="zz-containers">
            <div class="zz-body-container">
              <div class="fillet"></div>
              <div class="fillet-yezi"></div>
              <div class="fillet-yezi2"></div>
              <div class="fillet-yezi3"></div>
              <div class="fillet-yezi4"></div>
              <div class="fillet-yezi4-line1"></div>
              <div class="fillet-yezi4-line2"></div>
              <div class="fillet-yezi4-shadow"></div>
              <div class="fillet-yezi4-line3"></div>
              <div class="fillet-yezi4-line4"></div>
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
              <div class="line4"></div>
              <div class="line5"></div>
              <div class="line6"></div>
              <div class="line7"></div>
              <div class="line8"></div>
              <div class="line9"></div>
              <div class="line10"></div>
              <div class="line11"></div>
              <div class="line12"></div>
              <div class="line13"></div>
              <div class="line14"></div>
              <div class="line15"></div>
              <div class="belt"></div>
              <div class="mouth"></div>
              <div class="mouth1"></div>
              <div class="mouth2"></div>
              <div class="eye-left"></div>
              <div class="eye-left1"></div>
              <div class="eye-left2"></div>
              <div class="eye-right"></div>
              <div class="eye-right1"></div>
              <div class="eye-right2"></div>
              <div class="rouge"></div>
              <div class="rouge1"></div>
              <div class="rouge2"></div>
              <div class="rouge3"></div>
              <div class="rouge4"></div>
              <div class="rouge5"></div>
              <div class="rouge6"></div>
              <div class="rouge7"></div>
              <div class="rouge8"></div>
              <div class="rouge9"></div>
              <div class="rouge10"></div>
              <div class="other-line"></div>
              <div class="other-line1"></div>
              <div class="other-rectangle1"></div>
              <div class="other-rectangle2"></div>
              <div class="other-rectangle3"></div>
              <div class="other-rectangle4"></div>
              <div class="other-rectangle5"></div>
              <div class="other-rectangle6"></div>
              <div class="other-sweatdrop1"></div>
              <div class="other-sweatdrop2"></div>
              <div class="other-sweatdrop3"></div>
              <div class="other-sweatdrop4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Tab);
