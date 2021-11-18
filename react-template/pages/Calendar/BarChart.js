import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from "bizcharts";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeyActive: {
        London: true,
        Berlin: true,
      },
    };
  }

  onItemClick(e) {
    // 由于 onLegendItemClick 的 checked 返回始终为 true，只能自行管理状态
    const { selectedKeyActive } = this.state;
    // 由于不可以所有 legend 皆为 false，所以当只有一个 legend 为false时不可再设定为 false
    const values = Object.values(selectedKeyActive);
    const trueValuesLength = values.filter((i) => !!i).length;
    if (trueValuesLength === 1 && !e.target._cfg.checked) {
      return;
    }

    selectedKeyActive[e.data.value] = !selectedKeyActive[e.data.value];
    this.setState({
      selectedKeyActive: { ...selectedKeyActive },
    });
    console.log(selectedKeyActive);
  }

  render() {
    const { selectedKeyActive } = this.state;

    const { data } = this.props;

    return (
      <div>
        <Chart
          height={400}
          onLegendItemClick={this.onItemClick.bind(this)}
          data={data}
          forceFit
        >
          <Legend />
          <Axis name="date" />
          <Axis name="total" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="date*total"
            color={"brand"}
            style={{
              stroke: "#fff",
              lineWidth: 1,
            }}
          >
            {/* <Label
              content="total"
              formatter={(text, item, index) => {
                // 仅显示 最上面一组的 label 达成总数显示需求
                // 当状态都激活时，显示总数
                if (selectedKeyActive.London && selectedKeyActive.Berlin) {
                  if (item._origin.name === "London") {
                    return item.point.total;
                  }
                }
                if (selectedKeyActive.London && !selectedKeyActive.Berlin) {
                  return item.point["月均降雨量"];
                }
                if (!selectedKeyActive.London && selectedKeyActive.Berlin) {
                  return item.point["月均降雨量"];
                }
                return null;
              }}
            /> */}
          </Geom>
        </Chart>
      </div>
    );
  }
}
export default BarChart;
