import React, { useState } from "react";
import ReactCascaderTransfer from "../components/ReactCascaderTransfer/index";
import Data from "./Data";
interface treeProps {
  value: number | string;
  label: string;
  parent_value: string;
  children?: treeProps[];
}
interface carModelProps {
  selected: treeProps[];
  value: Array<number | string>;
}
const CustomCascader = () => {
  const [carModel, setCarModel] = useState<carModelProps>({
    selected: [],
    value: [],
  });
  const treeData: treeProps[] = Data;
  const titles = ["1级", "2级", "3级", "4级", "5级"];

  const handleOnchange = (selecteds: any, values: Array<number | string>) => {
    setCarModel({ selected: selecteds, value: values });
  };

  return (
    <div>
      {treeData && !!treeData.length && (
        <ReactCascaderTransfer
          dataSource={treeData}
          titles={titles}
          {...carModel}
          onChange={handleOnchange}
          width={[170, 320, 550, 300, 300]}
        />
      )}
    </div>
  );
};
export default CustomCascader;
