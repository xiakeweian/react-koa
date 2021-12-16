/*
 * @Author: wuyanxia
 * @Date: 2021-08-12 18:31:00
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2021-11-25 17:15:16
 */
import React, { Component } from "react";

import { Button, Upload, message, Row, Col, Divider, Form } from "antd";
import { formatMessage, getLocale } from "umi/locale";
// import { fileUpload } from "@/services/configCenter";

// import styles from './index.less';
import "./index.less";
const duration = 5;

const imgUrl = require("@/assets/uploadicon.png");

const FormItem = Form.Item;
export default class CmcUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      // eslint-disable-next-line react/no-unused-state
      fileName: "",
    };
  }

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fileList } = this.props;
    if (JSON.stringify(nextProps.fileList) !== JSON.stringify(fileList)) {
      this.setState({
        fileList: nextProps.fileList,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onChange = (info) => {
    console.log(info, "ddppp");
    this.setState({
      fileList: info.fileList.slice(-1),
    });
    const { form, changeCallback = null, handleSubmit } = this.props;

    form.setFieldsValue({ file: info.fileList });
    changeCallback && changeCallback(info);
    handleSubmit && handleSubmit(true);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(
        `${info.file.name}${formatMessage({ id: "fileupload.success" })}`,
        duration
      );
      handleSubmit && handleSubmit(false);
    } else if (info.file.status === "error") {
      handleSubmit && handleSubmit(false);
      message.error(
        `${info.file.name}${formatMessage({ id: "fileupload.failed" })}`,
        duration
      );
    }
  };

  /**
   *
   * @param {*} e
   * 删除文件
   */
  handleRemove = (e) => {
    console.log(e);
    this.setState({
      fileList: [],
    });
  };

  handleCustomRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    // 添加要上传的文件
    formData.append("file", file);

    // fileUpload(formData).then((res) => {
    //   if (res && res.code === 0) {
    //     this.setState({
    //       // eslint-disable-next-line react/no-unused-state
    //       fileName: res.result.fileName,
    //     });
    //     onSuccess(res, file);
    //   } else {
    //     console.log("ss");
    //     onError(res, file);
    //   }
    // });
  };

  handleDownloadTemplate = () => {
    const { downloadTemplate = null } = this.props;
    // eslint-disable-next-line no-unused-expressions
    downloadTemplate && downloadTemplate();
  };

  handleResetForm() {
    this.setState({
      fileList: "",
    });
  }

  render() {
    const umiLocale = getLocale();
    const screenWidth = window.document.documentElement.getBoundingClientRect()
      .width;
    const {
      form: { getFieldDecorator },
      isShowTemplate = true,
      uploadSpan = 18,
      templateSpan = 2,
      // width = 650,
      uploadLabel = formatMessage({ id: "configCenter.uploadFile" }),
      labelCol = umiLocale === "zh-CN" && screenWidth <= 1280
        ? 3
        : umiLocale === "en-US" && screenWidth <= 1280
        ? 3
        : umiLocale === "zh-CN"
        ? 3
        : 4,
      wrapperCol = umiLocale === "zh-CN" && screenWidth <= 1280
        ? 21
        : umiLocale === "en-US" && screenWidth <= 1280
        ? 21
        : umiLocale === "zh-CN"
        ? 21
        : 20,
      accept = ".xlsx,.xls",
      multiple = false,
    } = this.props;
    const { fileList } = this.state;

    const uploadProps = {
      name: "file",
      customRequest: this.handleCustomRequest,
      accept,
      multiple,
      fileList,
    };

    return (
      <Row
        style={{ display: "flex", alignItems: "flex-start" }}
        className="upload-file"
      >
        <Col
          span={uploadSpan}
          className={
            umiLocale === "en-US"
              ? "upload-info1 upload-info-us"
              : "upload-info1"
          }
        >
          <FormItem
            label={uploadLabel}
            name="file"
            labelAlign="left"
            colon={false}
            labelCol={{ span: labelCol }}
            wrapperCol={{ span: wrapperCol }}
            // style={{ marginRight: isShowTemplate ? 16 : 0 }}
          >
            {getFieldDecorator("file", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "configCenter.uploadFile.message",
                  }),
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && !value.fileList.length) {
                      callback(
                        formatMessage({ id: "configCenter.uploadFile.message" })
                      );
                    }
                    callback();
                  },
                },
              ],
            })(
              <Upload
                {...uploadProps}
                onChange={this.onChange}
                onRemove={this.handleRemove}
                className="upload-button"
              >
                <Button
                  icon={<img width={20} src={imgUrl} alt="upload" />}
                  style={{ margin: "0px 8px" }}
                />
                <Divider
                  type="vertical"
                  style={{ height: 13, marginLeft: 2 }}
                />
              </Upload>
            )}
          </FormItem>
        </Col>

        {isShowTemplate && (
          <Col span={templateSpan} style={{ textAlign: "right" }}>
            <a
              onClick={this.handleDownloadTemplate}
              style={{
                borderBottom: "1px solid #0068D8",
                height: 32,
                lineHeight: "32px",
                display: "inline-block",
                marginLeft: 16,
              }}
            >
              {formatMessage({ id: "configCenter.download.template" })}
            </a>
          </Col>
        )}
      </Row>
    );
  }
}
