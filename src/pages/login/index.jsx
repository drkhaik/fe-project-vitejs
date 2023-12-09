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
        // console.log('Received values of form: ', values);
        const { email, password } = values;
        setIsSubmit(true);
        let res = await handleLogin(email, password);
        // console.log("check res", res);
        setIsSubmit(false);
        if (res && res.errCode === 0) {
            dispatch(doLoginAction(res.data));
            // console.log("check res", res);
            let role = res?.data ? res.data.user.role : null;
            // localStorage.setItem('access_token', token);
            message.success("Login successfully!");
            if (role === null) {
                return;
            }
            role === 'Staff' ? navigate('/staff') : navigate("/");
        } else {
            notification.error({
                message: "Something went wrong...",
                description: "Incorrect email or password!",
                duration: 5
            })
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