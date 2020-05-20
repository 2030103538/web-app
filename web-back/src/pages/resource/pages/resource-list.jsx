import React from "react"
import { Card, Button, Table, Switch, Divider, Modal } from 'antd'
class ResourceList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             dataSource : [
                {
                    id: '1',
                    youjiaoziyuan: '活动按回购后果和',
                    fengmian: 'http://itlike.com/uploads/picture/20191226/3a78c280bac4e53d86f3f0cfce8ab0ed.png',
                    zuozhe: '周星驰',
                    fenlei:2,
                    is_focus:0
                },
                {
                    id: '2',
                    youjiaoziyuan: '活动按回购后果和',
                    fengmian: 'http://itlike.com/uploads/picture/20191226/17e8f1b211166533ba802045d037a634.jpg',
                    zuozhe: '周星驰',
                    fenlei:2,
                    is_focus:0
                },
                 {
                     id: '2',
                     youjiaoziyuan: '活动按回购后果和',
                     fengmian: 'http://itlike.com/uploads/picture/20191226/3a78c280bac4e53d86f3f0cfce8ab0ed.png',
                     zuozhe: '周星驰',
                     fenlei:2,
                     is_focus:0
                 },
                 {
                     id: '2',
                     youjiaoziyuan: '活动按回购后果和',
                     fengmian: 'http://itlike.com/uploads/picture/20191226/3a78c280bac4e53d86f3f0cfce8ab0ed.png',
                     zuozhe: '周星驰',
                     fenlei:2,
                     is_focus:0
                 },
                 {
                     id: '2',
                     youjiaoziyuan: '活动按回购后果和',
                     fengmian: 'http://itlike.com/uploads/picture/20191226/abcf3c99dc3378339fb5aa02c678b973.jpg',
                     zuozhe: '周星驰',
                     fenlei:2,
                     is_focus:0
                 },
                 {
                     id: '2',
                     youjiaoziyuan: '活动按回购后果和',
                     fengmian: 'http://itlike.com/uploads/picture/20191226/3a78c280bac4e53d86f3f0cfce8ab0ed.png',
                     zuozhe: '周星驰',
                     fenlei:2,
                     is_focus:0
                 }
            ],
             total:100,
             pegaes:3
        }
    }
    render() {
        let addbut = (
            <Button  type="primary" onClick={()=>{
                this.props.history.push('/resource/resource-add')
            }}>
                添加幼教资源
            </Button>
        );


        const columns = [
            {title: 'ID', dataIndex: 'id', key: 'id',align:'center'},
            {title: '名称', dataIndex: 'youjiaoziyuan', key: 'youjiaoziyuan',align:'center',width:'15%'},
            {title: '幼教封面', dataIndex: 'fengmian', key: 'fengmian',align:'center',width:'15%',render:(text,rec)=>{
                return(
                    <img src={text} alt="" width={'100%'}/>
                )
                }},
            {title: '作者', dataIndex: 'zuozhe', key: 'zuozhe',align:'center'},
            {title: '幼教分类', dataIndex: 'fenlei', key: 'fenlei',align:'center'},
            {title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align:'center',render:(text,rec)=>{
                return(
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                )
                }},
            {title: '操作',align:'center',render:(text,rec)=>{
                return(
                    <div>
                        <Button>编辑</Button>
                        <Divider type={'vertical'}/>
                        <Button onClick={()=>{
                            Modal.confirm({
                                title:"确定删除",
                                content: '月色真美',
                                okText:'确定',
                                cancelText:'取消',
                                onOk:()=>{

                                }
                            })
                        }}>删除</Button>
                    </div>
                )
                }}
        ];

        return(
            <Card title={'幼教资源列表'} extra={addbut}>
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

export default ResourceList