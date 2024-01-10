import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, Divider, message, notification, Button, Row, Col } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../../../services/api';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const AddPost = (props) => {
    const { isOpenAddModal, setOpenAddModal, fetchPosts } = props;
    const user = useSelector(state => state.account.user);
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        // ['clean']                                         // remove formatting button
    ];

    const module = {
        toolbar: toolbarOptions,
    }

    // const handleChange = (value) => {
    //     setText(value);
    // };

    const onFinish = async (values) => {
        const { title, description } = values;
        if (!title || !description) {
            return;
        }
        setIsSubmit(true);
        let data = {
            "title": title,
            "description": description,
            "author": user._id
        };
        let res = await createPost(data);
        if (res && res.errCode === 0) {
            message.success("Successful!");
            form.resetFields();
            setOpenAddModal(false);
            await fetchPosts();
        } else {
            message.error("Something went wrong...");
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Add New Post"
                open={isOpenAddModal}
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
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please input your department/faculty name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Description"
                                name="description"
                                rules={[{ required: true }]}
                            >
                                <ReactQuill
                                    style={{ height: 400, resize: 'none', paddingBottom: 50 }}
                                    modules={module}
                                    // value={text}
                                    // onChange={handleChange}
                                    theme="snow"
                                />
                                {/* <Tiptap /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    );
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isOpenAddModal === nextProps.isOpenAddModal;

}

export default React.memo(AddPost, areEqual);