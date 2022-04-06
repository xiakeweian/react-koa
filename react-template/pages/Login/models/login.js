import { login } from "@/service/user";

export default {
  namespace: "login",

  state: {},

  effects: {
    *fetchLogin({ payload, callback }, { call, put }) {
      const response = yield call(login, { ...payload });
      console.log(response, "gggresponse");
      if (callback && typeof callback === "function") callback(response);
    },
  },

  reducers: {},
};
