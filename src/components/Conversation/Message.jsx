import React, { useEffect, useState, useRef } from 'react';
import {
    Row, Col, Form, Divider, Button, Tag, Input, Drawer, Upload, message, Empty
} from 'antd';
import { ClipLoader } from "react-spinners";
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import {
    fetchMessageHistoryById,
    callUploadMessageFileAPI,
    fetchMoreMessageHistory
}
    from '../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Dragger } = Upload;
const { TextArea } = Input;

const Message = (props) => {
    const { socket, room } = props;
    const user = useSelector(state => state.account.user);
    const recipient = useSelector(state => state.conversation.recipient);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [messageList, setMessageList] = useState([]);

    const [form] = Form.useForm();

    const fetchMoreMessage = async () => {
        if (loading) {
            return;
        }
        // if(hasMore)
        setLoading(true);
        if (user && recipient) {
            let conversationId = recipient.conversationId;
            let lastMessageId = messageList[messageList.length - 1]._id;
            let res = await fetchMoreMessageHistory({ conversationId, lastMessageId });
            if (res && res.errCode === 0 && res.data) {
                console.log("check message list", res.data);
                setTimeout(() => {
                    console.log('This message will be logged after 3 seconds');
                    setMessageList((list) => [...list, ...res.data]);
                    setLoading(false);
                }, 3000);
            } else {
                message.error("Failed to load list message!");
                setLoading(false);
            }
        }
        // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        //     .then((res) => res.json())
        //     .then((body) => {
        //         setData([...data, ...body.results]);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    };

    // useEffect(() => {
    //     loadMoreData();
    // }, []);

    const fetchMessageHistory = async () => {
        if (user && recipient) {
            let conversationId = recipient.conversationId;
            let res = await fetchMessageHistoryById(conversationId);
            if (res && res.errCode === 0 && res.data) {
                // console.log("check message list", res.data);
                setMessageList(res.data);
            } else {
                message.error("Failed to load list message!");
            }
        }
    }

    useEffect(() => {
        fetchMessageHistory();
    }, [recipient]);


    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            console.log("check data", newMessage);
            setMessageList((list) => [newMessage, ...list]);
        })
    }, [socket]);

    const onFinish = async (values) => {
        setIsSubmit(true);
        // console.log("check", values);
        const { file, text } = values;
        if (text) {
            const messageData = {
                room: room,
                body: text,
                author: user._id,
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [messageData, ...list]);
            form.resetFields();
        }
        setIsSubmit(false);
        // let res = await createUser(fullname, email, password);
        // setIsSubmit(false);
        // if (res) {
        //     // localStorage.setItem('access_token', res.data.access_token)
        //     // dispatch(doLoginAction(res.data.user))
        //     message.success("Successfully!");
        // } else {
        //     notification.error({
        //         message: "Something went wrong...",
        //         description: res.message ? res.message : "ok",
        //         duration: 3
        //     })
        // }
    };

    const beforeUpload = async (file) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Ảnh phải nhỏ hơn 2MB!');
            }
            return isLt2M;
        } else if (file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/vnd.ms-excel' ||
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/zip') {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error('Tập tin PDF, Word, Image hoặc Zip phải nhỏ hơn 5MB!');
            }
            return isLt5M;
        } else {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG, PDF hoặc Excel!');
            return false;
        }
    }

    const handleChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        console.log("check file", file);
        const res = await callUploadMessageFileAPI(file);
        if (res && res.data && res.errCode === 0) {
            let public_id = res.data.public_id;
            let url = res.data.url;
            let fileName = res.data.fileName;
            // console.log("check res", res);
            onSuccess('ok');
        } else {
            onError('Upload file failed!');
        }
    };

    return (
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
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={messageList.length}
                                        next={fetchMoreMessage}
                                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                        inverse={true}
                                        hasMore={true}
                                        loader={<div style={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <ClipLoader size={20} color="#36d7b7" loading={true} />
                                        </div>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget="scrollableDiv"
                                    >
                                        {messageList.map((item, index) => {
                                            return (
                                                <div key={index} className='message' id={user._id === item.author ? 'you' : 'other'}>
                                                    <div>
                                                        <div className="message-content">
                                                            <p>{item.body}</p>
                                                        </div>
                                                        <div className="message-meta">
                                                            <p id="time"></p>
                                                            <p id="author">{user._id === item.author ? user.name : recipient.name}</p>
                                                        </div>
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
            <Col span={24} style={{ marginTop: '15px' }}>
                <Form
                    style={{ maxWidth: "100%", margin: '0 auto' }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        name="file"
                    >
                        <Upload
                            customRequest={handleUploadFile}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            accept=".zip,.pdf,.docx,.xls,.xlsx,image/*"
                            maxCount={1}
                            multiple={true}
                        >
                            <Button icon={<UploadOutlined />}>Đính kèm file</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Empty input field!' }]}
                    >
                        <TextArea
                            showCount
                            // maxLength={100}
                            // onChange={onChangeQuestion}
                            placeholder="Nhập câu trả lời!"
                            style={{
                                height: 80,
                                resize: 'none',
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
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row >
    )
}

export default Message;