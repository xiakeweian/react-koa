import { list, create, update, del } from "@/service/article";
export default {
  namespace: "article",
  state: {
    tableData: {
      list: [],
      pagination: false,
    },
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      console.log(payload, "lll");

      const res = yield call(list, payload);
      if (res.code === 1) {
        yield put({
          type: "saveTableData",
          payload: {
            list: res.result.records,
            pagination: {
              size: res.result.size,
              current: res.result.current,
              total: res.result.total,
            },
          },
        });
      }
    },
  },
  reducers: {
    saveTableData(state, action) {
      return {
        ...state,
        tableData: action.payload,
      };
    },
  },
};
