import { register } from "@/service/login";

export default {
  namespace: "register",

  state: {},

  effects: {
    *fetchRegister({ payload, callback }, { call, put }) {
      const response = yield call(register, { ...payload });
      if (callback && typeof callback === "function") callback(response);
    },
  },

  reducers: {},
};
