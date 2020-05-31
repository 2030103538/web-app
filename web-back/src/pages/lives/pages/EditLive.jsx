import React from "react"
import { Card, Form, Input, Select, message, Button, Divider, DatePicker } from 'antd'
import UploadList from './../../../components/UploadList'
import { xiugailist, getzhuti, getrenqun} from './../../../api/zhibo'
import { gatUser } from './../../../api/admin'
import moment from 'moment'
const { Option } = Select;
const { RangePicker } = DatePicker;


class LiveAdd extends React.Component {

        constructor(props){
            super(props);
            this.state={
                imageUrl:'',
                focusImg:'',
                zhuti:[],
                renqun:[]
            };
            this.liveForm = React.createRef();

        }

    componentDidMount() {
        if(!this.props.location.state){
            this.props.history.replace('/live');
            return;
        }
        const live = this.props.location.state.live;
        console.log(live);
        this.liveForm.current.setFieldsValue({
            z_mame:live.b_name,
            z_zuozhe:live.b_zuozhe,
            z_renqun:live.b_renqunid,
            z_jiayuan:live.b_zhutiid,
            z_jiage:live.b_jiage,
            time:[moment(live.b_kaitime),moment(live.b_jietime)],
            z_dizhi:live.b_url
        });
        this.setState({
            imageUrl:live.b_img,
            focusImg:live.b_focus
        });
        getzhuti().then((val)=>{
            this.setState({
                zhuti:val.data.data
            });
        });
        getrenqun().then((val)=>{
            this.setState({
                renqun:val.data.data
            });
        });
    }

    render() {

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
        const onFinish = values => {
            const { imageUrl,focusImg } = this.state;
            if (!imageUrl){
                message.success('请上传封面');
                return;
            }

            const time = moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss');
            const time1 = moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss');
            xiugailist(this.props.location.state.live.id,values.z_mame,values.z_zuozhe,time,time1,values.z_renqun,values.z_jiayuan,
                Number(values.z_jiage),values.z_dizhi,imageUrl,focusImg).then((val)=>{
                message.success(val.data.msg)
            }).catch((val)=>{
                console.log(val);
                message.error(val.msg)
            })
        };

        const { renqun, zhuti } = this.state;

        return(

            <Card
                title={'添加直播资源'}
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                    ref={this.liveForm}
                >
                    <Form.Item
                        label="直播课名称"
                        name="z_mame"
                        rules={[{ required: true, message: '请输入资源名称!' }]}
                    >
                        <Input placeholder={'请输入资源名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="作者"
                        name="z_zuozhe"
                        rules={[{ required: true, message: '请输入作者!' }]}
                    >
                        <Input placeholder={'请输入作者'} />
                    </Form.Item>
                    <Form.Item
                        label="日期选择"
                        name="time"
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label="适用人群"
                        name="z_renqun"
                        rules={[{ required: true, message: '适用人群!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择分类"
                        >
                            {
                                renqun.map((item)=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.b_renqun}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容主题"
                        name="z_jiayuan"
                        rules={[{ required: true, message: '内容主题!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择主题"
                        >
                            {
                                zhuti.map((item)=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.b_zhuti}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="z_jiage"
                        rules={[{ required: true, message: '请输入价格!' }]}
                    >
                        <Input placeholder={'免费则输入0'} style={{width:'120px'}}/>
                    </Form.Item>
                    <Form.Item
                        label="直播地址"
                        name="z_dizhi"
                        rules={[{ required: true, message: '直播地址!' }]}
                    >
                        <Input placeholder={'直播url'} />
                    </Form.Item>
                    <Form.Item
                        label="资源封面"
                        name="fengmian"
                    >

                            <UploadList
                                upload_name={'z_img'}
                                upload_img={this.state.imageUrl}
                                upload_title={'资源封面'}
                                upload_url={'/api/auth/live/zhibo_img'}
                                upload_fun={(data)=>{
                                    message.success(data.file.response.msg);
                                    this.setState({
                                        imageUrl:data.file.response.data.g_img
                                    });
                                }}/>

                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus"
                    >
                        <UploadList
                            upload_name={'z_img'}
                            upload_img={this.state.focusImg}
                            upload_title={'首页轮播图'}
                            upload_url={'/api/auth/live/zhibo_img'}
                            upload_fun={(data)=>{
                                message.success(data.file.response.msg);
                                    this.setState({
                                    focusImg:data.file.response.data.g_img
                                });
                            }}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span:20}}
                    >
                        <div style={{textAlign:'center'}}>
                            <Button type={'primary'} htmlType="submit">修改</Button>
                            <Divider type="vertical" />
                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default LiveAdd