import request from "@/utils/request";
import { stringify } from "qs";

export async function register(data) {
  //新建用户
  return request({
    url: "/user",
    method: "post",
    data,
  });
}
// 登录
export async function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
// 获取单个用户
export async function getUser(data) {
  return request({
    url: `/user?${stringify(data)}`,
    method: "get",
  });
}
export async function getUsers(data) {
  return request({
    url: `/users?${stringify(data)}`,
    method: "get",
  });
}

// 修改
export async function modifyUser(data) {
  return request({
    url: "/user",
    method: "put",
    data,
  });
}
//  上传头像
export async function fileUpload(data) {
  return request({
    url: "/upload/avatar",
    method: "post",
    data,
  });
}

export async function downloadImg(data) {
  return request({
    url: `/download/userImg?${stringify(data)}`,
    method: "get",
    type: "blob",
  });
}
