import { stringify } from "qs";
import request from "@/utils/request";

// 获取总体趋势图数据
export async function fetchTrendData(data) {
  return request({
    url: `/trend-total/data?${stringify(data)}`,
    method: "get",
  });
}
// 获取月度表现趋势列表
export async function fetchTrendList(data) {
  return request({
    url: `/trend-month/list?${stringify(data)}`,
    method: "get",
  });
}
