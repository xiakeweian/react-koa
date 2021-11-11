import request from "@/utils/request";
import { stringify } from "qs";
export async function fetchList(data) {
  return request({
    url: `/campaign/list?${stringify(data)}`,
    method: "get",
    data,
  });
}
export async function addOrEditCampaign(data) {
  return request({
    url: "campaign/create",
    method: "post",
    data,
  });
}
export async function getMainCampaignDetail(data) {
  return request({
    url: `campaign/detail?${stringify(data)}`,
    method: "get",
  });
}
export async function deleteCampaign(data) {
  return request({
    url: "campaign/delete",
    method: "delete",
    data,
  });
}
