import React, { useState } from "react";

import { Tabs, Input, Button } from "antd";

import { Form } from "@ant-design/compatible";

import '@ant-design/compatible/assets/index.css';
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
      </div>
    );
  }
}

export default Form.create({})(Tab);
