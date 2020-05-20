import React from "react"
import { Card, Form, Input, Select, Upload, message, Button, Divider } from 'antd'
import { LoadingOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


class ResourceAdd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading: false,
            imageUrl:''
        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const propsg = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
            const onFinish = values => {
                console.log('Success:', values);
            };

        return(
            <Card
            title={'添加幼教资源'}
            >
              <Form
                  {...layout}
                  onFinish={onFinish}
              >
                  <Form.Item
                      label="资源名称"
                      name="youjiaoziyuan"
                      rules={[{ required: true, message: '请输入资源名称!' }]}
                  >
                      <Input placeholder={'请输入资源名称'}/>
                  </Form.Item>
                  <Form.Item
                      label="作者"
                      name="zuozhe"
                      rules={[{ required: true, message: '请输入作者!' }]}
                  >
                      <Input placeholder={'请输入作者'} />
                  </Form.Item>
                  <Form.Item
                      label="分类选择"
                      name="fenlei"
                      rules={[{ required: true, message: '请输入作者!' }]}
                  >
                      <Select
                          style={{ width: 200 }}
                          placeholder="选择分类"
                      >
                          <Option value="1">教学活动小助手</Option>
                          <Option value="2">教学活动小助手</Option>
                          <Option value="3">教学活动小助手</Option>
                          <Option value="4">教学活动小助手</Option>
                  </Select>
                  </Form.Item>
                  <Form.Item
                      label="班级选择"
                      name="banji"
                      rules={[{ required: true, message: '选择班级!' }]}
                  >
                      <Select
                          style={{ width: 200 }}
                          placeholder="选择班级"
                      >
                          <Option value="1">小班</Option>
                          <Option value="2">中班</Option>
                          <Option value="3">大班</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item
                      label="领域选择"
                      name="lingyu"
                      rules={[{ required: true, message: '选择领域!' }]}
                  >
                      <Select
                          style={{ width: 200 }}
                          placeholder="选择领域"
                      >
                          <Option value="1">健康</Option>
                          <Option value="2">语音</Option>
                          <Option value="3">社会</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item
                      label="素材选择"
                      name="lingyu"
                      rules={[{ required: true, message: '选择素材!' }]}
                  >
                      <Select
                          style={{ width: 200 }}
                          placeholder="选择素材"
                      >
                          <Option value="1">教学设计</Option>
                          <Option value="2">教学课件</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item
                          label="素材格式"
                          name="geshi"
                          rules={[{ required: true, message: '选择格式!' }]}
                      >
                          <Select
                              style={{ width: 200 }}
                              placeholder="选择格式"
                          >
                              <Option value="1">图片</Option>
                              <Option value="2">视频</Option>
                          </Select>
                      </Form.Item>
                  <Form.Item
                      label="价格"
                      name="jiage"
                      rules={[{ required: true, message: '请输入价格!' }]}
                  >
                      <Input placeholder={'请输入价格'} style={{width:'120px'}}/>
                      <span>
                          <span>元</span>
                          <span style={{color:'red'}}>（免费则输入0！）</span>
                      </span>
                  </Form.Item>
                  <Form.Item
                      label="资源封面"
                      name="fengmian"
                      rules={[{ required: true, message: '请输上传封面!' }]}
                  >
                      <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          onChange={this.handleChange}
                      >
                          {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
                  </Form.Item>
                  <Form.Item
                      label="首页轮播图"
                      name="fengmian"
                      rules={[{ required: true, message: '请输上传封面!' }]}
                  >
                      <Upload
                          name="focus"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          onChange={this.handleChange}
                      >
                          {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
                  </Form.Item>
                  <Form.Item
                        name="neirong"
                        label={'幼教资源'}
                      >
                          <Upload.Dragger name="files" action="/upload.do" {...propsg}>
                              <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">单击或者拖拽到此区域上传</p>
                              <p className="ant-upload-hint">支持多个文件上传</p>
                          </Upload.Dragger>
                      </Form.Item>
                  <Form.Item
                   wrapperCol={{span:24}}
                  >
                     <div style={{textAlign:'center'}}>
                         <Button type={'primary'}>保存</Button>
                         <Divider type="vertical" />
                         <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                     </div>
                  </Form.Item>
              </Form>
            </Card>
        )
    }
}

export default ResourceAdd