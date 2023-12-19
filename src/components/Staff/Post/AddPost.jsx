import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, Divider, message, notification, Button, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

const AddPost = (props) => {
    const { isOpenAddModal, setOpenAddModal } = props;
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    const [text, setText] = useState('');

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

        ['clean']                                         // remove formatting button
    ];

    const module = {
        toolbar: toolbarOptions,
    }

    console.log("check text", text);

    const handleChange = (value) => {
        setText(value);
    };

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
        // const { name, email, password, description, roleID } = values;
        // if (imgBase64 === "") return;
        // setIsSubmit(true);
        // let data = {
        //     "name": name,
        //     "email": email,
        //     "password": password,
        //     "description": description,
        //     "image": imgBase64,
        //     "roleID": roleID,
        // };
        // // let res = await createDepartment(data);
        // if (res && res.errCode === 0) {
        //     message.success("Successful!");
        //     form.resetFields();
        //     setOpenAddModal(false);
        //     await fetchDataUser();
        // } else {
        //     notification.error({
        //         message: "Something went wrong...",
        //         description: res.message,
        //         duration: 5
        //     })
        // }
        // setIsSubmit(false)
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
                footer={null}
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
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Name"
                                name="name"
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
                                    style={{ height: 400, resize: 'none', }}
                                    modules={module}
                                    value={text}
                                    onChange={handleChange}
                                    theme="snow"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}
                            >
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isOpenAddModal === nextProps.isOpenAddModal;
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

export default React.memo(AddPost, areEqual);