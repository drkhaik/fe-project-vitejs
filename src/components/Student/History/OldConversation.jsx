import { useState } from 'react';
import {
    Upload, Modal, Form, Input, Divider, message, notification,
    Avatar, InputNumber, Row, Col, Button, Tag
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const { TextArea } = Input;

const OldConversation = (props) => {
    const { openModalOldMessage, setOpenModalOldMessage, conversationID, departmentName } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const handleOnCancel = () => {
        setOpenModalOldMessage(false)
        form.resetFields();
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        setIsSubmit(true);
        setTimeout(() => {
            setIsSubmit(false);
            setOpenModalOldMessage(false);
            form.resetFields();
            message.success("Gửi tin nhắn thành công!");
        }, 3000);
        // const { email, oldPassword, newPassword } = values;
        // const res = await handleCallAPIChangePassword(email, oldPassword, newPassword);
        // // console.log("check res", res);
        // if (res && res.data) {
        //     message.success("Cập nhật mật khẩu thành công!");
        //     form.setFieldValue("oldPassword", "");
        //     form.setFieldValue("newPassword", "");
        //     props.setIsModalAccountOpen(false);
        // } else {
        //     notification.error({
        //         message: "Đã có lỗi xảy ra...",
        //         description: res.message,
        //     })
        // }
        // setIsSubmit(false);
    };

    const fetchMoreData = () => {

    }

    const handleKeyDown = (event, formId) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            document.getElementById("submitBtn").click(); // Trigger the click event of the specified submit button
        }
    };

    return (
        <>
            <Modal
                // title="Update Department Info"
                open={openModalOldMessage}
                // onOk={() => form.submit()}
                onCancel={() => handleOnCancel()}
                // okText='Update'
                confirmLoading={isSubmit}
                // maskClosable={false}
                width="60vw"
                centered={true}
                forceRender={true}
                footer={null}
            >
                <div className='modal-body'>
                    <Row>
                        <Col span={24}>
                            <Divider orientation="left">
                                <Tag color="#108ee9" style={{ marginRight: 0, fontSize: 16 }}>{departmentName}</Tag>
                            </Divider>
                            {/* <Button type="primary">Primary Button {props.conversationID}</Button> */}
                        </Col>
                        <Col
                            span={24}
                            id="scrollableDiv"
                            style={{
                                height: 400,
                                overflow: 'auto',
                                padding: '10px 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                display: 'flex',
                                flexDirection: 'column-reverse',
                            }}
                        >
                            <InfiniteScroll
                                style={{ marginBottom: '10px' }}
                                // height={100}
                                dataLength={10}
                                next={fetchMoreData}
                                inverse={true}
                                hasMore={true}
                                scrollableTarget="scrollableDiv"
                            // initialScrollY={300}
                            >
                                <Row>
                                    <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                        <TextArea
                                            disabled
                                            // showCount
                                            // maxLength={100}
                                            // onChange={onChangeQuestion}
                                            value={"Câu hỏi của sinh viên?"}
                                            className='question'
                                            style={{
                                                height: 100,
                                                resize: 'none',
                                                backgroundColor: conversationID === 1 ? '#daeaffbf' : '#f3d6d6'
                                            }}
                                        />
                                    </Col>
                                    <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                                        <TextArea
                                            disabled
                                            // showCount
                                            // maxLength={100}
                                            // onChange={onChangeQuestion}
                                            value={"Phản hồi của phòng công tác sinh viên"}
                                            className='answer'
                                            style={{
                                                height: 'auto',
                                                resize: 'none',
                                                backgroundColor: '#f3d6d6'
                                            }}
                                        />
                                    </Col>
                                    <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                        <TextArea
                                            disabled
                                            // showCount
                                            // maxLength={100}
                                            // onChange={onChangeQuestion}
                                            value={"Câu hỏi của sinh viên?"}
                                            className='question'
                                            style={{
                                                height: 100,
                                                resize: 'none',
                                                backgroundColor: '#daeaffbf'
                                            }}
                                        />
                                    </Col>
                                    <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                                        <TextArea
                                            disabled
                                            // showCount
                                            // maxLength={100}
                                            // onChange={onChangeQuestion}
                                            value={"Phản hồi của phòng công tác sinh viên"}
                                            className='answer'
                                            style={{
                                                height: 100,
                                                resize: 'none',
                                                backgroundColor: '#f3d6d6'
                                            }}
                                        />
                                    </Col>
                                    <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                        <TextArea
                                            disabled
                                            // showCount
                                            // maxLength={100}
                                            // onChange={onChangeQuestion}
                                            value={"Câu hỏi của sinh viên?"}
                                            className='question'
                                            style={{
                                                height: 100,
                                                resize: 'none',
                                                backgroundColor: '#daeaffbf'
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </InfiniteScroll>
                        </Col>
                        <Col span={24}>
                            <Row className="staff-container">
                                <Col md={24}>
                                    <Divider orientation="left" plain>
                                        Phản hồi:
                                    </Divider>
                                </Col>

                                <Col md={24} className='answer-section'>
                                    <Form
                                        // name="basic"
                                        style={{ maxWidth: "100%", margin: '0 auto' }}
                                        onFinish={onFinish}
                                        form={form}
                                        onKeyDown={(event) => handleKeyDown(event, 'submitBtn')}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
                                    >
                                        <Form.Item
                                            name="answer"
                                        // label="Name"
                                        // style={{ width: '30%' }}
                                        >
                                            <TextArea
                                                showCount
                                                // maxLength={100}
                                                // onChange={onChangeQuestion}
                                                placeholder="Nhập câu trả lời!"
                                                required
                                                style={{
                                                    height: 100,
                                                    resize: 'none',
                                                }}
                                            />
                                        </Form.Item>
                                        <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                                            <Form.Item
                                            // wrapperCol={{
                                            //     offset: 8,
                                            //     span: 16,
                                            // }}
                                            >
                                                <Button type="primary" danger onClick={() => handleOnCancel()} >Cancel {props.conversationID}</Button>
                                                <Button type="primary" id='submitBtn' htmlType="submit" loading={isSubmit}>
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    )
}

export default OldConversation;