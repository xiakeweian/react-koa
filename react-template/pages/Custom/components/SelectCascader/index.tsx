import React, { useEffect, useState } from "react";
import { Select, Tag, Modal } from "antd";
import { CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { formatMessage } from "umi/locale";
import ReactCascaderTransfer from "../ReactCascaderTransfer";
const { Option } = Select;
const SelectCascader = (props) => {
  const [carModel, setCarModel] = useState({ selected: [], value: [] });
  const { data, titles, width } = props;

  const handleOnchange = (selecteds: any, values: Array<number | string>) => {
    setCarModel({ selected: selecteds, value: values });
  };

  const calcWidth = width.reduce((prev, cur) => {
    return prev + Number(cur);
  });

  const handleClose = (onClose:any, label:string) => {
    onClose();
    setCarModel({
      selected: carModel?.selected?.filter((item) => item.value !== label),
      value: carModel?.value?.filter((item) => item !== label),
    });
    // Modal.confirm({
    //   title: formatMessage({ id: "global.delete.title" }),
    //   content: formatMessage({ id: "global.delete.content" }),
    //   okText: formatMessage({ id: "global.confirm" }),
    //   okType: "primary",
    //   cancelText: formatMessage({ id: "global.cancel" }),
    //   className: "grid-delete-wrap",
    //   icon: (
    //     <ExclamationCircleFilled
    //       style={{
    //         color: "rgba(250, 173, 20, 1)",
    //         marginRight: "16px",
    //         fontSize: 20,
    //         marginTop: 2,
    //       }}
    //     />
    //   ),
    //   async onOk() {
    //     onClose();
    //     setCarModel({
    //       selected: carModel?.selected?.filter((item) => item.value !== label),
    //       value: carModel?.value?.filter((item) => item !== label),
    //     });
    //   },
    //   onCancel() {},
    // });
  };
  const tagRender = (props) => {
    const { label, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        style={{ marginRight: 3, marginBottom: 3 }}
      >
        {label}
        <CloseOutlined
          style={{ marginLeft: 4, fontSize: 10, color: "#00000073" }}
          onClick={() => {
            handleClose(onClose, label);
          }}
        />
      </Tag>
    );
  };
  const handleDropdownVisibleChange = () => {
    setCarModel({ selected:carModel.selected, value:carModel.value });
  }
  console.log(carModel,'carModel')
  return (
    <div>
      <Select
        allowClear
        value={carModel.value}
        onMouseDown={(e) => e.preventDefault()}
        mode="tags"
        style={{ width: calcWidth }}
        tagRender={tagRender}
        dropdownRender={(menu) => (
          <ReactCascaderTransfer
            dataSource={data}
            titles={titles}
            {...carModel}
            onChange={handleOnchange}
            width={width}
          />
        )}
        onDropdownVisibleChange={handleDropdownVisibleChange}
      ></Select>
    </div>
  );
};
export default SelectCascader;
