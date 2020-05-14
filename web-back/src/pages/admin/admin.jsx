import React from 'react';
import {connect} from "react-redux"
import "./admin.css"
import { Switch, Redirect, Route } from "react-router-dom"

import { Layout } from 'antd';

import Home from "./../home/home"
import Liftjob from "./../liftjob/liftjob"
import Lives from "./../lives/lives"
import Activities from "./../activities/activities"
import Setting from "./../setting/setting"
import Resource from "./../resource/resource"
import Account from "./../setting/pages/account"
import Member from "./../setting/pages/member"
import Nott from "./../404/Nott"


import LeftNav from "./components/left-nav/left-nav"
import RigthHeader from "./components/rigth-header/rigth-header"
import Radio from "antd/lib/radio";
const { Content, Footer } = Layout;



class Admin extends React.Component{

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

   render() {

       return (

           <Layout className="admin-box">
               <LeftNav collapsed={this.state.collapsed}/>
               <Layout className="site-layout">
                   <RigthHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
                   <Content>
                       <Switch>
                           <Redirect from={"/"} exact to={"/home"}/>
                           <Route path={"/home"} component={Home} />
                           <Route path={"/resource"} component={Resource} />
                           <Route path={"/lifejob"} component={Liftjob} />
                           <Route path={"/activities"} component={Activities} />
                           <Route path={"/live"} component={Lives} />
                           <Route path={"/Setting"} component={Setting} />
                           <Route  component={Nott} />
                       </Switch>
                   </Content>
                   <Footer className="admin-fot">--猛男落泪--</Footer>
               </Layout>

           </Layout>

       );
   }

}

export default connect(null,null)(Admin);