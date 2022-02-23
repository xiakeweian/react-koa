export default [
  {
    path: "/login",
    name: "login",
    component: "./Login",
  },
  {
    path: "/register",
    name: "register",
    component: "./Register",
  },
  {
    path: "/",
    component: "../layouts",
    routes: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard/analysis",
        routes: [
          { path: "/dashboard/analysis", component: "./Dashboard/analysis" },
        ],
      },
      {
        path: "/dashboard/monitor",
        routes: [
          { path: "/dashboard/monitor", component: "./Dashboard/monitor" },
          {
            path: "/dashboard/monitor/create",
            component: "./Dashboard/monitor",
          },
        ],
      },
      {
        path: "/dashboard/workplace",
        routes: [
          { path: "/dashboard/workplace", component: "./Dashboard/workplace" },
        ],
      },
      {
        path: "/create",
        name: "create",
        component: "./Create",
      },
      {
        path: "/edit/:id",
        name: "create",
        component: "./Create",
      },
      {
        path: "/authority",
        routes: [
          {
            path: "/authority",
            redirect: "/authority/user",
          },
          { path: "/authority/user", component: "./Authority/User" },
          { path: "/authority/role", component: "./Authority/Role" },
        ],
      },
      {
        path: "/calendar",
        routes: [{ path: "/calendar", component: "./Calendar" }],
      },
      {
        path: "/user-center",
        routes: [{ path: "/user-center", component: "./UserCenter" }],
      },
      {
        path: "/file",
        routes: [{ path: "/file", component: "./File" }],
      },
      {
        path: "/custom",
        routes: [
          {
            path: "/custom",
            redirect: "/custom/custom-transfer",
          },
          {
            path: "/custom/custom-transfer",
            component: "./Custom/CustomTransfer",
          },
          {
            path: "/custom/custom-cascader",
            component: "./Custom/CustomCascader",
          },
        ],
      },
      {
        path:'/tab',
        routes: [{ path: "/tab", component: "./Tab" }],
      }
    ],
  },
];
