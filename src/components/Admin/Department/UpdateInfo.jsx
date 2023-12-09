import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, message, notification, Select, Row, Col, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { updateDepartmentInfo } from '../../../services/api';
import useImageHandling from '../../../hooks/useImageHandling';

const { TextArea } = Input;
const UpdateInfoDepartment = (props) => {
    const { openUpdateModal,
        setOpenUpdateModal,
        form,
        listRole,
        departmentInfo,
        fetchDataDepartment,
    } = props;

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

    const [initForm, setInitForm] = useState(null);

    console.log("check render Update");

    useEffect(() => {
        if (departmentInfo && departmentInfo.id) {
            const arrImage = [
                {
                    uid: uuidv4(),
                    name: departmentInfo.name,
                    status: 'done',
                    url: `${departmentInfo.image}`,
                }
            ]
            const init = {
                id: departmentInfo.id,
                name: departmentInfo.name,
                email: departmentInfo.email,
                description: departmentInfo.description,
                roleID: departmentInfo.roleID,
                image: { fileList: arrImage },
            }
            setInitForm(init);
            setImgBase64(departmentInfo.image);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
            // console.log("check return useEffect")
        }
    }, [departmentInfo, openUpdateModal]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            form.submit();
        }
    };

    const onFinish = async (values) => {
        const { id, name, description, roleID } = values;
        if (imgBase64 === "") {
            message.error("Please input image!");
            return;
        }
        setIsSubmitUpdateForm(true)
        let data = {
            "id": id,
            "name": name,
            "description": description,
            "image": imgBase64,
            "roleID": roleID,
        };
        let res = await updateDepartmentInfo(data);
        // return;
        if (res && res.errCode === 0) {
            message.success("Successful!");
            form.resetFields();
            setOpenUpdateModal(false);
            setImgBase64("");
            await fetchDataDepartment();
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
                // onFinishFailed={onFinishFailed}
                onKeyDown={(event) => handleKeyDown(event)}
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
                            rules={[{ required: true }]}
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
                                defaultFileList={initForm?.image?.fileList ?? []}
                            >
                                <div>
                                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div style={{ marginTop: 8, }} >Click to Upload </div>
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