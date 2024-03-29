import React, { useState, useEffect } from 'react';
import {
    Modal, Select, Form, Row, Col, Input, message, Upload, Button
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { fetchAllSubjects, createDocument, callUploadDocumentSharingAPI } from '../../../services/api';
import { useSelector } from 'react-redux';

const { Dragger } = Upload;

const ModalAddDocument = (props) => {
    const { isModalOpen, setModalOpen, fetchDataDocuments } = props;
    const user = useSelector(state => state.account.user);
    const [options, setOptionSelect] = useState([]);
    const [form] = Form.useForm();
    const [isSubmit, setSubmit] = useState(false);
    const [file, setFile] = useState(null);

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const fetchDataSubjects = async () => {
        try {
            const res = await fetchAllSubjects();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                let dataSubjects = []
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    const newItem = {
                        label: item.name,
                        value: item._id,
                    };
                    dataSubjects.push(newItem);
                }
                setOptionSelect(dataSubjects);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataSubjects();
    }, []);

    const beforeUpload = async (file) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Ảnh phải nhỏ hơn 2MB!');
            }
            return isLt2M;
        } else if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg' ||
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/vnd.ms-excel' ||
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/zip') {
            const isLt5M = file.size / 1024 / 1024 < 10;
            if (!isLt5M) {
                message.error('Tập tin PDF, Word, Excel, Zip hoặc Ảnh phải nhỏ hơn 5MB!');
            }
            return isLt5M;
        } else {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG, PDF hoặc Excel!');
            return false;
        }
    }

    const handleChange = (info) => {
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const getFileType = (file) => {
        let fileType = file.type;
        let type = "";
        if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
            type = "image";
        } else if (fileType === 'application/pdf') {
            type = "pdf";
        } else if (fileType === 'application/zip') {
            type = "zip";
        } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            type = "word";
        } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            type = "excel";
        }
        return type;
    }

    const customGetFile = async ({ file, onSuccess, onError }) => {
        try {
            if (file) {
                setFile(file);
                onSuccess('ok');
            } else {
                onError('Upload file failed!');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleUploadDocument = async (file) => {
        try {
            const res = await callUploadDocumentSharingAPI(file);
            if (res && res.data && res.errCode === 0) {
                const public_id = res.data.public_id;
                const url = res.data.url;
                const fileName = file.name;
                const fileSize = file.size;
                const fileType = getFileType(file);
                const document = {
                    fileUrl: url,
                    public_id: public_id,
                    fileName: fileName,
                    fileType: fileType,
                    fileSize: fileSize,
                };
                return document;
            } else {
                message.error("Something went wrong...")
            }
        } catch (e) {
            console.log(e);
        }
    }


    const onFinish = async (values) => {
        // console.log("check value", values);
        try {
            const { subject, name } = values;
            setSubmit(true);
            let data = {
                "name": name,
                "author": user._id,
                "subject": subject,
            };
            if (file && file.size > 0) {
                const uploadRes = await handleUploadDocument(file);
                data.fileName = uploadRes.fileName;
                data.fileUrl = uploadRes.fileUrl;
                data.fileType = uploadRes.fileType;
                data.fileSize = uploadRes.fileSize;
                data.public_id = uploadRes.public_id;
            } else {
                return;
            }
            const res = await createDocument(data);
            if (res && res.errCode === 0) {
                message.success("Successful!");
                fetchDataDocuments(subject);
                form.resetFields();
            } else {
                message.error("Oops...something went wrong!");
            }
            setSubmit(false);
            setModalOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => form.submit()}
            okText="Submit"
            width="30vw"
            centered={true}
            confirmLoading={isSubmit}
        >
            <Form
                name="basic"
                style={{ maxWidth: "100%", margin: '0 auto' }}
                onFinish={onFinish}
                form={form}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Môn học"
                            name="subject"
                            rules={[{ required: true, message: 'Môn học không được để trống!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Tư tưởng HCM"
                                optionFilterProp="children"
                                filterOption={filterOption}
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Tên tài liệu"
                            name="name"
                            rules={[{ required: true, message: 'Tên tài liệu không được để trống' }]}
                        >
                            <Input placeholder='Đề cương Tư Tưởng HCM học kì 1A 2023-2024' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="file"
                            rules={[{ required: true, message: 'Tệp tin không được để trống' }]}
                        >
                            <Dragger
                                customRequest={customGetFile}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                accept=".zip,.pdf,.docx,.xls,.xlsx,image/*"
                                maxCount={1}
                            // multiple={true}
                            // showUploadList={false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click hoặc kéo thả để upload tài liệu!</p>
                            </Dragger>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isModalOpen === nextProps.isModalOpen
        && prevProps.postInfo === nextProps.postInfo;
}

export default React.memo(ModalAddDocument, areEqual);
