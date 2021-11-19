import { Upload, Icon, message } from "antd";
import React from "react";
import { fileUpload } from "@/service/userCenter";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  handleCustomRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    // 添加要上传的文件
    formData.append("file", file);
    console.log(formData, "ddformData");

    fileUpload(formData).then((res) => {
      if (res && res.code === 1) {
        // this.setState({
        //   // eslint-disable-next-line react/no-unused-state
        //   fileName: res.result.fileName,
        // });
        // onSuccess(res, file);
      } else {
        console.log("ss");
        // onError(res, file);
      }
    });
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const uploadProps = {
      name: "file",
      customRequest: this.handleCustomRequest,
      accept: ".jpg,png,jpeg,.webp",
      multiple: false,
    };

    return (
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        {...uploadProps}
        // customRequest={this.handleCustomRequest}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
export default Avatar;
