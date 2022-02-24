import request from "@/utils/request";
import { stringify } from "qs";
//获取文章类别列表
export const list = async (data) => {
  return request({
    url: `/list?${stringify(data)}`,
    method: "get",
    data,
  });
};
//新建文章类别
export const create = async (data) => {
  return request({
    url: "/article",
    method: "post",
    data,
  });
};
//更新文章类别
export const update = async (data) => {
  return request({
    url: "/article",
    method: "put",
    data,
  });
};
//删除文章类别
export const del = async (data) => {
  return request({
    url: "/article",
    method: "delete",
    data,
  });
};
