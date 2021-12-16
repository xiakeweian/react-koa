/* eslint-disable camelcase */
/*
 * @Author: wuyanxia
 * @Date: 2021-06-22 16:35:01
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2021-11-25 17:17:41
 * 媒体配置上传
 */
import React, { PureComponent } from "react";
import { Modal, Select, Form } from "antd";
import CmcUpload from "@/components/CmcUpload";

const { Option } = Select;
const FormItem = Form.Item;

const fileTypeObj = {
  xlsx: "Excel",
  xls: "Excel",
  docx: "Word",
  doc: "Word",
  pdf: "PDF",
  pptx: "PPT",
  png: "Image",
  jpg: "Image",
  jpeg: "Image",
  mp4: "Video",
  mov: "Video",
};

@Form.create()
class DocumentModal extends PureComponent {
  state = {
    fileList: [],
    // eslint-disable-next-line react/no-unused-state
    file_path: "",
    isEdit: false,
    isCanSubmit: false,
  };

  handleOk = (e) => {
    e.preventDefault();
    const { form, handleOk } = this.props;
    const { validateFields } = form;
    validateFields()
      .then((values) => {
        const newValues = {
          ...values,
          file_name: this.CmcUploadRef.state.fileName.split("_")[0],
          file_path: this.CmcUploadRef.state.fileName,
          file_owner: Number(values.file_owner),
        };
        delete newValues.file;
        handleOk(newValues);
        this.setState({
          isEdit: false,
        });
      })
      .catch((errInfo) => {
        console.log(errInfo, "ppperrInfo");
      });
  };

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
    this.setState({
      isEdit: false,
    });
  };

  callback = (info) => {
    const { form } = this.props;
    const suffix = info.file.name.split(".").pop();
    form.setFieldsValue({
      type: fileTypeObj[`${suffix}`],
    });
  };

  /**
   *
   * @param {*} bool
   * 文件上传过程中不可点击button
   */
  handleSubmit = (bool) => {
    this.setState({ isCanSubmit: bool });
  };

  render() {
    const umiLocale = getLocale();
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { visible, confirmLoading, handleCancel } = this.props;
    const { fileList, isEdit, isCanSubmit } = this.state;

    const { form } = this.props;
    const { getFieldDecorator } = form;

    const documentType = ["Excel", "Word", "PDF", "PPT", "Image", "Video"];
    const screenWidth = window.document.documentElement.getBoundingClientRect()
      .width;
    return (
      <Modal
        title={"上传"}
        width={
          umiLocale === "zh-CN" && screenWidth <= 1280
            ? 540
            : umiLocale === "en-US" && screenWidth <= 1280
            ? 660
            : umiLocale === "zh-CN"
            ? 600
            : 600
        }
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={handleCancel}
        wrapClassName="config-center-wrap"
        okButtonProps={{ disabled: isCanSubmit }}
      >
        <Form {...layout} name="add" colon={false} labelAlign="right">
          <FormItem
            label={"文件所属"}
            name="file_owner"
            // labelCol={{ span: 3 }}
          >
            {getFieldDecorator("file_owner", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "请输入文件所属",
                },
              ],
            })(
              <Select disabled={isEdit}>
                <Option value="1">帮助文档</Option>
                <Option value="2">产品文档</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label={"文件类型"} name="type">
            {getFieldDecorator("type", {
              initialValue: undefined,
            })(
              <Select disabled>
                {documentType.map((item) => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <CmcUpload
            {...this.props}
            // eslint-disable-next-line no-return-assign
            ref={(node) => (this.CmcUploadRef = node)}
            title={"文件上传"}
            uploadSpan={24}
            isShowTemplate={false}
            uploadLabel={"文件上传"}
            changeCallback={this.callback}
            fileList={fileList}
            accept=".xlsx,.xls,.docx,.doc,.pdf,.pptx,.png,.jpeg,.jpg,.mp4,.mov"
            multiple={false}
            labelCol={
              umiLocale === "zh-CN" && screenWidth <= 1280
                ? 3
                : umiLocale === "en-US" && screenWidth <= 1280
                ? 3
                : umiLocale === "zh-CN"
                ? 3
                : 4
            }
            wrapperCol={
              umiLocale === "zh-CN" && screenWidth <= 1280
                ? 21
                : umiLocale === "en-US" && screenWidth <= 1280
                ? 21
                : umiLocale === "zh-CN"
                ? 21
                : 20
            }
            handleSubmit={this.handleSubmit}
          />
        </Form>
      </Modal>
    );
  }
}
export default DocumentModal;
