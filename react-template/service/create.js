import request from "@/utils/request";
export async function getMainCampaignId() {
    
  return request({
    url: "/cmc-main-campaign/id",
    method: "GET",
  });
}
