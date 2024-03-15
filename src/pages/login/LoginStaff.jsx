import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import "./login.scss";
import { handleLogin, handleGoogleLogin } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLoginAction, handleLogoutReduxThunk } from '../../redux/account/accountSlice';


const LoginStaff = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const checkRole = (role) => {
        if (role === null) {
            return;
        }
        if (role === 'Department' || role === 'Admin') {
            navigate('/staff');
            message.success("Login successfully!");
        } else {
            dispatch(handleLogoutReduxThunk());
            message.error("Incorrect email or password!");
        }
    }

    const handleGoogleLoginFunction = async () => {
        try {
            const res = await handleGoogleLogin("Department");
            if (res && res.errCode === 0) {
                dispatch(doLoginAction(res.data));
                let role = res?.data ? res.data.user.role : null;
                message.success("Login successfully!");
                if (role === null) {
                    return;
                }
                navigate('/staff/login');
            }
        } catch (err) {
            console.log("Not properly authenticated", err);
        }
    };

    const redirectToGoogleSSO = async () => {
        let timer = null;
        const googleLoginURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`;
        const newWindow = window.open(
            googleLoginURL,
            "_blank",
            "width=500,height=600"
        );

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    handleGoogleLoginFunction();
                    if (timer) clearInterval(timer);
                }
            }, 500);
        }
    };

    const onFinish = async (values) => {
        try {
            const { email, password } = values;
            setIsSubmit(true);
            const res = await handleLogin(email, password);
            setIsSubmit(false);
            if (res && res.errCode === 0) {
                dispatch(doLoginAction(res.data));
                let role = res?.data ? res.data.user.role : null;
                checkRole(role);
            } else {
                message.error("Incorrect email or password!");
            }
        } catch (e) {
            console.log("Something went wrong...", err);
        }

    };
    return (
        <div className='login-page'>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className='heading'>
                            <p className="text text-large">Students Support Website</p>
                        </div>
                        <div className='wrapper-login'>
                            <Divider style={{ marginTop: 0 }} />
                            <div>
                                <div className='alert'>
                                    Dùng tài khoản emai @uef.edu.vn (GSuite) để đăng nhập vào hệ thống.
                                </div>
                                <button
                                    onClick={redirectToGoogleSSO}
                                    className="button-sign-in-google button-sign-in-google-staff"
                                    title="Đăng nhập bằng tài khoản @UEF email của bạn"
                                >
                                    Đăng nhập bằng @UEF email
                                </button>
                            </div>
                            <Divider orientation="right" style={{ fontSize: 13, paddingTop: 20 }}>
                                <span>Hoặc dùng </span>
                                <a href="" style={{ color: '#4285F4', paddingBottom: 10 }}
                                    onClick={(event) => {
                                        setShowForm(true)
                                        event.preventDefault()
                                    }}>
                                    Tài khoản và Mật khẩu
                                </a>
                            </Divider>
                            {showForm &&
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

                                    {/* <Form.Item> */}
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={isSubmit}>
                                        Đăng nhập
                                    </Button>
                                    {/* </Form.Item> */}
                                </Form>
                            }
                        </div>
                    </section>
                </div>
            </main >

        </div >
    );
};
export default LoginStaff;