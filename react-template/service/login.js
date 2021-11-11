import request from "@/utils/request";

export async function register(data) {
  return request({
    url: "/register",
    method: "post",
    data,
  });
}
export async function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
