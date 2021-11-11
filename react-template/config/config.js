// https://umijs.org/config/
import pageRoutes from "./router.config";

const plugins = [
  [
    "umi-plugin-react",
    {
      antd: true,
      dva: {
        // dynamicImport: true, //是否启用按需加载
        hmr: true, //是否启用 dva 的 热更新
      },
      title: "react-pc-template",
      locale: {
        enable: true, // default false
        default: "zh-CN", // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
    },
  ],
];

export default {
  // add for transfer to umi
  plugins,
  history: "hash",
  treeShaking: true, //去除引用但未使用的代码
  targets: {
    ie: 11,
  },
  // 路由配置
  routes: pageRoutes,
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
};
