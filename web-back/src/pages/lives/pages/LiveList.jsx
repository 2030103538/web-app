import React from "react"
import { Card, Button, Table, Switch, Divider, Modal, message, notification } from 'antd'
import { getlist, shanc, isfocus } from './../../../api/zhibo'
import config from './../../../config/config'
class LiveList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            total:0,
            pegaes:3
        }
    }
    componentDidMount() {
        this._getlist();
    }



    _getlist = (page_num=1,page_size=3)=>{
        getlist(page_num,page_size).then((val)=>{
            this.setState({
                total:val.data.data.counts[0].counts,
                dataSource:val.data.data.list
            });
            console.log(this.state.dataSource);
        })

    };

    render() {
        let addbut = (
            <Button  type="primary" onClick={()=>{
                this.props.history.push('/live/live-add')
            }}>
                添加直播资源
            </Button>
        );


        const columns = [
            {title: 'ID', dataIndex: 'id', key: 'id',align:'center'},
            {title: '名称', dataIndex: 'b_name', key: 'b_name',align:'center',width:'15%'},
            {title: '直播封面', dataIndex: 'b_img', key: 'b_img',align:'center',width:'15%',render:(text,rec)=>{
                    return(
                        <img src={config.H_URL+text} alt="" width={'100%'}/>
                    )
                }},
            {title: '作者', dataIndex: 'b_zuozhe', key: 'b_zuozhe',align:'center'},
            {title: '直播主题', dataIndex: 'b_zhuti', key: 'b_zhuti',align:'center'},
            {title: '适合人群', dataIndex: 'b_renqun', key: 'b_renqun',align:'center'},
            {title: '开始时间', dataIndex: 'b_kaitime', key: 'b_kaitime',align:'center'},
            {title: '结束时间', dataIndex: 'b_jietime', key: 'b_jietime',align:'center'},
            {title: '价格', dataIndex: 'b_jiage', key: 'b_jiage',align:'center'},
            {title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align:'center',render:(text,rec)=>{
                    return(
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rec.b_isfocus === 1} disabled={rec.b_focus.length === 0}
                        onChange={(change)=>{
                            console.log(change);
                            isfocus(rec.id,change ? 1 : 0).then((val)=>{
                                if (val.data.status === 1){
                                    notification.info({
                                        message: `课程修改成功`,
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
                                    pathname:'/live/live-edit',
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
                                        shanc(rec.id).then((val)=>{
                                            message.success(val.data.msg);
                                            console.log(val);
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
            <Card title={'职场资源列表'} extra={addbut}>
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

export default LiveList