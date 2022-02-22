/*
 * @Author: wuyanxia
 * @Date: 2020-06-10 11:37:48
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2022-02-22 17:28:55
 * 自定义列组件
 */
import React, { Component } from "react";
import { Checkbox, Row, Col, Button } from "antd";
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
import lib from "./lib";
import fields from "./fields";

import  "./style.less";

interface Field {
  key: string;
  title:string;
  groupName: string;
  order: number;
  isSort: number;
}
interface State {
      selectValue: Field[];
      copyselectValue:Field[];
      firstselectValue:Field[];
      targetValue: Field[];
      firsttargetValue:Field[];
      copytargetValue:Field[];
      centerData: Field[];
      firstcenterData:Field[];
      copycenterData:Field[];
      selectToLeftValue: Field[];
      copyselectToLeftValue:Field[];
      curScrollValue: number;
      newTargetKeys:Array<number | string>;
}
interface Props {
  dataSource:Field[];
  targetKeys:Array<number | string>;
  onChange:any;
}

export default class CustomTransfer extends Component<Props,State,{}> {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: [],
      copyselectValue:[],
      firstselectValue:[],
      targetValue: [],
      firsttargetValue:[],
      copytargetValue:[],
      centerData: [],
      firstcenterData:[],
      copycenterData:[],
      selectToLeftValue: [],
      copyselectToLeftValue:[],
      curScrollValue: 0,
      newTargetKeys:[]
    };
    this.contentCenter = null
  }

  componentDidMount() {
    this.renderDefaultData(this.props);
  }

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {dataSource,targetKeys,onChange} = this.props
    const {newTargetKeys,targetValue,centerData,copycenterData,firsttargetValue,firstcenterData,copytargetValue} = this.state
    if (
      JSON.stringify(nextProps.dataSource) !==
        JSON.stringify(dataSource) ||
      JSON.stringify(nextProps.targetKeys) !==
        JSON.stringify(targetKeys)
    ) {
      this.renderDefaultData(nextProps);
    }
    if(nextProps.customOk==='ok'){
      onChange && onChange(newTargetKeys);

      this.setState({ // ok之后的初始值
        copytargetValue:targetValue,
        copycenterData:centerData,  // 点ok后存第二次的初始值
        firstcenterData:[], // 点击ok之后需要把第一次的记录清空
        firsttargetValue:[]
      })
    }else if(nextProps.customOk==='cancel'&&copycenterData.length >0){
      this.setState({ // 记录初始值
        targetValue :firsttargetValue.length>0?firsttargetValue:copytargetValue,
        centerData:firstcenterData.length>0?firstcenterData:copycenterData,
        selectValue:[]
      })
    }
  }

  renderDefaultData = (props) => {
    const { dataSource, targetKeys } = props;
    const {firstcenterData,targetValue} = this.state
    const newDataSource =
      dataSource && !!dataSource.length
        ? lib.uniqArrObj(dataSource, "key")
        : lib.uniqArrObj(fields, "key");
        firstcenterData.length===0&&this.setState({
          firstcenterData :this.leftCheckedData(
            lib.toGroupByField(newDataSource),
            targetKeys
          ),
         })
    this.setState(
      {
        targetValue: this.selectedData(
          lib.toGroupByField(newDataSource),
          targetKeys
        ),
        centerData: this.leftCheckedData(
          lib.toGroupByField(newDataSource),
          targetKeys
        ),
        copytargetValue: this.selectedData(
          lib.toGroupByField(newDataSource),
          targetKeys
        ),
        copycenterData: this.leftCheckedData(
          lib.toGroupByField(newDataSource),
          targetKeys
        ),
      },
      () => {
        const newTargetKeys = targetValue.map((item) => item.key);
        this.setState({newTargetKeys})
      }
    );
  };


  leftCheckedData = (data, targetKeys) => {
    if (!targetKeys.length) return data;
    const newCenterData =
      data &&
      data.map((item) => {
        return {
          ...item,
          children:
            item.children &&
            !!item.children.length &&
            item.children.map((k, v) => {
              if (targetKeys.includes(k.key)) {
                return {
                  ...k,
                  checked: true,
                  disabled: true,
                };
              } 
                return k;
              
            }),
        };
      });
    return newCenterData;
  };

  selectedData(data, targetKeys) {
    const targetValues = [];
    data &&
      data.map((item) => {
        item.children.map((k, v) => {
          if (targetKeys.includes(k.key)) {
            targetValues.push(k);
          }
        });
      });
    const arr = [];
    for (let i = 0; i < targetKeys.length; i++) {
      for (let j = 0; j < targetValues.length; j++) {
        if (targetKeys[i] === targetValues[j].key) {
          arr.push(targetValues[j]);
        }
      }
    }
    return arr;
  }

  /**
   *
   * @param {*} name
   * 点击左侧，实现锚点
   */
  handleClick = (name) => {
    const { centerData } = this.state;
    const node = this[`centerTitle${name}`];
    if (!node) return;
    let heightSum = 0;

    const index = centerData.findIndex((item) => {
      return item.groupName === name;
    });
    centerData.slice(0, index).map((item) => {
      heightSum += this[`centerTitle${item.groupName}`].offsetHeight;
    });

    return this.contentCenter.scrollTo(0, heightSum + 10);
  };

  /**
   * render左侧数据
   */
  renderLeftData = (data) => {
    return (
      data &&
      data.map((item, i) => (
        <li key={i} className="custom-item">
          <p
            className="custom-item-title"
            onClick={() => this.handleClick(item.groupName)}
          >
            {item.groupName}
          </p>
          {/* 
        {!!item.children.length && (
          <ul>
            {item.children.map((k, v) => (
              <li key={`${k.key}-${v}`}>{k.title}</li>
            ))}
          </ul>
        )}
        <Divider /> */}
        </li>
      ))
    );
  };

  /**
   * 左边选择change
   */
  handleMutipleChange = (e, label) => {
    const { centerData } = this.state;
   
    const newCenterData = centerData.map((item) => {
      return {
        ...item,
        children:
          !!item.children.length &&
          item.children.map((k, v) => {
            if (k.key === e.target["data-value"].key) {
              return {
                ...k,
                checked:
                  k.key === e.target["data-value"].key && e.target.checked,
              };
            } 
              return k;
            
          }),
      };
    });
    this.setState((prevState) => ({
      selectValue: e.target.checked
        ? prevState.selectValue.concat([e.target["data-value"]])
        : prevState.selectValue.filter(
            (item) => item.key !== e.target["data-value"].key
          ),
      centerData: newCenterData,
    }));
  };

  handleCheckAll = (e, label) => {
    const { centerData, targetValue } = this.state;
    // 当前选中的模块下的children，如勾选了""属性指标"，那么currentItemChildren代表groupName为“属性指标”的children
    let currentItemChildren;
    centerData.forEach((item) => {
      if (item.groupName === e.target["data-value"]) {
        currentItemChildren = item.children.filter(
          (listItem) => listItem.disabled === false
        ); // 去除已经勾选过并转移到穿梭框右侧的的
      }
    });
    const newCenterData = centerData.map((item) => {
      return {
        ...item,
        children:
          !!item.children.length &&
          item.children.map((k, v) => {
            if (item.groupName === e.target["data-value"]) {
              if (e.target.checked) {
                return {
                  ...k,
                  checked: true,
                };
              } 
                return {
                  ...k,
                  checked: false,
                };
              
            } 
              return k;
            
          }),
      };
    });
    this.setState((prevState) => ({
      selectValue: e.target.checked
        ? prevState.selectValue.concat(currentItemChildren)
        : prevState.selectValue.filter(
            (item) => item.groupName !== e.target["data-value"]
          ),
      centerData: newCenterData,
    }));
  };

  /**
   * render中间数据
   */
  renderCenterData = (data) => {
    const { targetValue } = this.state;
    return (
      data &&
      data.map((item, i) => (
        <li
          key={i}
          className="custom-center-item"
          ref={(node) => (this[`centerTitle${item.groupName}`] = node)}
          data-value={`centerTitle${item.groupName}`}
        >
          <p className="custom-center-title">
            <Checkbox
              onChange={this.handleCheckAll}
              data-value={item.groupName}
              checked={
                item.children.length ===
                item.children.filter((listItem) => listItem.checked === true)
                  .length
              }
              disabled={
                item.children.length ===
                targetValue.filter(
                  (listItem) => listItem.groupName === item.groupName
                ).length
              }
            >
              {item.groupName}
            </Checkbox>
          </p>
          <Row>
            {!!item.children.length &&
              item.children.map((k, v) => (
                <Col key={`${k.key}-${v}`} span="8">
                  <Checkbox
                    value={k.key}
                    data-value={k}
                    onChange={this.handleMutipleChange}
                    disabled={k.disabled}
                    checked={k.checked}
                  >
                    {k.title}
                  </Checkbox>
                </Col>
              ))}
          </Row>
        </li>
      ))
    );
  };

  /**
   *
   */
  handleRightChange = (e) => {
    this.setState((prevState) => ({
      selectToLeftValue: e.target.checked
        ? prevState.selectToLeftValue.concat(e.target["data-value"])
        : prevState.selectToLeftValue.filter(
            (item) => item.key !== e.target.value
          ),
    }));
  };

  handleToRight = () => {
    const { centerData, selectValue, targetValue } = this.state;
    this.setState({
      firsttargetValue:targetValue,
    })
    const newData = centerData.map((item) => {
      return {
        ...item,
        children:
          !!item.children.length &&
          item.children.map((k, v) => {
            const curData = selectValue.find((m, n) => m.key === k.key);
            if (curData) {
              return {
                ...selectValue.find((m, n) => m.key === k.key),
                disabled: true,
                checked: true,
              };
            } 
              return k;
            
          }),
      };
    });
    this.setState(
      {
        targetValue: targetValue.concat(this.state.selectValue),
        centerData: newData,
      },
      () => {
        this.setState({
          selectValue: [],
        });
        const newTargetKeys = this.state.targetValue.map((item) => item.key);
        this.setState({newTargetKeys})
        console.log(newTargetKeys,this.state.targetValue, "newTargetKeys");
      }
    );
  };

  /**
   * 将选中的右侧数据移入左侧
   */
  handleToLeft = () => {
    const { selectToLeftValue, targetValue, centerData } = this.state;
    // centerData恢复状态可选，未选的状态
    const newData = centerData.map((item) => {
      return {
        ...item,
        children:
          !!item.children.length &&
          item.children.map((k, v) => {
            const curData = selectToLeftValue.find((m, n) => m.key === k.key);
            if (curData) {
              return {
                ...selectToLeftValue.find((m, n) => m.key === k.key),
                disabled: false,
                checked: false,
              };
            } 
              return k;
            
          }),
      };
    });

    const newTargetValue = targetValue.filter((item, i) => {
      const newData = selectToLeftValue.map((k) => k.key);

      if (newData.indexOf(item.key) <= -1) return item;
    });

    this.setState(
      {
        targetValue: newTargetValue,
        centerData: newData,
      },
      () => {
        this.setState({
          selectToLeftValue: [],
        });
        const newTargetKeys = this.state.targetValue.map((item) => item.key);
        this.setState({newTargetKeys})
      }
    );
  };

  render() {
    const {
      selectValue,
      centerData,
      targetValue,
      selectToLeftValue,
    } = this.state;
    const toRightActive =
      selectValue.length > 0 && targetValue.concat(selectValue).length <= 50
        ? "active"
        : "";
    const toLeftActive = selectToLeftValue.length > 0 ? "active" : "";

    return (
      <div className="content custom-transfer">
        <ul className="content-left">{this.renderLeftData(centerData)}</ul>
        <div
          className="content-center"
          ref={(node) => (this.contentCenter = node)}
        >
          {this.renderCenterData(centerData)}
        </div>
        <div className="selected-change">
          <Button
            onClick={this.handleToRight}
            className={`to-right ${toRightActive}`}
            disabled={targetValue.concat(selectValue).length > 50}
          >
            <RightOutlined />
          </Button>
          <Button
            onClick={this.handleToLeft}
            className={`to-left ${toLeftActive}`}
          >
            <LeftOutlined />
          </Button>
        </div>

        <div className="content-right">
          <p style={{ fontSize: "18px", fontWeight: 600 }}>
            已选：{targetValue.length}/50
          </p>
          {!!targetValue.length &&
            targetValue.map((item, ind) => (
              <Row key={`${item.key}-${ind}-row`}>
                <Checkbox
                  key={`${item.key}-${ind}`}
                  value={item.key}
                  data-value={item}
                  onChange={this.handleRightChange}
                >
                  {item.title}
                </Checkbox>
              </Row>
            ))}
        </div>
      </div>
    );
  }
}
