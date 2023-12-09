import React, { useEffect, useState } from 'react';
import {
    Upload, Modal, Form, Input, Divider, message, notification,
    Avatar, InputNumber, Row, Col, Button
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import imgUEF from '../../../assets/team_UEF.png';

const { TextArea } = Input;

const UpdateInfo = (props) => {
    // console.log("check render")
    const { openModalUpdate, setOpenModalUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await handleCallAPIUploadAvatar(file);
        if (res && res.data) {
            const newAvatar = res.data.fileUploaded;
            // dispatch(doUploadAvatarAction({ avatar: newAvatar }));
            setUserAvatar(newAvatar);
            onSuccess('Ok');
        } else {
            onError('Upload file failed!');
        }
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const propsUpload = {
        name: 'avatar',
        maxCount: 1,
        multiple: false,
        customRequest: handleUploadAvatar,
        beforeUpload: beforeUpload,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }

    const onFinish = async (values) => {

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
                <Row>
                    <Col sm={24} md={8}>
                        <Row gutter={[30, 30]} style={{ justifyContent: 'center' }}>
                            <Col span={24}>
                                <Avatar
                                    size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160 }}
                                    icon={<UserOutlined />}
                                    shape='square'
                                    src={imgUEF}
                                />
                            </Col>
                            <Col span={24}>
                                <Upload {...propsUpload}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={24} md={16}>
                        <Form
                            name="basic"
                            style={{ maxWidth: "100%", margin: '0 auto' }}
                            onFinish={onFinish}
                            form={form}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row>
                                <Form.Item
                                    hidden
                                    labelCol={{ span: 24 }}
                                    label="Id"
                                    name="_id"
                                >
                                    <Input />
                                </Form.Item>
                                <Col span={24}>
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        label="Department Name"
                                        name="departmentName"
                                    >
                                        <Input disabled />
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
                                                height: 120,
                                                resize: 'none',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        label="Note"
                                        name="note"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                {/* <Col span={12}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Thumbnail"
                                name="thumbnail"
                                // valuePropName="fileList"
                                rules={[{ required: true, message: 'Please upload the thumbnail!' }]}
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
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                                    // fileList gan co dinh file, con defaultFileList co the chinh sua dc file
                                    defaultFileList={initForm?.thumbnail?.fileList ?? []}
                                // fileList={dataThumbnail ?? []}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8, }} > Upload </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Upload Slider"
                                name="slider"
                            // valuePropName="fileList"
                            >
                                <Upload
                                    name="slider"
                                    multiple
                                    listType="picture-card"
                                    // fileList={dataSlider}
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={(info) => handleChange(info, "slider")}
                                    onRemove={(file) => handleRemoveFile(file, "slider")}
                                    // fileList gan co dinh file, con defaultFileList co the chinh sua dc file
                                    defaultFileList={initForm?.slider?.fileList ?? []}
                                // fileList={dataSlider ?? []}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8, }} >Upload </div>
                                    </div>
                                </Upload>

                            </Form.Item>
                        </Col> */}
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal>
            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}
        </>
    );
}

export default UpdateInfo;