import { getMainCampaignId } from "@/service/create";
export default {
  namespace: "create",
  state: {
    main_campaign_id: "",
    main_campaign_detail: {},
  },
  effects: {
    *getMainCampaignId({ payload }, { call, put }) {
      const res = yield call(getMainCampaignId);
      console.log("coming---->", res);
    },
    *getYearData({ payload }, { call, put }) {},
  },
  reducers: {},
};
