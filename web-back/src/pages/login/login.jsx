import React from 'react';
import {connect} from "react-redux"

import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import img from "./images/login.jpg"

import "./css/login.css"



function LOGIN () {

        const onFinish = values => {
            console.log('Received values of form: ', values);
        };
    return (
        <div className="login">

            <div className="login-interior">
                <div className="login-img">
                    <img src={img} alt=""/>
                </div>

                <div className="login-form-A">

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '账户不正确!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账户" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '密码不正确!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button login-but">
                                登录
                            </Button>
                        </Form.Item>

                    </Form>

                </div>
            </div>

        </div>
    );
}

export default connect(null,null)(LOGIN);