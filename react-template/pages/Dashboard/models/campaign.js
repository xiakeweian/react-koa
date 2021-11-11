import {
  fetchList,
  addOrEditCampaign,
  deleteCampaign,
  getMainCampaignDetail,
} from "@/service/campaign";
import router from "umi/router";
import { message } from "antd";
export default {
  namespace: "campaign",
  state: {
    campaignData: {
      data: [],
      pagination: false,
    },
    campaign_detail: {},
  },
  effects: {
    *fetchList({ payload, callback }, { call, put }) {
      const res = yield call(fetchList, payload);
      console.log(res, "ddd");
      if (res.code === 1) {
        yield put({
          type: "saveList",
          payload: {
            data: res.result.records,
            pagination: {
              current: res.result.current,
              size: res.result.size,
              total: res.result.total,
            },
          },
        });
      }
    },
    *addOrEditCampaign({ payload }, { call, put }) {
      const res = yield call(addOrEditCampaign, payload);
      if (res.code === 1) {
        message.success(res.msg);
        router.push("/dashboard/monitor");
      }
    },
    *fetchCampaignDetail({ payload, callback }, { call, put }) {
      const res = yield call(getMainCampaignDetail, payload);
      console.log(res, "dsdsd");
      if (res.code === 1) {
        yield put({
          type: "saveCampaignDetail",
          payload: res.result,
        });
        if (callback && typeof callback === "function") callback(res.result);
      }
    },
    *deleteCampaign() {},
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        campaignData: action.payload,
      };
    },
    saveCampaignDetail(state, action) {
      return {
        ...state,
        campaign_detail: action.payload,
      };
    },
  },
};
