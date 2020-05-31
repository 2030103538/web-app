import React from "react"
import {Card, Button, Table, Switch, Divider, Modal, notification, message} from 'antd'
import config from './../../../config/config'
import {getlist,activities_focus,activities_shanc} from './../../../api/huodong'
class ActivList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource : [

            ],
            total:0,
            pegaes:3
        }
    }
    componentDidMount() {
        this._getlist();
    }



    _getlist = (page_num=1,page_size=3)=>{
        getlist(page_num,page_size).then((val)=>{
            console.log(val);
            this.setState({
                total:val.data.data.counts[0].counts,
                dataSource:val.data.data.list
            });
            // console.log(this.state.dataSource);
        })

    };
    render() {
        let addbut = (
            <Button  type="primary" onClick={()=>{
                this.props.history.push('/activities/activities-add')
            }}>
                添加活动资源
            </Button>
        );


        const columns = [
            {title: 'ID', dataIndex: 'id', key: 'id',align:'center'},
            {title: '活动名称', dataIndex: 'h_name', key: 'h_name',align:'center',width:'15%'},
            {title: '活动封面', dataIndex: 'h_img', key: 'h_img',align:'center',width:'15%',render:(text,rec)=>{
                    return(
                        <img src={config.H_URL+text} alt="" width={'100%'}/>
                    )
                }},
            {title: '适合对象', dataIndex: 'duixiang', key: 'duixiang',align:'center'},
            {title: '活动地点', dataIndex: 'huodiz', key: 'huodiz',align:'center'},
            {title: '活动标签', dataIndex: 'h_biaoqianid', key: 'h_biaoqianid',align:'center'},
            {title: '活动开始时间', dataIndex: 'h_time', key: 'h_time',align:'center'},
            {title: '活动天数', dataIndex: 'zhouqi', key: 'zhouqi',align:'center'},
            {title: '首页焦点', dataIndex: 'h_focus', key: 'h_focus',align:'center',render:(text,rec)=>{
                    return(
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rec.h_focus === 1} disabled={rec.h_focusimg.length === 0}
                                onChange={(change)=>{
                                    activities_focus(rec.id,change ? 1 : 0).then((val)=>{
                                        if (val.data.status === 1){
                                            notification.info({
                                                message: `活动修改成功`,
                                                description: `${change ? '设置焦点图成功' :'取消焦点图'}`,
                                                duration:1.5
                                            })
                                        }
                                    })
                                }}
                        />
                    )
                }},
            {title: '操作',align:'center',render:(text,rec)=>{
                    return(
                        <div>
                            <Button
                            onClick={()=>{
                                this.props.history.push({
                                    pathname:'/activities/activities-edit',
                                    state:{
                                        live:rec
                                    }
                                })
                            }}
                            >编辑</Button>
                            <Divider type={'vertical'}/>
                            <Button onClick={()=>{
                                Modal.confirm({
                                    title:"确定删除",
                                    content: '月色真美',
                                    okText:'确定',
                                    cancelText:'取消',
                                    onOk:()=>{
                                        activities_shanc(rec.id).then((val)=>{
                                            message.success(val.data.msg);
                                            this._getlist();
                                        })
                                    }
                                })
                            }}>删除</Button>
                        </div>
                    )
                }}
        ];

        return(
            <Card title={'活动资源列表'} extra={addbut}>
                <Table
                    columns={columns}
                    rowKey={"id"}
                    dataSource={this.state.dataSource}
                    pagination={{
                        total: this.state.total,
                        pageSize: this.state.pegaes,
                        onChange:(peganum,pagesize)=>{
                            console.log(peganum,pagesize);
                        }
                    }}
                />;
            </Card>
        )
    }
}

export default ActivList