import { login } from "@/service/user";

export default {
  namespace: "login",

  state: {},

  effects: {
    *fetchLogin({ payload, callback }, { call, put }) {
      const response = yield call(login, { ...payload });
      if (callback && typeof callback === "function") callback(response);
    },
  },

  reducers: {},
};
