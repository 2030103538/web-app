import React from "react"
import {Card, Button, Table, Switch, Divider, Modal, notification,message} from 'antd'
import {getlist,isfocus,shanc} from "../../../api/lifejob"
import config from './../../../config/config'
class LiftList extends React.Component {
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
    _getlist=(page_num=1,page_size=3)=>{
        getlist(page_num,page_size).then((val)=>{
            this.setState({
               total:val.data.data.counts[0].counts,
               dataSource:val.data.data.list
            });

        }).catch((val)=>{
            console.log(val);
        })
    };

    render() {
        let addbut = (
            <Button  type="primary" onClick={()=>{
                this.props.history.push('/lifejob/life-add')
            }}>
                添加职场人生资源
            </Button>
        );


        const columns = [
            {title: 'ID', dataIndex: 'id', key: 'id',align:'center'},
            {title: '名称', dataIndex: 'z_name', key: 'z_name',align:'center',width:'15%'},
            {title: '职场封面', dataIndex: 'z_img', key: 'z_img',align:'center',width:'15%',render:(text,rec)=>{
                    return(
                        <img src={config.H_URL+text} alt="" width={'100%'}/>
                    )
                }},
            {title: '作者', dataIndex: 'z_zuozhe', key: 'z_zuozhe',align:'center'},
            {title: '开始时间', dataIndex: 'z_time', key: 'z_time',align:'center'},
            {title: '职场培训', dataIndex: 'peixun', key: 'peixun',align:'center'},
            {title: '职场嘉裕', dataIndex: 'jiayuan', key: 'jiayuan',align:'center'},
            {title: '价格', dataIndex: 'z_jiage', key: 'z_jiage',align:'center'},
            {title: '首页焦点', dataIndex: 'z_focus', key: 'z_focus',align:'center',render:(text,rec)=>{
                    return(
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rec.z_focus === 1} disabled={rec.z_focusimg.length === 0}
                                onChange={(change)=>{
                                    console.log(change);
                                    isfocus(rec.id,change ? 1 : 0).then((val)=>{
                                        if (val.data.status === 1){
                                            notification.info({
                                                message: `修改成功`,
                                                description: `${change ? '设置焦点图成功' :'取消焦点图'}`,
                                                duration:1.5
                                            })
                                        }
                                    })
                                }} />
                    )
                }},
            {title: '操作',align:'center',render:(text,rec)=>{
                    return(
                        <div>
                            <Button onClick={()=>{
                                this.props.history.push({
                                    pathname:'/lifejob/life-edi',
                                    state:{
                                        live:rec
                                    }
                                })
                            }}>编辑</Button>
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

export default LiftList