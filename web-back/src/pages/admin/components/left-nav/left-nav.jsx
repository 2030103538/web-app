import React from "react"
import { Layout, Menu } from 'antd';
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import './fonts/iconfont.css'
import "./left-nav.css"
import imglop from "./images/login.jpg"

import navRoute from "./config/navRoute"

const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends React.Component{

    state = {
        navRoute
    };
    static propTypes = {
        collapsed: PropTypes.bool.isRequired
    };


_renderMeru = (nav)=>{
      return nav.map(item =>{
          if (!item.children){
              return(
                  <Menu.Item key={item.key}>
                      <Link to={item.key}>
                          <span className={item.icon} style={this.props.collapsed ? {fontSize: 25} : {}}/>
                          <span style={this.props.collapsed ? {display: "none"} : {}}>{item.title}</span>
                      </Link>
                  </Menu.Item>
              )
          }else {
              return(
                  <SubMenu key={item.key}
                           title={ <span>
                                    <span className={item.icon} style={this.props.collapsed ? {fontSize: 25} : {}}/>
                                    <span style={this.props.collapsed ? {display: "none"} : {}}>{item.title}</span>
                           </span>  }>
                      {this._renderMeru(item.children)}
                  </SubMenu>
              )
          }
      })
    };

   render() {
       let path = this.props.location.pathname;
       return(
           <Sider trigger={null} collapsible collapsed={this.props.collapsed} className="text-color">
               <div className="logo" >
                   <div className="logo-img">
                       <img src={imglop} alt=""/>
                   </div>
                   <h3>管理员</h3>
               </div>
               <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
                   {this._renderMeru(this.state.navRoute)}
               </Menu>
           </Sider>
       )
   }
}

export default withRouter(LeftNav)