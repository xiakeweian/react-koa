import React, { useState } from "react";

import SelectCascader from "../components/SelectCascader";

import Data from "./Data";
const CustomSelectCascader = (props) => {
  const [carModel0, setCarModel0] = useState({ selected: [], value: [] });
  const [carModel1, setCarModel1] = useState({ selected: [], value: [] });
  console.log(carModel0, carModel1, "jjjsss");

  return (
    <div>
      <SelectCascader
        data={Data}
        titles={["1级", "2级", "3级", "4级", "5级"]}
        width={[200, 200, 200, 200, 200]}
        key={0}
        carModel={carModel0}
        setCarModel={setCarModel0}
        isConnectParentLabel={true}
      />
      <SelectCascader
        data={Data}
        titles={["1级", "2级", "3级", "4级", "5级"]}
        width={[170, 320, 550, 300, 300]}
        key={1}
        carModel={carModel1}
        setCarModel={setCarModel1}
        isConnectParentLabel={false}
      />
    </div>
  );
};
export default CustomSelectCascader;
