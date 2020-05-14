import React from "react"
import Homecat from "./component/home-cat"
import "./home.css"

import Source from "./source/source"
import Buy from "./buy/buy"
 class Hmome extends React.Component {
    render() {
        return(
            <div className="home-box">
                <div className="home-cat">
                    <Homecat urlLink={"/"} iconClass={"icon iconfont icon-changjingguanli"} carMIN={"首页"} carSub={"首页信息"} color={"aquamarine"}/>
                    <Homecat urlLink={"/"} iconClass={"icon iconfont icon-fuwudiqiu"} carMIN={"管理员"} carSub={"管理员信息"} color={"aqua"}/>
                    <Homecat urlLink={"/"} iconClass={"icon iconfont icon-icon_shezhi"} carMIN={"配置"} carSub={"配置信息"} color={"bisque"}/>
                </div>
                <div className={"home-cont"}>
                    <div className={"home-soucer"}>
                        <Source/>
                    </div>
                    <div className={"home-soucer"}>
                        <Buy/>
                    </div>
                </div>
            </div>
        )
    }
 }

export default Hmome