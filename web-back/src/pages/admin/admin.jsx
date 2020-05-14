import React from 'react';
import {connect} from "react-redux"
import "./admin.css"

import { Layout } from 'antd';

import LeftNav from "./components/left-nav/left-nav"
import RigthHeader from "./components/rigth-header/rigth-header"
const { Content } = Layout;



function Admin () {
    return (

         <Layout className="admin-box">
                 <LeftNav/>
             <Layout className="site-layout">
                 <RigthHeader/>
                 <Content
                     className="site-layout-background"
                     style={{
                         margin: '24px 16px',
                         padding: 24,
                         minHeight: 280,
                     }}
                 >
                     Content
                 </Content>
             </Layout>
         </Layout>

    );
}

export default connect(null,null)(Admin);