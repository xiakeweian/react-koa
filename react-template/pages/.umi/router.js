import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/login',
    name: 'login',
    component: require('../Login').default,
    exact: true,
    _title: 'react-pc-template',
    _title_default: 'react-pc-template',
  },
  {
    path: '/register',
    name: 'register',
    component: require('../Register').default,
    exact: true,
    _title: 'react-pc-template',
    _title_default: 'react-pc-template',
  },
  {
    path: '/',
    component: require('../../layouts').default,
    routes: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
        exact: true,
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/dashboard/analysis',
        routes: [
          {
            path: '/dashboard/analysis',
            component: require('../Dashboard/analysis').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/dashboard/monitor',
        routes: [
          {
            path: '/dashboard/monitor',
            component: require('../Dashboard/monitor').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/dashboard/monitor/create',
            component: require('../Dashboard/monitor').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/dashboard/workplace',
        routes: [
          {
            path: '/dashboard/workplace',
            component: require('../Dashboard/workplace').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/dashboard/article',
        routes: [
          {
            path: '/dashboard/article',
            component: require('../Dashboard/article').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/create',
        name: 'create',
        component: require('../Create').default,
        exact: true,
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/edit/:id',
        name: 'create',
        component: require('../Create').default,
        exact: true,
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/authority',
        routes: [
          {
            path: '/authority',
            redirect: '/authority/user',
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/authority/user',
            component: require('../Authority/User').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/authority/role',
            component: require('../Authority/Role').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/calendar',
        routes: [
          {
            path: '/calendar',
            component: require('../Calendar').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/user-center',
        routes: [
          {
            path: '/user-center',
            component: require('../UserCenter').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/file',
        routes: [
          {
            path: '/file',
            component: require('../File').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/custom',
        routes: [
          {
            path: '/custom',
            redirect: '/custom/custom-transfer',
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/custom/custom-transfer',
            component: require('../Custom/CustomTransfer').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/custom/custom-cascader',
            component: require('../Custom/CustomCascader').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/custom/custom-role',
            component: require('../Custom/CustomRole').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            path: '/custom/custom-select-cascader',
            component: require('../Custom/CustomSelectCascader').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        path: '/tab',
        routes: [
          {
            path: '/tab',
            component: require('../Tab').default,
            exact: true,
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: true },
              ),
            _title: 'react-pc-template',
            _title_default: 'react-pc-template',
          },
        ],
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'pages', hasRoutesInConfig: true },
          ),
        _title: 'react-pc-template',
        _title_default: 'react-pc-template',
      },
    ],
    _title: 'react-pc-template',
    _title_default: 'react-pc-template',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/mlamp/Documents/mySpace/react-koa/react-template/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'pages', hasRoutesInConfig: true },
      ),
    _title: 'react-pc-template',
    _title_default: 'react-pc-template',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
