import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'login', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Login/models/login.js').default) });
app.model({ namespace: 'register', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Register/models/register.js').default) });
app.model({ namespace: 'analysis', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Dashboard/models/analysis.js').default) });
app.model({ namespace: 'article', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Dashboard/models/article.js').default) });
app.model({ namespace: 'campaign', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Dashboard/models/campaign.js').default) });
app.model({ namespace: 'create', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Create/models/create.js').default) });
app.model({ namespace: 'index', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Authority/models/index.js').default) });
app.model({ namespace: 'calendar', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/Calendar/models/calendar.js').default) });
app.model({ namespace: 'index', ...(require('/Users/mlamp/Documents/mySpace/react-koa/react-template/pages/File/models/index.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
