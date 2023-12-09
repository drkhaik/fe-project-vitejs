import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, Divider, message, notification, Select, InputNumber, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createDepartment } from '../../../services/api';
import useImageHandling from '../../../hooks/useImageHandling';

const { TextArea } = Input;

const AddNewDepartment = (props) => {
    const { openAddNewModal, setOpenAddModal, listRole, fetchDataDepartment } = props;
    const { loading,
        previewOpen,
        previewImage,
        previewTitle,
        imgBase64,
        setImgBase64,
        handlePreview,
        beforeUpload,
        handleChange,
        handleUploadFileThumbnail,
        handleRemoveFile,
        setPreviewOpen
    } = useImageHandling();

    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    console.log("check render Add new");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            form.submit();
        }
    };

    const onFinish = async (values) => {
        // console.log("check values", values);
        // console.log("check img base64", imgBase64);
        // return;
        const { name, email, password, description, roleID } = values;
        if (imgBase64 === "") return;
        setIsSubmit(true);
        let data = {
            "name": name,
            "email": email,
            "password": password,
            "description": description,
            "image": imgBase64,
            "roleID": roleID,
        };
        let res = await createDepartment(data);
        if (res && res.errCode === 0) {
            message.success("Successful!");
            form.resetFields();
            setOpenAddModal(false);
            setImgBase64("");
            await fetchDataDepartment();
        } else {
            notification.error({
                message: "Something went wrong...",
                description: res.message,
                duration: 5
            })
        }
        setIsSubmit(false)
    };


    return (
        <>
            <Modal
                title="Add New Department"
                open={openAddNewModal}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpenAddModal(false)
                    form.resetFields();
                }}
                okText='Add'
                confirmLoading={isSubmit}
                // maskClosable={false}
                width="60vw"
                centered={true}
                forceRender={true}
            >
                <Form
                    name="basic"
                    style={{ maxWidth: "100%", margin: '0 auto' }}
                    onFinish={onFinish}
                    form={form}
                    onKeyDown={(event) => handleKeyDown(event)}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your department/faculty name!' }]}
                                initialValue={"name 1234"}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { pattern: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*uef\.edu\.vn$/, message: 'Invalid email!' }
                                ]}
                            // initialValue={"test@gmail.com"}
                            >
                                <Input placeholder="Use email account @uef.edu.vn"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
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

                        <Col span={12}>
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

                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Description"
                                name="description"
                                rules={[{ required: true }]}
                                initialValue={"abc123"}
                            >
                                <TextArea
                                    showCount
                                    maxLength={200}
                                    // onChange={onChangeQuestion}
                                    style={{
                                        height: 100,
                                        resize: 'none',
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Role"
                                name="roleID"
                                rules={[{ required: true, message: 'Select role!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select role"
                                    value={null}
                                    allowClear
                                    // onChange={onChange}
                                    // onSearch={onSearch}
                                    // filterOption={(input, option) =>
                                    //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    // }
                                    options={listRole}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Avatar"
                                name="image"
                                //https://www.cnblogs.com/Freya0607/p/15935728.html
                                // valuePropName="fileList"
                                rules={[{ required: true, message: 'Please upload your image!' }]}
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    // fileList={dataThumbnail}
                                    // showUploadList={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={(file) => handleRemoveFile(file)}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8, }} > Upload </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.listRole === nextProps.listRole
        && prevProps.openAddNewModal === nextProps.openAddNewModal;

    // let removeFunctions = (obj) => {
    //     const result = {};
    //     for (let key in obj) {
    //         if (typeof obj[key] !== 'function') {
    //             result[key] = obj[key];
    //         }
    //     }
    //     return result;
    // }

    // let prevPropsClean = removeFunctions(prevProps);
    // let nextPropsClean = removeFunctions(nextProps);

    // const prevPropsArr = Object.values(prevPropsClean);
    // const nextPropsArr = Object.values(nextPropsClean);

    // // console.log("check prevPropsArr", prevPropsArr);
    // // console.log("check nextPropsArr", nextPropsArr);

    // for (let i = 0; i < prevPropsArr.length; i++) {
    //     if (prevPropsArr[i] !== nextPropsArr[i]) {
    //         return false;
    //     }
    // }
    // return true;
}

export default React.memo(AddNewDepartment, areEqual);