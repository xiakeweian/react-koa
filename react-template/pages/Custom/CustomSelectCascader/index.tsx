import React, { useEffect, useState } from "react";
import { Select } from "antd";
import SelectCascader from "../components/SelectCascader";
const { Option } = Select;
import Data from "./Data";
const CustomSelectCascader = (props) => {
  return (
    <div>
      <SelectCascader data={Data} titles={["1级", "2级", "3级", "4级", "5级"]} width={[170, 320, 550, 300, 300]}/>
    </div>
  );
};
export default CustomSelectCascader;
