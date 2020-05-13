import React from 'react';
import {connect} from "react-redux"

//路由配置
import { HashRouter, Switch, Route } from "react-router-dom"

//组件引入
import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"


function App() {
  return (
    <HashRouter>
        <Switch>
            <Route path={"/login"} component={Login}/>
            <Route path={"/admin"} component={Admin}/>
        </Switch>
    </HashRouter>
  );
}

const mapStateToProps = (state)=>{

};
const mapDispatchToProps = (dispatch)=>{

};
export default connect(mapStateToProps,mapDispatchToProps)(App);
