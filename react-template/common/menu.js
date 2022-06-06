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
        name: "主列表",
        path: "monitor",
      },
      {
        name: "工作台",
        path: "workplace",
      },
      {
        name: "文章列表",
        path: "article",
      },
    ],
  },
  {
    name: "create",
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
    name: "趋势",
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
  {
    name: "自定义组件",
    path: "custom",
    children: [
      {
        name: "自定义穿梭框",
        path: "custom-transfer",
      },
      {
        name: "自定义级联面板",
        path: "custom-cascader",
      },
      {
        name: "自定义角色管理",
        path: "custom-role",
      },
      {
        name: "自定义选择级联",
        path: "custom-select-cascader",
      },
    ],
  },
  {
    name: "标签页",
    path: "tab",
  },
  {
    name: "Three",
    path: "three",
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
