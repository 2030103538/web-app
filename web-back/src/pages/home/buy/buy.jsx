import React from "react"
import { Card } from "antd"
import Echarts from "echarts-for-react"
class Buy extends React.Component {
    getdata = ()=>{
      return{
          title: {
              text: '站点用户访问来源',
              subtext: '纯属虚构',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['幼教', '职场', '活动', '直播']
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                      {value: 335, name: '幼教'},
                      {value: 310, name: '职场'},
                      {value: 234, name: '活动'},
                      {value: 135, name: '直播'},
                  ],
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
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

export default Buy