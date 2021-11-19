import request from "@/utils/request";
export async function fileUpload(data) {
  console.log(data, "ddddata");
  return request({
    url: "/upload/avatar",
    method: "post",
    data,
  });
}
