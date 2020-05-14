import React from "react"
import { Layout, Button, message } from 'antd';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,

} from '@ant-design/icons';

import ajax from "./../../../../api/index"


import "./rigth-header.css"

const { Header } = Layout;


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
            // console.log(data);
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
                        <Button type="dashed" className="header-but">退出</Button>
                    </div>

                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)