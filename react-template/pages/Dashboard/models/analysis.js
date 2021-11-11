import {
  queryCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "@/service/analysis";

export default {
  namespace: "analysis",

  state: {
    courseData: {
      data: [],
      pagination: false,
    },
  },

  effects: {
    *fetchCourse({ payload, callback }, { call, put }) {
      console.log(payload, "dddpayload");
      const response = yield call(queryCourse, payload);
      console.log(response, "ffffres");

      yield put({
        type: "changeCourse",
        payload: {
          data: response.result.records,
          pagination: {
            size: response.result.size,
            current: response.result.current,
            total: response.result.total,
          },
        },
      });
    },

    *fetchAddCourse({ payload, callback }, { call, put }) {
      const response = yield call(addCourse, { ...payload });
      if (callback && typeof callback === "function") callback(response);
    },

    *fetchEditCourse({ payload, callback }, { call, put }) {
      const response = yield call(updateCourse, { ...payload });
      if (callback && typeof callback === "function") callback(response);
    },

    *fetchDeleteCourse({ payload, callback }, { call, put }) {
      const response = yield call(deleteCourse, { ...payload });
      if (callback && typeof callback === "function") callback(response);
    },
  },

  reducers: {
    changeCourse(state, action) {
      return {
        ...state,
        courseData: action.payload,
      };
    },
  },
};
