import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Divider, Select, Row, Col, message } from 'antd';
import { updateUserAPI } from '../../../services/api';

const UpdateUser = (props) => {
    const { openModalUpdate, setOpenModalUpdate, userInfo, listRole, fetchAllUser } = props;
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        console.log("chekc userInfo", userInfo)
        let role = listRole.filter(item => item.value === userInfo.roleId);
        console.log("check role", role)

        if (userInfo && userInfo.id) {
            const init = {
                id: userInfo.id,
                fullName: userInfo.fullName,
                email: userInfo.email,
                role: role,
            }
            form.setFieldsValue(init);
        }
        // clean phase => component will unmount
        return () => {
            form.resetFields();
            // console.log("check return useEffect")
        }

    }, [userInfo])


    const onFinish = async (values) => {
        setIsSubmit(true)
        const { id, fullName, role } = values;
        let data = {
            "id": id,
            "fullName": fullName,
            "roleId": role[0].value,
        };
        let res = await updateUserAPI(data);
        // console.log("check res", res);
        if (res && res.errCode === 0) {
            message.success("Successfully!");
            form.resetFields();
            setOpenModalUpdate(false);
            await fetchAllUser();
        } else {
            message.error("Something went wrong...");
        }
        setIsSubmit(false)
    };
    return (
        <>
            <Modal
                title="Update Book Info"
                open={openModalUpdate}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpenModalUpdate(false)
                    // form.resetFields();
                    // setInitForm(null)
                }}
                okText='Update'
                confirmLoading={isSubmit}
                // maskClosable={false}
                width="60vw"
                centered={true}
                forceRender={true}
            >
                <Divider />

                <Form
                    name="basic"
                    style={{ maxWidth: "100%", margin: '0 auto' }}
                    onFinish={onFinish}
                    form={form}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="Id"
                            name="id"
                        >
                            <Input />
                        </Form.Item>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Fullname"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input name of the book!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[{ required: true }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Role"
                                name="role"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select Role"
                                    value={null}
                                    // allowClear
                                    // onChange={onChange}
                                    // onSearch={onSearch}
                                    // filterOption={(input, option) =>
                                    //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    // }
                                    options={listRole}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}
        </>
    );
}

export default UpdateUser;