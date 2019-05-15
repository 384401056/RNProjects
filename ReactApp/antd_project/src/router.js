import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin'
import Login from './page/login'
import Home from './page/home';
import NoMatch from './page/notmatch';
import Module from './page/module';
import Permission from './page/permission';
import Role from './page/role';
import NcAddress from './page/ncAddress';
import UserManage from './page/userManage';
import SyncData from './page/syncdata';
import CompRole from './page/compRole';
import CompPermission from './page/compPermission';
import Banner from './page/banner';
import BaseCount from './page/baseCount';
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';



export default class IRouter extends Component {

  render() {
    return (
      <div>
        {/* 全局配置国际化文案。 */}
        <LocaleProvider locale={zhCN}>
          <HashRouter>
            <App>
              <Route path="/" exact component={Login} />
              <Route path="/admin" render={() =>
                <Admin>
                  <Switch>
                    <Route path={"/admin/home"} component={Home} />
                    <Route path={"/admin/manager/moudle"} component={Module} />
                    <Route path={"/admin/manager/permission"} component={Permission} />
                    <Route path={"/admin/manager/role"} component={Role} />
                    <Route path={"/admin/manager/nc"} component={NcAddress} />
                    <Route path={"/admin/manager/setRole"} component={UserManage} />
                    <Route path={"/admin/company/syncData"} component={SyncData} />
                    <Route path={"/admin/company/role"} component={CompRole} />
                    <Route path={"/admin/company/setRole"} component={CompPermission} />
                    <Route path={"/admin/content/banner"} component={Banner} />
                    <Route path={"/admin/datasta/baseData"} component={BaseCount} />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              } />

            </App>
          </HashRouter>
        </LocaleProvider>
      </div>
    )
  }
}
