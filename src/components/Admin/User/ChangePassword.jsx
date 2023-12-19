import { Button, Row, Col, Form, Input, message, notification } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { changeUserPassword } from '../../../services/api';

const ChangePassword = (props) => {
    const { setOpenUpdateModal, form, userInfo } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish = async (values) => {
        // console.log('Success:', values);
        const { password } = values;
        setIsSubmit(true);
        let data = {
            "id": userInfo.id,
            "password": password,
        };
        let res = await changeUserPassword(data);
        // console.log("check res", res);
        if (res && res.errCode === 0) {
            message.success("Cập nhật mật khẩu thành công!");
            form.resetFields();
            setOpenUpdateModal(false);
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra...",
                description: res.message,
            })
        }
        setIsSubmit(false);
    };

    return (
        <div style={{ minHeight: 350, marginTop: '2rem' }}>
            <Form
                name="change_password"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.userInfo === nextProps.userInfo
}

export default React.memo(ChangePassword, areEqual);