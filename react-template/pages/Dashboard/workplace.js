import router from "umi/router";
import { Button } from "antd";
import { G2, Chart, Tooltip, Interval, Coord } from "bizcharts";
import DataSet from "@antv/data-set";
const data = [
  { country: "Europe", year: "1750", value: 163 },
  { country: "Europe", year: "1800", value: 203 },
  { country: "Europe", year: "1850", value: 276 },
  { country: "Europe", year: "1900", value: 408 },
  { country: "Europe", year: "1950", value: 547 },
  { country: "Europe", year: "1999", value: 729 },
  { country: "Europe", year: "2050", value: 628 },
  { country: "Europe", year: "2100", value: 828 },
  { country: "Asia", year: "1750", value: 502 },
  { country: "Asia", year: "1800", value: 635 },
  { country: "Asia", year: "1850", value: 809 },
  { country: "Asia", year: "1900", value: 947 },
  { country: "Asia", year: "1950", value: 1402 },
  { country: "Asia", year: "1999", value: 3634 },
  { country: "Asia", year: "2050", value: 5268 },
  { country: "Asia", year: "2100", value: 7268 },
];

const data1 = [
  { time: "16 Q1", type: "移动游戏", value: 0 },
  { time: "16 Q1", type: "移动购物", value: 17.8 },
  { time: "16 Q1", type: "移动营销", value: 69.4 },
  { time: "16 Q1", type: "共享单车", value: 12.8 },
  { time: "16 Q2", type: "移动游戏", value: 0 },
  { time: "16 Q2", type: "移动购物", value: 18.1 },
  { time: "16 Q2", type: "移动营销", value: 70.7 },
  { time: "16 Q2", type: "共享单车", value: 11.2 },
  { time: "16 Q3", type: "移动游戏", value: 0 },
  { time: "16 Q3", type: "移动购物", value: 20.8 },
  { time: "16 Q3", type: "移动营销", value: 67.4 },
  { time: "16 Q3", type: "共享单车", value: 11.8 },
  { time: "16 Q4", type: "移动游戏", value: 0.1 },
  { time: "16 Q4", type: "移动购物", value: 20.3 },
  { time: "16 Q4", type: "移动营销", value: 69.2 },
  { time: "16 Q4", type: "共享单车", value: 10.4 },
  { time: "17 Q1", type: "移动游戏", value: 0.4 },
  { time: "17 Q1", type: "移动购物", value: 17.3 },
  { time: "17 Q1", type: "移动营销", value: 68.3 },
  { time: "17 Q1", type: "共享单车", value: 14 },
  { time: "17 Q2", type: "移动游戏", value: 1.2 },
  { time: "17 Q2", type: "移动购物", value: 18.3 },
  { time: "17 Q2", type: "移动营销", value: 68.6 },
  { time: "17 Q2", type: "共享单车", value: 11.9 },
];
// 计算每个柱子的占比
const ds = new DataSet();
const dv = ds
  .createView()
  .source(data)
  .transform({
    type: "percent",
    field: "value", // 统计销量
    dimension: "country", // 每年的占比
    groupBy: ["year"], // 以不同产品类别为分组
    as: "percent",
  });

export default () => (
  <>
    <h1>工作台</h1>
    <Chart
      height={400}
      padding="auto"
      scale={{
        percent: {
          min: 0,
          formatter(val) {
            return (val * 100).toFixed(2) + "%";
          },
        },
      }}
      data={dv.rows}
      autoFit
    >
      <Interval adjust="stack" color="country" position="year*percent" />
      <Tooltip shared />
    </Chart>
  </>
);

// 图表必须由Chart组件包裹
// 图形组件Interval 按照数据坐标 genre*sold 分布，为必填属性。
// 图形颜色根据"genre"分类显示，颜色是可选属性。
