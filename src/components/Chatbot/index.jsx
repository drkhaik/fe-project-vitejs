import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Empty, Drawer, Tag, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { RobotOutlined } from '@ant-design/icons';
import { sendQuestionDataToFlaskServer } from '../../services/apiFlaskServer';
import './Chatbot.scss';

const { TextArea } = Input;

const Chatbot = (props) => {
    const { isOpenDrawer, setOpenDrawer } = props;
    const user = useSelector(state => state.account.user);
    const [messageList, setMessageList] = useState([]);
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isOpenDrawer && messageList.length === 0) {
                const promptMessage = {
                    body: "Xin chào! Tôi có thể giúp gì cho bạn?",
                    author: "chatbot",
                };
                setMessageList([promptMessage]);
            }
        };

        fetchData();
    }, [isOpenDrawer, messageList]);

    const promptQuestions = [
        "Đăng kí song bằng song ngành UEF ở đâu?",
        "Điểm trung bình tích luỹ như nào là bằng giỏi?",
        "Chuẩn đầu ra Tin học khoá 2021 gồm những gì?",
        // "Điều kiện để học song bằng song ngành UEF là gì?"
    ];

    const handlePromptClick = async (question) => {
        const messageData = {
            body: question,
            author: user._id,
        };
        try {
            setMessageList((list) => [messageData, ...list]);
            const response = await sendQuestionDataToFlaskServer(question);
            console.log(response);
            let botMessage = {}
            if (response && response.answer === "No result found") {
                botMessage = {
                    body: "Xin lỗi! Tôi không hiểu câu hỏi của bạn.",
                    author: "chatbot",
                };
            } else {
                botMessage = {
                    body: "Đây là những gì tôi tìm thấy: " + response.answer,
                    author: "chatbot",
                };
            }
            setMessageList((list) => [botMessage, ...list]);
        }catch(error){
            console.log(error)
        }
    };

    const onFinish = async (values) => {
        setIsSubmit(true);
        const { text } = values;
        try{
            if (text) {
                const messageData = {
                    body: text,
                    author: user._id,
                };
                setMessageList((list) => [messageData, ...list]);
                form.resetFields();
                console.log("text", text)
                const response = await sendQuestionDataToFlaskServer(text);
                console.log(response);
                let botMessage = {}
                if (response.answer) {
                    botMessage = {
                        body: response.answer,
                        author: "chatbot",
                    };
                } else {
                    botMessage = {
                        body: "Xin lỗi! Tôi không hiểu câu hỏi của bạn.",
                        author: "chatbot",
                    };
                }
                setMessageList((list) => [botMessage, ...list]);
            }
        }
        catch(e){

        }
        setIsSubmit(false);
    };

    return (
        <Drawer
            className='box-chat'
            title={
                <>
                    <Tag
                        color="#BA1E1E"
                        style={{ marginRight: 0, cursor: 'pointer' }}
                    >
                        Chatbot UEF
                    </Tag>
                </>
            }
            placement="right"
            onClose={() => {
                setOpenDrawer(false)
            }}
            open={isOpenDrawer}
            width={'50vw'}
        >
            <Row>
                <Col span={24}>
                    <div className='chat-window'>
                        <div className='chat-body'>
                            <div className='message-container'>
                                {messageList && messageList.length > 0 ?
                                    <div
                                        id="scrollableDiv"
                                        style={{
                                            height: 'inherit',
                                            overflow: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                            backgroundColor: '#eee',
                                        }}
                                    >
                                        <InfiniteScroll
                                            dataLength={messageList.length}
                                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                            inverse={true}
                                            loader={<div style={{
                                                marginTop: '10px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <ClipLoader size={20} color="#36d7b7" loading={true} />
                                            </div>}
                                            scrollableTarget="scrollableDiv"
                                        >
                                            {messageList.map((item, index) => {
                                                const isAuthor = user._id === item.author;
                                                return (
                                                    <div key={index} className='message' id={isAuthor ? 'you' : 'other'}>
                                                        <div className="message-content">
                                                            <p>{item.body}</p>
                                                        </div>
                                                        <div className="message-avt">
                                                            {isAuthor ? <Avatar src={user.image} /> : <Avatar icon={<RobotOutlined />} />}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </InfiniteScroll>
                                    </div>
                                    :

                                    <Empty
                                        style={{
                                            height: 'inherit',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                        description='Send a message!'
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Col>

                <Col span={24} style={{ marginTop: '0.2rem' }}>
                    <div className="prompt-questions">
                        {promptQuestions.map((question, index) => (
                            <Button style={{margin: '0.2rem'}} key={index} onClick={() => handlePromptClick(question)}>
                                {question}
                            </Button>
                        ))}
                    </div>
                </Col>
                                
                <Col span={24} style={{ marginTop: '15px' }}>
                    <Form
                        style={{ maxWidth: "100%", margin: '0 auto' }}
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="text"
                            rules={[{ required: true, message: 'Empty input field!' }]}
                        >
                            <TextArea
                                showCount
                                // maxLength={100}
                                // onChange={onChangeQuestion}
                                placeholder="Nhập câu hỏi..."
                                style={{
                                    height: 80,
                                    resize: 'none',
                                    // backgroundColor: '#eee',
                                }}
                                onKeyPress={(event) => {
                                    event.key === "Enter" && form.submit();
                                }}
                            />
                        </Form.Item>
                        <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmit}
                            >
                                Send
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Drawer>
    );
};

export default Chatbot;