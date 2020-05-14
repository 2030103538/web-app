import React from "react"
import { Layout } from 'antd';
import { withRouter } from "react-router-dom"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,

} from '@ant-design/icons';

import "./rigth-header.css"

const { Header } = Layout;


class RightHeader extends React.Component{

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return(
            <Header className="header" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
            </Header>
        )
    }
}

export default withRouter(RightHeader)