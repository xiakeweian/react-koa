import { getUsers } from "@/service/user";
export default {
  namespace: "user",
  state: {
    userData: {
      list: [],
      pagination: false,
    },
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(getUsers, payload);
      if (res.code === 1) {
        yield put({
          type: "saveList",
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
    saveList(state, action) {
      return {
        ...state,
        userData: action.payload,
      };
    },
  },
};
