/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: "我的列表",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "课程列表",
        path: "analysis",
      },
      {
        name: "活动主题列表",
        path: "monitor",
      },
      {
        name: "工作台",
        path: "workplace",
      },
    ],
  },
  {
    name: "创建主题活动",
    path: "create",
  },
  {
    name: "账户管理",
    path: "authority",
    children: [
      {
        name: "用户管理",
        path: "user",
      },
    ],
  },
  {
    name: "日历",
    path: "calendar",
  },
  {
    name: "个人中心",
    path: "user-center",
  },
  {
    name: "文件系统",
    path: "file",
  },
];

function formatter(data, parentPath = "/", parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
