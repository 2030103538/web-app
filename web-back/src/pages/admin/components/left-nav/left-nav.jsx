import React from "react"
import { Layout, Menu } from 'antd';
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"
import puBsub from 'pubsub-js'
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import './fonts/iconfont.css'
import "./left-nav.css"
import { gatUser } from './../../../../api/admin'
import navRoute from "./config/navRoute"
import config from "./../../../../config/config"

const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            g_neme:'',
            g_img:'',
            navRoute
        }
    }



    static propTypes = {
        collapsed: PropTypes.bool.isRequired
    };
    componentDidMount() {
        const userdata = gatUser();
        this.setState({
            g_neme:userdata.data.g_neme,
            g_img:userdata.data.g_img
        });
        puBsub.subscribe('xiugaixx',(msg,data)=>{
            const userdata = gatUser();
            if (msg === 'xiugaixx') {
                this.setState({
                    g_neme:userdata.data.g_neme,
                    g_img:userdata.data.g_img
                });
            }
        })
    }


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
       let ppath = path.substr(0,path.indexOf('/',2)) ? path.substr(0,path.indexOf('/',2)) : path;
       return(
           <Sider trigger={null} collapsible collapsed={this.props.collapsed} className="text-color">
               <div className="logo" >
                   <div className="logo-img">
                       <img src={config.H_URL+this.state.g_img} alt=""/>
                   </div>
                   <h3>{this.state.g_neme}</h3>
               </div>
               <Menu theme="dark" mode="inline" defaultSelectedKeys={[ppath]}>
                   {this._renderMeru(this.state.navRoute)}
               </Menu>
           </Sider>
       )
   }
}

export default withRouter(LeftNav)