import React, { PureComponent } from "react";
import router from "umi/router";
import { Button, Table, Modal, Form, Input, Message, Divider } from "antd";
import { connect } from "dva";

const { Column } = Table;

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible,
        addOrEdit,
        onCancel,
        onCreate,
        form,
        formData,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={addOrEdit === "add" ? "新增课程" : "编辑课程"}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="名称">
              {getFieldDecorator("name", {
                initialValue: formData.name,
                rules: [{ required: true, message: "请输入名称!" }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="品牌">
              {getFieldDecorator("brand", {
                initialValue: formData.brand,
                rules: [{ required: true, message: "请输入品牌!" }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="价格">
              {getFieldDecorator("price", {
                initialValue: formData.price,
                rules: [{ required: true, message: "请输入价格!" }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator("number", {
                initialValue: formData.number,
                rules: [{ required: true, message: "请输入数量!" }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

@connect(({ analysis }) => ({
  analysis,
}))
export default class Analysis extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "analysis/fetchCourse",
      payload: { size: 10, current: 1 },
    });
  }

  state = {
    visible: false,
    formData: { id: "", name: "", price: "", number: "", brand: "" },
    addOrEdit: "add",
  };

  showModal = () => {
    this.setState({ formData: { name: "", price: "", number: "", brand: "" } });
    this.setState({ visible: true });
    this.setState({ addOrEdit: "add" });
  };

  handleCancel = () => {
    this.setState({ formData: { name: "", price: "", number: "", brand: "" } });
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { dispatch, analysis } = this.props;
    const {
      courseData: { pagination },
    } = analysis;

    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //判断是否是编辑
      if (this.state.addOrEdit === "edit") {
        values.id = this.state.formData.id;
      }
      dispatch({
        type:
          this.state.addOrEdit === "add"
            ? "analysis/fetchAddCourse"
            : "analysis/fetchEditCourse",
        payload: values,
        callback: (res) => {
          if (res.code === 1) {
            Message.success(res.msg);
            dispatch({
              type: "analysis/fetchCourse",
              payload: { size: pagination.size, current: 1 },
            });
          } else {
            Message.warning("操作失败,请检查!");
          }
          form.resetFields();
        },
      });
      this.setState({ visible: false });
    });
  };

  // 编辑
  handleEdit(record) {
    this.setState({ visible: true });
    this.setState({ addOrEdit: "edit" });
    this.setState({ formData: record });
  }

  //删除
  handleDelete(record) {
    const { dispatch } = this.props;

    dispatch({
      type: "analysis/fetchDeleteCourse",
      payload: { id: record.id },
      callback: (res) => {
        if (res.code === 1) {
          Message.success(res.msg);
          dispatch({
            type: "analysis/fetchCourse",
          });
        } else {
          Message.warning("操作失败,请检查!");
        }
      },
    });
  }
  onSearch = (value) => {
    const { dispatch, analysis } = this.props;
    const {
      courseData: { pagination },
    } = analysis;
    dispatch({
      type: "analysis/fetchCourse",
      payload: {
        search: value,
        size: pagination.size,
        current: 1,
      },
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch({
      type: "analysis/fetchCourse",
      payload: {
        size: pagination.pageSize,
        current: pagination.current,
      },
    });
  };
  render() {
    const { analysis } = this.props;
    const {
      courseData: { data, pagination },
    } = analysis;

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
          <Input.Search
            style={{ width: 200 }}
            onSearch={this.onSearch}
            allowClear
          />
          <Button type="primary" onClick={this.showModal}>
            新增
          </Button>
        </div>

        <Table
          dataSource={data}
          rowKey={(courseData) => courseData.id}
          style={{ margin: "0px 16px" }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            ...pagination,
          }}
          onChange={this.handleTableChange}
        >
          <Column title="名称" dataIndex="name" />
          <Column title="品牌" dataIndex="brand" />
          <Column title="价格" dataIndex="price" />
          <Column title="数量" dataIndex="number" />
          <Column
            title="操作"
            render={(text, record, index) => (
              <div>
                <a type="link" onClick={this.handleEdit.bind(this, record)}>
                  编辑
                </a>
                <Divider type="vertical" />
                <a type="link" onClick={this.handleDelete.bind(this, record)}>
                  删除
                </a>
              </div>
            )}
          />
        </Table>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          formData={this.state.formData}
          addOrEdit={this.state.addOrEdit}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
