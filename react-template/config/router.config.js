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
    path: "/3d",
    name: "3d",
    component: "./Three3D",
  },
  { path: "/city", name: "city", component: "./Three3D/City" },
  { path: "/human", name: "human", component: "./Three3D/Human" },
  { path: "/earth1", name: "earth1", component: "./Three3D/Earth1" },
  { path: "/earth", name: "earth", component: "./Three3D/Earth" },
  { path: "/star", name: "star", component: "./Three3D/Star" },
  { path: "/cube", name: "cube", component: "./Three3D/Cube" },
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
        path: "/dashboard/article",
        routes: [
          { path: "/dashboard/article", component: "./Dashboard/article" },
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
          {
            path: "/custom/custom-role",
            component: "./Custom/CustomRole",
          },
          {
            path: "/custom/custom-select-cascader",
            component: "./Custom/CustomSelectCascader",
          },
          // custom-role
        ],
      },
      {
        path: "/tab",
        routes: [{ path: "/tab", component: "./Tab" }],
      },
      {
        path: "/three",
        routes: [{ path: "/three", component: "./ThreeDom" }],
      },
    ],
  },
];
