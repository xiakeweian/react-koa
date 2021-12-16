import request from "@/utils/request";
import { stringify } from "qs";
// 上传文件
export async function uploadFile() {
  return request({
    url: "/upload/file",
    method: "GET",
  });
}
export async function downloadList() {
  return request({
    url: "/download/file-list",
    method: "GET",
  });
}
export async function fileList(params) {
  return request({
    url: `/file/list?${stringify(params)}`,
    method: "GET",
  });
}
