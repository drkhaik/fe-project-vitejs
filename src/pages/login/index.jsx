import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import "./login.scss";
import { handleLogin } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email, password } = values;
        setIsSubmit(true);
        let res = await handleLogin(email, password);
        setIsSubmit(false);
        if (res && res.errCode === 0) {
            dispatch(doLoginAction(res.data));
            let role = res?.data ? res.data.user.role : null;
            message.success("Login successfully!");
            if (role === null) {
                return;
            }
            role === 'Department' ? navigate('/staff') : navigate("/");
        } else {
            message.error("Incorrect email or password!");
        }

    };
    return (
        <div className='login-page'>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className='heading'>
                            <h2 className="text text-large">Sign In</h2>
                            <Divider />
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Email!',
                                },]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Password!',
                                },]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" loading={isSubmit}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main >

        </div >
    );
};
export default LoginPage;