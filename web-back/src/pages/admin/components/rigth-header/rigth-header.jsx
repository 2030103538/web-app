import React from "react"
import { Layout, Button, message, Modal } from 'antd';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,

} from '@ant-design/icons';

import ajax from "./../../../../api/index"
import { rmUser, loginOut } from './../../../../api/admin'


import "./rigth-header.css"
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { confirm } = Modal;

class RightHeader extends React.Component{
    static propTypes ={
      collapsed:PropTypes.bool.isRequired,
      toggle:PropTypes.func.isRequired
    };


    state = {
     picurl:'',
     notice:''
   };


    componentDidMount() {
        this._weather();
    }

    _weather(){
        const city = "贵阳";
        const key = "KnHVOML3NCoHEjn8SsDESlKnGsexhhr7";
        const url = `/baidu_api/weather?location=${city}&output=json&ak=${key}`;

        ajax(url).then((data)=>{
            if(data.error === 0){
                let result = data.results[0].weather_data[0];
                console.log(result);
                let picurl = result.dayPictureUrl;
                let notice = result.weather+ ''+ result.temperature;
                this.setState({
                    picurl,
                    notice
                })
            }
        }).catch((error)=>{
           message.error('获取失败'+error)
        })
    }

    _loginOut(){
        confirm({
            title: '你确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: '知我心者，谓我心忧',
            cancelText:"取消",
            okText:'确定',
            onOk:()=> {
               loginOut().then((val)=>{
                   if(val.data.status === 1){
                       rmUser();
                       message.success(val.mag)
                   }else {
                       rmUser();
                       message.success('服务器异常')
                   }
                   this.props.history.replace('/login')
               }).catch((err)=>{
                   rmUser();
                   message.success(err.mag)
               })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        return(
            <Header className="header" style={{ padding: 0 }}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.props.toggle,
                })}
                <div className="header-box">
                    <h3>猛男手搓计划-后台系统</h3>

                    <div className="header-but-box">
                        <img src={this.state.picurl} alt=""/>
                        <span> {this.state.notice} </span>
                        <Button type="dashed" className="header-but" onClick={()=>this._loginOut()}>退出</Button>
                    </div>

                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)