import { fileList } from "@/service/file";
export default {
  namespace: "file",
  state: {
    data: {
      list: [],
      pagination: false,
    },
  },
  effects: {
    *fetchFileList({ payload }, { call, put }) {
      const res = yield call(fileList, payload);
      if (res.code === 1) {
        yield put({
          type: "saveFileList",
          payload: {
            list: res.result.records,
            pagination: {
              current: res.result.current,
              size: res.result.size,
              total: res.result.total,
            },
          },
        });
      }
    },
  },
  reducers: {
    saveFileList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
