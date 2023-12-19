import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, message, notification, Select, Row, Col, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { updateUserAPI } from '../../../services/api';
import useImageHandling from '../../../hooks/useImageHandling';

const { TextArea } = Input;
const UpdateInfoDepartment = (props) => {
    const { openUpdateModal,
        setOpenUpdateModal,
        setIsSubmitUpdateForm,
        form,
        listRole,
        userInfo,
        fetchDataUser,
    } = props;

    const { loading,
        previewOpen,
        previewImage,
        previewTitle,
        public_id,
        urlImage,
        handlePreview,
        beforeUpload,
        handleChange,
        handleUploadFile,
        setPreviewOpen,
        setPublic_id,
        setUrlImage
    } = useImageHandling();

    const [initForm, setInitForm] = useState(null);

    console.log("check render Update");

    useEffect(() => {
        if (userInfo && userInfo.id) {
            const arrImage = [
                {
                    uid: uuidv4(),
                    name: userInfo.name,
                    status: 'done',
                    url: `${userInfo.image}`,
                }
            ]
            const init = {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                description: userInfo.description,
                roleID: userInfo.roleID,
                image: { fileList: arrImage },
            }
            setInitForm(init);
            setPublic_id(userInfo.public_id);
            setUrlImage(userInfo.image);
            // setImgBase64(userInfo.image);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
            // console.log("check return useEffect")
        }
    }, [userInfo, openUpdateModal]);

    const onFinish = async (values) => {
        const { id, name, description, roleID } = values;
        setIsSubmitUpdateForm(true)
        let data = {
            "id": id,
            "name": name,
            "description": description,
            "image": urlImage,
            "public_id": public_id,
            "roleID": roleID,
        };
        let res = await updateUserAPI(data);
        // return;
        if (res && res.errCode === 0) {
            message.success("Successful!");
            form.resetFields();
            setOpenUpdateModal(false);
            setPublic_id(null);
            setUrlImage(null);
            await fetchDataUser();
        } else {
            notification.error({
                message: "Something went wrong...",
                description: res.message,
                duration: 5
            })
        }
        setIsSubmitUpdateForm(false)
    };

    return (
        <>
            <Form
                name="update_info"
                style={{ maxWidth: "100%", margin: '0 auto' }}
                onFinish={onFinish}
                form={form}
                autoComplete="off"
            //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
            >
                <Row gutter={16}>
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        name="id"
                    >
                        <Input />
                    </Form.Item>
                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your department/faculty name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Description"
                            name="description"
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
                    <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </div>
                </Row>
            </Form>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    // console.log(prevProps, nextProps)
    return prevProps.listRole === nextProps.listRole
        && prevProps.openUpdateModal === nextProps.openUpdateModal;
}

export default React.memo(UpdateInfoDepartment, areEqual);