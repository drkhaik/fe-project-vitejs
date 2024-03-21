import React, { useEffect, useState } from 'react';
import {
    Upload, Modal, Form, Input, Divider, message, notification,
    Avatar, InputNumber, Row, Col, Button
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import imgUEF from '../../../assets/team_UEF.png';
import useImageHandling from '../../../hooks/useImageHandling';
import { v4 as uuidv4 } from 'uuid';
import { callUploadUserImgAPI, updateUserAPI } from '../../../services/api';
import { useDispatch } from 'react-redux';
import { fetchUserAccountReduxThunk } from '../../../redux/account/accountSlice';

const { TextArea } = Input;

const UpdateInfo = (props) => {
    const { openModalUpdate, setOpenModalUpdate, departmentInfo } = props;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isSubmit, setSubmit] = useState(false);
    const [public_id, setPublic_id] = useState(null);
    const [initForm, setInitForm] = useState(null);

    const { loading,
        previewOpen,
        previewImage,
        previewTitle,
        file,
        setFile,
        handlePreview,
        beforeUpload,
        handleChange,
        handleUploadFile,
        setPreviewOpen,
    } = useImageHandling();

    useEffect(() => {
        if (departmentInfo && departmentInfo._id) {
            const arrImage = [
                {
                    uid: uuidv4(),
                    name: departmentInfo.name,
                    status: 'done',
                    url: `${departmentInfo.image}`,
                }
            ]
            const init = {
                _id: departmentInfo._id,
                name: departmentInfo.name,
                email: departmentInfo.email,
                description: departmentInfo.description,
                image: { fileList: arrImage },
            }
            setInitForm(init);
            setPublic_id(departmentInfo.public_id);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [departmentInfo, openModalUpdate]);

    const onFinish = async (values) => {
        try {
            setSubmit(true);
            const { _id, description } = values;
            let data = {
                "_id": _id,
                "description": description,
            };
            // console.log("check file", file);
            if (file && file.size > 0) {
                const uploadRes = await callUploadUserImgAPI(file, public_id);
                if (!uploadRes || !uploadRes.data || uploadRes.errCode !== 0) {
                    throw new Error("Upload file failed");
                }
                data.image = uploadRes.data.url;
                data.public_id = uploadRes.data.public_id;
            }
            const res = await updateUserAPI(data);
            if (res && res.errCode === 0) {
                message.success("Successful!");
                form.resetFields();
                setPublic_id(null);
                setFile({});
            } else {
                message.error("Oops...something went wrong!");
            }
            setSubmit(false);
            setOpenModalUpdate(false);
            dispatch(fetchUserAccountReduxThunk());

        } catch (error) {
            console.error("An error occurred: ", error);
        } finally {
            setPublic_id(null);
            setFile({});
        }
    };

    return (
        <>
            <Modal
                title="Update Department Info"
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
                    <Row>
                        <Col sm={24} md={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Image"
                                name="image"
                            >
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="image-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    accept="image/png, image/jpeg, image/jpg"
                                    // fileList={dataThumbnail}
                                    // showUploadList={false}
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    defaultFileList={initForm?.image?.fileList ?? []}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8, }} >Upload </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={16}>
                            <Form.Item
                                hidden
                                labelCol={{ span: 24 }}
                                label="Id"
                                name="_id"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Name"
                                name="name"
                                rules={[
                                    { required: true, message: 'Tên phòng ban không được để trống' },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Description"
                                name="description"
                                rules={[
                                    { required: true, message: 'Chi tiết phòng ban không được để trống' },
                                ]}
                            >
                                <TextArea
                                    showCount
                                    maxLength={500}
                                    // onChange={onChangeQuestion}
                                    style={{
                                        height: 120,
                                        resize: 'none',
                                    }}
                                />
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

export default UpdateInfo;