import React from "react"
import { withRouter } from 'react-router-dom'
import { Modal, Button, Form, Input, message } from 'antd';
import PropTypes from 'prop-types'
import { xiugaipwd, gatUser, rmUser } from './../../../api/admin'
class Xiugai extends React.Component {

        static propTypes = {
            visible:PropTypes.bool.isRequired,
            hanShow:PropTypes.func.isRequired
        };



    handleCancel = e => {
       this.props.hanShow();
    };




    render() {
        const onFinish = values => {
            console.log(gatUser().data.token);
            console.log(values.p_mima);
            const {p_mima,p_old} = values;
            if (p_mima === p_old){
                message.warning('密码一致');
                return;
            } else {
               xiugaipwd(gatUser().data.token,p_mima,p_old).then((val)=>{
                  if(val.data.status === 0){
                      message.success(val.data.msg);
                      rmUser();
                      this.props.history.replace('/login')
                  }else {
                      message.warning('服务器错误')
                  }
               }).catch((err)=>{
                  message.error(err.data.msg)
               })
            }
        };

        return(
            <div>
                <Modal
                    title="修改密码"
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <p>要记住，奥利给...</p>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="旧密码"
                            name="p_old"
                            rules={[{ required: true, message: '旧密码 !' }]}
                        >
                            <Input placeholder={'请输入旧密码'} />
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="p_mima"
                            rules={[{ required: true, message: '新密码 !' }]}
                        >
                            <Input.Password placeholder={'请输入新密码'} />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                修改密码
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        )
    }
}

export default withRouter(Xiugai)