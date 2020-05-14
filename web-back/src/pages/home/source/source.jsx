import React from "react"
import { Card } from "antd"
import Echarts from "echarts-for-react"
class Source extends React.Component {

    getdata = ()=>{
        return{
            xAxis: {
                type: 'category',
                data: ['幼教', '职场', '活动', '直播']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80],
                type: 'bar'
            }]
        }
    };

    render() {
        return(
            <Card title={"资源统计"}>
                <Echarts option={this.getdata()}/>
            </Card>
        )
    }
}

export default Source