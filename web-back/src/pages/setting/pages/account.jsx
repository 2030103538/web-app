import React from "react"
import { Card, Form, Input, Upload, message, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { gatUser, xiugai, setUser } from './../../../api/admin'
import puBsub from 'pubsub-js'

import config from './../../../config/config'
import Xiugai from './xiugai'
class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadin:false,
            xiuShow:false,
            g_img:'',
            g_name:'',
            g_zhanghao:'',
            token:''
        };
        this.formRef = React.createRef();
    };
    //初始化生命周期
    componentDidMount() {
        const userData = gatUser();
        this.setState({
            g_img:userData.data.g_img,
            g_neme:userData.data.g_neme,
            g_zhanghao:userData.data.g_zhanghao,
            token:userData.data.token
        },()=>{
            const { g_neme, g_zhanghao } = this.state;
            this.formRef.current.setFieldsValue({
                g_zhanghao,
                g_neme
            })
        })
    }


    beforeUpload =(file)=> {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };



    handleChange = info => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file);
            // Get this url from response in real world.
           if (info.file.response && info.file.response.status === 0){
               message.success('头像上传成功');
               const g_img = config.H_URL + info.file.response.data.g_img;
               console.log(g_img);
               this.setState({
                   g_img,
                   loading:false
               })
           }
        }};

    _xiugai = () =>{
        this.setState({
            xiuShow:true
        })
    };

    _hanShow = ()=>{
      this.setState({
          xiuShow:false
      })
    };

    render() {

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        const onFinish = values => {

            const { token, g_img } = this.state;
            xiugai(token,values.g_neme,g_img).then((val)=>{
                console.log(val);
                if(val.status === 200){
                    setUser(val.data);
                    message.success(val.data.msg);
                    puBsub.publish('xiugaixx',{})
                }
            }).catch((err)=>{
                console.log(err);
                message.error('修改失败')
            })
        };
        const formItemLayout = {
            labelCol: {
                sm: { span: 2 },
            },
            wrapperCol: {
                sm: { span: 6 },
            },
        };


        return(
            <Card title={'管理员信息'}>
             <Form
                 onFinish={onFinish}
                 {...formItemLayout}
                 ref={this.formRef}
             >

                 <Form.Item
                     name="g_zhanghao"
                     rules={[{ required: true, message: '这就是正义!' }]}
                     label={'用户名'}
                 >
                     <Input disabled />
                 </Form.Item>

                 <Form.Item
                     name="g_neme"
                     rules={[{ required: true, message: '请输入名称!' }]}
                     label={'管理员名称'}
                 >
                     <Input/>
                 </Form.Item>

                 <Form.Item
                     name="g_img"
                     label={'管理员头像'}
                 >

                     <Upload
                         name="g_img"
                         listType="picture-card"
                         className="avatar-uploader"
                         showUploadList={false}
                         action="/api/auth/admin/upload_img"
                         beforeUpload={this.beforeUpload}
                         onChange={this.handleChange}
                     >
                         {this.state.g_img ? <img src={this.state.g_img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                     </Upload>

                 </Form.Item>

                 <Form.Item>
                     <Button type="primary" htmlType="submit" className="login-form-button">
                         修改
                     </Button>
                    或者 <a onClick={()=>this._xiugai()}>修改密码</a>
                 </Form.Item>
             </Form>
                <Xiugai visible={this.state.xiuShow} hanShow={this._hanShow}/>
            </Card>
        )
    }
}

export default Account