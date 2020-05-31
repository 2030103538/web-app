import React from "react"
import { Card, Form, Input, Select, message, Button, Divider, DatePicker  } from 'antd'
import UploadList from './../../../components/UploadList'
import Editor from './../../../components/Editor'
import moment from 'moment'
import { getjiayu, getpeixun, xiugailist } from '../../../api/lifejob'
const { Option } = Select;


class LiftAdd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading: false,
            imageUrl:'',
            focusimg:'',
            peixun:[],
            jiaoyu:[],
            html:''
        };
        this.fromref = React.createRef();
        this.fromref1 = React.createRef();
    }

    componentDidMount() {
        if(!this.props.location.state){
            this.props.history.replace('/lifejob');
            return;
        }
        const live = this.props.location.state.live;
        this.fromref1.current.setFieldsValue({
            z_jiage:live.z_jiage,
            z_jiaoyuid:live.z_jiaoyuid,
            z_jiayuanid:live.z_jiayuanid,
            z_zuozhe:live.z_zuozhe,
            z_time:moment(live.z_time),
            z_name:live.z_name
        });
        this.setState({
            imageUrl:live.z_img,
            focusimg:live.z_focusimg,
            html:live.z_neir,
            id:live.id
        });

        getjiayu().then((data)=>{
            this.setState({
                jiaoyu:data.data.data
            })
        });
        getpeixun().then((data)=>{
            this.setState({
                peixun:data.data.data
            })
        })
    }

    render() {

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
        const onFinish = values => {
            const {imageUrl,focusimg} = this.state;
            let html1 = this.fromref.current.getcontent() ||this.state.html || '';
            let times = moment(values.time).format("YYYY-MM-DD");

            xiugailist(this.state.id,values.z_name,imageUrl,values.z_jiage,values.z_zuozhe,times,html1,values.z_jiaoyuid,values.z_jiayuanid,
                focusimg).then((val)=>{
                if (val.data.status === 1){
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
            })
        };

        const {peixun,jiaoyu,imageUrl,focusimg,html} = this.state;
        return(
            <Card
                title={'添加职场人生资源'}
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                    ref={this.fromref1}
                >
                    <Form.Item
                        label="职场人生资源名称"
                        name="z_name"
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
                        label="开始时间"
                        name="z_time"
                        rules={[{ required: true, message: '选择时间!' }]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="学前教育分类"
                        name="z_jiaoyuid"
                        rules={[{ required: true, message: '选择分类!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择分类"
                        >

                            {
                                peixun.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.peixun}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="家园选择"
                        name="z_jiayuanid"
                        rules={[{ required: true, message: '选择领域!' }]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="选择领域"
                        >
                            {
                                jiaoyu.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.jiayuan}</Option>
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
                        <Input placeholder={'请输入价格'} style={{width:'120px'}}/>
                    </Form.Item>
                    <Form.Item
                        label="资源封面"
                        name="fengmian"
                    >

                        <UploadList
                            upload_name={'l_img'}
                            upload_title={'资源封面'}
                            upload_img={imageUrl}
                            upload_url={'/api/auth/lifejob/lifejob_img'}
                            upload_fun={upploadfun}/>

                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus"
                    >
                        <UploadList
                            upload_name={'l_img'}
                            upload_title={'首页轮播图'}
                            upload_img={focusimg}
                            upload_url={'/api/auth/lifejob/lifejob_img'}
                            upload_fun={upploadfun1}/>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="neirong"
                        wrapperCol={{span:20}}
                    >
                        <Editor ref={this.fromref} upload_url={'/api/auth/lifejob/lifejob_img'} upload_name={'l_img'} upload_html={html}/>
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

export default LiftAdd