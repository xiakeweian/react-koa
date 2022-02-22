import React,{useState} from 'react'
import ReactCascaderTransfer from '../components/ReactCascaderTransfer/index'
import Data from './Data'
 interface treeProps {
    value: number | string;
    label: string;
    parent_value:string;
    children?: treeProps[];
  }
  interface carModelProps {
      selected:treeProps[],
      value:Array<number | string>
  }
const CustomCascader = () => {
 
    const [carModel,setCarModel] = useState<carModelProps>({selected:[],value:[]})
    const treeData:treeProps[] = Data
    const titles = ['车系','车型','底盘号']
   
        const handleOnchange = (selecteds:any, values:Array<number | string>) => {
            setCarModel({ selected: selecteds, value: values });
          };
    
    return <div>
           {treeData && !!treeData.length && (
          <ReactCascaderTransfer
            dataSource={treeData}
            titles={titles}
            {...carModel}
            onChange={handleOnchange}
            width={ [170, 320, 550]}
          />
        )}
    </div>

}
export default CustomCascader