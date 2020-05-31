import React from "react"
import { Card, Form, Input, Select, message, Button, Divider, DatePicker } from 'antd'
import UploadList from './../../../components/UploadList'
import Editor from './../../../components/Editor'
import Tag from '../../../components/Tags'
import moment from 'moment'
import {getdizhi,getbiaoqian,activities_zhaosheng,activities_zhouqi,activities} from '../../../api/huodong'
const { Option } = Select;


class ActivAdd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading: false,
            imageUrl:'',
            focusimg:'',
            hdizhi:[],
            hduixiang:[],
            hzhouqi:[],
            hbiaoqian:[]
        };
        this.editorRef1 = React.createRef();
        this.editorRef2 = React.createRef();
        this.editorRef3 = React.createRef();
    }

    componentDidMount() {
        getdizhi().then((val)=>{
            console.log(val.data.data);
            this.setState({
                hdizhi:val.data.data
            })
        });
        activities_zhaosheng().then((val)=>{
            this.setState({
                hduixiang:val.data.data
            })
        });
        activities_zhouqi().then((val)=>{
            this.setState({
                hzhouqi:val.data.data
            });
        });

    }


    render() {

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
        const onFinish = values => {
            const {imageUrl,focusimg} = this.state;
            console.log('Success:', values,values.h_mame);
            let tags = this.state.hbiaoqian.join(',');
            let h_jieshao = '';
            let h_anpai ='';
            let h_riqi = '';
            let h_time =moment(values.h_time).format('YYYY-MM-DD');
            if(this.editorRef1.current.getcontent()){
                h_jieshao = this.editorRef1.current.getcontent()
            }
            if (this.editorRef2.current.getcontent()){
                h_anpai = this.editorRef2.current.getcontent();
            }
            if (this.editorRef3.current.getcontent()){
                h_riqi = this.editorRef3.current.getcontent();
            }
            console.log(h_time);
            activities( values.h_mame, h_time, imageUrl, tags, values.h_dizhid, values.h_tianshuid,values.h_duixiangid,h_jieshao, h_anpai, h_riqi,
                focusimg).then((val)=>{
                if(val.data.status === 1){
                    message.success(val.data.msg);
                    this.props.history.goBack();
                }
            })

        };
        const upploadfun = (data)=>{
            this.setState({
                imageUrl:data.file.response.data.g_img
            })
        };
        const upploadfun1 = (data)=>{
            this.setState({
                focusimg:data.file.response.data.g_img
            });
        };
        const Tagfun = (data)=>{
            this.setState({
                hbiaoqian:data
            })
        };


        const {hdizhi,hduixiang,hzhouqi,imageUrl,focusimg} = this.state;
        return(
            <Card
                title={'添加活动资源'}
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="活动名称"
                        name="h_mame"
                        rules={[{ required: true, message: '请输入活动名称!' }]}
                    >
                        <Input placeholder={'请输入活动名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="日期选择"
                        name="h_time"
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="招生对象"
                        name="h_duixiangid"
                        rules={[{ required: true, message: '招生对象!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择分类"
                        >
                            {
                                hduixiang.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.duixinag}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="活动地点"
                        name="h_dizhid"
                        rules={[{ required: true, message: '活动地点!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择地址"
                        >

                            {
                                hdizhi.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.huodiz}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="活动周期"
                        name="h_tianshuid"
                        rules={[{ required: true, message: '活动周期!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择天数"
                        >

                            {
                                hzhouqi.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.zhouqi}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="添加标签"
                        name="h_biaoqianid"
                    >
                       <Tag Tagfun={Tagfun}/>
                    </Form.Item>

                    <Form.Item
                        label="价格"
                        name="h_anpai"
                        rules={[{ required: true, message: '请输入价格!' }]}
                    >
                        <Input placeholder={'请输入价格'} style={{width:'120px'}}/>
                    </Form.Item>
                    <Form.Item
                        label="资源封面"
                        name="fengmian"
                    >

                            <UploadList
                                upload_name={'h_img'}
                                upload_title={'资源封面'}
                                upload_img={imageUrl}
                                upload_url={'/api/auth/activities/activities_img'}
                                upload_fun={upploadfun}/>

                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus"
                    >
                        <UploadList
                            upload_name={'h_img'}
                            upload_title={'首页轮播图'}
                            upload_img={focusimg}
                            upload_url={'/api/auth/activities/activities_img'}
                            upload_fun={upploadfun1}/>
                    </Form.Item>
                    <Form.Item
                        label="介绍"
                        name="h_jieshao"
                        wrapperCol={{span:20}}
                    >
                     <Editor ref={this.editorRef1} upload_url={'/api/auth/activities/activities_img'} upload_name={'h_img'}/>
                    </Form.Item>
                    <Form.Item
                        label="安排"
                        name="h_anpai"
                        wrapperCol={{span:20}}
                    >
                        <Editor ref={this.editorRef2} upload_url={'/api/auth/activities/activities_img'} upload_name={'h_img'}/>
                    </Form.Item>
                    <Form.Item
                        label="日期"
                        name="h_riqi"
                        wrapperCol={{span:20}}
                    >
                        <Editor ref={this.editorRef3} upload_url={'/api/auth/activities/activities_img'} upload_name={'h_img'}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span:20}}
                    >
                        <div style={{textAlign:'center'}}>
                            <Button type={'primary'} htmlType="submit">保存</Button>
                            <Divider type="vertical" />
                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ActivAdd