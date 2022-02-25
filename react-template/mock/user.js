import Mock from "mockjs";
// import uuid from "@/utils/utils.js";
export default {
  "POST /login": Mock.mock({
    code: 1,
    msg: "登录成功哈哈哈",
    data: {
      userId: "a69fe700-4855-11ec-ae95-4b682851feca",
      username: "admin",
      email: "307028004@qq.com",
      nickname: "haha",
      avatar: "/static/uploads/file-17ddc85b40a.jpg",
    },
  }),
  "GET /users": Mock.mock({
    code: 1,
    msg: "success",
    result: {
      current: 1,
      pages: 1,
      "records|1-10": [
        {
          nickname: Mock.mock("@name"),
          username: Mock.mock("@name"),
          userId: Mock.mock("@increment"),
          avatar: null,
          email: Mock.mock("@email"),
        },
      ],
      size: 10,
      total: 10,
    },
  }),

  // "POST /user": Mock.mock({
  //   code: 1,
  //   msg: "注册成功！",
  //   data: {
  //     userId: uuid(12, 12),
  //     username: Mock.mock("@name"),
  //     email: Mock.mock("@email"),
  //     nickName: Mock.mock("@name"),
  //     avatar: Mock.mock("@name"),
  //   },
  // }),
};

// export async function register(data) {
//   //新建用户
//   return request({
//     url: "/user",
//     method: "post",
//     data,
//   });
// }
// // 登录
// export async function login(data) {
//   return request({
//     url: "/login",
//     method: "post",
//     data,
//   });
// }
// // 获取单个用户
// export async function getUser(data) {
//   return request({
//     url: `/user?${stringify(data)}`,
//     method: "get",
//   });
// }
// export async function getUsers(data) {
//   return request({
//     url: `/users?${stringify(data)}`,
//     method: "get",
//   });
// }

// // 修改
// export async function modifyUser(data) {
//   return request({
//     url: "/user",
//     method: "put",
//     data,
//   });
// }
// //  上传头像
// export async function fileUpload(data) {
//   return request({
//     url: "/upload/avatar",
//     method: "post",
//     data,
//   });
// }

// export async function downloadImg(data) {
//   return request({
//     url: `/download/userImg?${stringify(data)}`,
//     method: "get",
//     type: "blob",
//   });
// }
