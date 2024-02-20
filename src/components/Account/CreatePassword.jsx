import { Button, Row, Col, Form, Input, message, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { changeUserPassword } from '../../services/api';

const CreatePassword = (props) => {
    const { setModalAccountOpen, form, userInfo } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish = async (values) => {
        try {
            const { password } = values;
            setIsSubmit(true);
            let data = {
                "_id": userInfo._id,
                "password": password,
            };
            let res = await changeUserPassword(data);
            if (res && res.errCode === 0) {
                message.success("Tạo mật khẩu thành công!");
            } else {
                message.error("Đã có lỗi xảy ra...");
            }
            form.resetFields();
            setModalAccountOpen(false);
            setIsSubmit(false);
        } catch (e) {
            console.log("An error occurred: ", error);
        }

    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <div style={{ minHeight: 100, marginTop: '2rem' }}>
            <Form
                name="change_password"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                {...formItemLayout}
            >
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập mật khẩu của bạn',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Hãy xác nhận lại mật khẩu',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu bạn vừa nhập không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    // wrapperCol={{
                    //     offset: 8,
                    //     span: 16,
                    // }}
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.userInfo === nextProps.userInfo
}

export default React.memo(CreatePassword, areEqual);