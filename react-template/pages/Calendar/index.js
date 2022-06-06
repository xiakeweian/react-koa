import React, { useState, useEffect } from "react";
import { Card, Radio, DatePicker } from "antd";
import { connect } from "dva";
import TableCom from "./TableCom";
import BarChart from "./BarChart";
import moment from "moment";
import VideoCom from "./Video";

import styles from "./index.less";

const { RangePicker } = DatePicker;

const Calendar = (props) => {
  const [dateType, setDateType] = useState("YTD");
  const dateData = [
    { label: "YTD", value: "YTD" },
    { label: "MTD", value: "MTD" },
    { label: "自定义", value: "custom" },
  ];
  const {
    dispatch,
    calendar: {
      trendList,
      trendMonthEndList,
      trendData: { data, total },
    },
  } = props;

  useEffect(() => {
    // TODO 获取趋势图数据
    // TODO 获取月度表现数据
    dispatch({ type: "calendar/fetchTrendData", payload: { classify: "YTD" } });
    dispatch({
      type: "calendar/fetchTrendList",
      payload: { size: 5, current: 1, month: 1 },
    });
    dispatch({
      type: "calendar/fetchMonthEndTrendList",
      payload: { size: 5, current: 1, month: 0 },
    });
  }, []);

  const handleChange = async (e) => {
    setDateType(e.target.value);
    if (e.target.value !== "custom") {
      dispatch({
        type: "calendar/fetchTrendData",
        payload: { classify: e.target.value },
      });
    }
  };
  const rangePickerChange = (value) => {
    dispatch({
      type: "calendar/fetchTrendData",
      payload: {
        start_time: moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
      },
    });
  };
  const handlePageChange = (page, type, modelUrl, pagination) => {
    dispatch({
      type: modelUrl,
      payload: {
        current: pagination.current === page.current ? 1 : page.current,
        size: page.pageSize,
        month: type,
      },
    });
  };

  return (
    <div className={styles.calendar}>
      <Card
        title="趋势图"
        bordered={false}
        style={{
          width: "100%",
          borderBottom: "16px solid #f0f2f5",
        }}
      >
        <Radio.Group
          options={dateData}
          onChange={handleChange}
          value={dateType}
          optionType="button"
          style={{ marginRight: 16 }}
        />
        <RangePicker
          disabled={dateType !== "custom"}
          onChange={rangePickerChange}
        />
        <div className={styles.total}>
          <div className={styles.totalNum}>
            <p>Total</p>
            <p>{total?.total}</p>
          </div>
          <div className={styles.totalClassify}>
            <div>
              <p>XIXI</p>
              <p>{total?.bmw_total}</p>
            </div>
            <div>
              <p>HAHA</p>
              <p>{total?.mini_total}</p>
            </div>
            <div>
              <p>KAKA</p>
              <p>{total?.motorrad_total}</p>
            </div>
          </div>
        </div>
        <BarChart data={data} />
      </Card>
      <Card title="月度表现趋势" bordered={false} style={{ width: "100%" }}>
        <TableCom
          title="本月上线"
          data={trendList}
          onChange={(page) =>
            handlePageChange(
              page,
              1,
              "calendar/fetchTrendList",
              trendList.pagination
            )
          }
        />
        <TableCom
          title="本月结束"
          data={trendMonthEndList}
          onChange={(page) =>
            handlePageChange(
              page,
              0,
              "calendar/fetchMonthEndTrendList",
              trendMonthEndList.pagination
            )
          }
        />
      </Card>

      <VideoCom />
    </div>
  );
};
export default connect(({ calendar }) => ({ calendar }))(Calendar);
