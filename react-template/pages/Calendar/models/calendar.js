/*
 * @Author: wuyanxia
 * @Date: 2021-11-12 15:06:34
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2021-11-17 10:55:59
 */
import { fetchTrendData, fetchTrendList } from "@/service/calendar";

export default {
  namespace: "calendar",
  state: {
    trendData: {},
    trendList: {
      list: [],
      pagination: false,
    },
    trendMonthEndList: {
      list: [],
      pagination: false,
    },
  },
  effects: {
    *fetchTrendData({ payload }, { call, put }) {
      const res = yield call(fetchTrendData, payload);
      console.log(res, "<---fff");
      if (res.code === 1) {
        yield put({
          type: "saveTrendData",
          payload: res.result,
        });
      }
    },
    *fetchTrendList({ payload }, { call, put }) {
      const res = yield call(fetchTrendList, payload);
      if (res.code === 1) {
        console.log("coming", res);
        yield put({
          type: "saveTrendList",
          payload: {
            list: res.result.records,
            pagination: {
              total: res.result.total,
              current: res.result.current,
              size: res.result.size,
            },
          },
        });
      }
    },
    *fetchMonthEndTrendList({ payload }, { call, put }) {
      const res = yield call(fetchTrendList, payload);
      if (res.code === 1) {
        yield put({
          type: "saveMonthEndTrendList",
          payload: {
            list: res.result.records,
            pagination: {
              total: res.result.total,
              current: res.result.current,
              size: res.result.size,
            },
          },
        });
      }
    },
  },
  reducers: {
    saveTrendList(state, action) {
      return {
        ...state,
        trendList: action.payload,
      };
    },
    saveMonthEndTrendList(state, action) {
      return {
        ...state,
        trendMonthEndList: action.payload,
      };
    },
    saveTrendData(state, action) {
      return {
        ...state,
        trendData: action.payload,
      };
    },
  },
};
