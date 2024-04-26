import React, { useEffect, useState } from 'react';
import {
    Row, Col, Form, Button, Tag, Input, Avatar, Upload, message, Empty
} from 'antd';
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from 'react-redux';
import { setLastMessageToConversations } from '../../redux/conversation/conversationSlice';
import { UploadOutlined, FileOutlined } from '@ant-design/icons';
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
    const dispatch = useDispatch();
    const { socket, room } = props;
    const user = useSelector(state => state.account.user);
    const recipient = useSelector(state => state.conversation.recipient);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [messageList, setMessageList] = useState([]);

    const [form] = Form.useForm();

    const fetchMoreMessage = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        if (user && recipient) {
            let conversationId = recipient.conversationId;
            let lastMessageId = messageList[messageList.length - 1]._id;
            let res = await fetchMoreMessageHistory({ conversationId, lastMessageId });
            if (res && res.errCode === 0 && res.data) {
                setTimeout(() => {
                    if (res.data.length !== 0) {
                        setMessageList((list) => [...list, ...res.data]);
                    } else {
                        setHasMore(false);
                    }
                    setLoading(false);
                }, 3000);
            } else {
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

    // if(user.faculty !== recipient.faculty){
    //      call API for department has faculty same as faculty of student
    // getDepartmentByFacultyId(user.faculty);
    // const role = await Role.findOne({ name: 'Department' });
    //     if (!role) {
    //         return;
    //     }
    //  let user = await User.findOne({
    //          raw: true,
    //          faculty: faculty,
    //          role: role
    //    });
    // }


    // how to send message to both department and recipient at the same time
    // messageList[0] === null;

    useEffect(() => {
        fetchMessageHistory();
        if (user.role === 'Student') {

        }
    }, [recipient]);

    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            // console.log("check message text", newMessage);
            if (recipient.conversationId === newMessage.conversation) {
                setMessageList((list) => [newMessage, ...list]);
            }
        })

        return () => {
            socket.off("receive_message");
        }

    }, [socket]);

    useEffect(() => {
        socket.on("receive_file", (newMessage) => {
            // console.log("check data file", newMessage);
            if (recipient.conversationId === newMessage.conversation) {
                setMessageList((list) => [newMessage, ...list]);
            }
        })

        return () => {
            socket.off("receive_file");
        }

    }, [socket]);

    const onFinish = async (values) => {
        setIsSubmit(true);
        const { file, text } = values;
        if (text) {
            const messageData = {
                room: room,
                body: text,
                type: 'text',
                author: user._id,
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [messageData, ...list]);
            dispatch(setLastMessageToConversations({
                conversation: room,
                body: text,
                type: 'text',
                author: user._id,
                isRead: true
            }));
            form.resetFields();
        }
        setIsSubmit(false);
    };

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
            const isLt5M = file.size / 1024 / 1024 < 5;
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
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
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

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        // console.log("check file", file);
        try {
            const res = await callUploadMessageFileAPI(file);
            if (res && res.data && res.errCode === 0) {
                const public_id = res.data.public_id;
                const url = res.data.url;
                const fileName = file.name;
                const fileSize = file.size;
                const fileType = getFileType(file);
                const messageFile = {
                    room: room,
                    body: fileName,
                    author: user._id,
                    type: 'file',
                    fileUrl: url,
                    public_id: public_id,
                    fileName: fileName,
                    fileType: fileType,
                    fileSize: fileSize,
                };
                await socket.emit("send_file", messageFile);
                setMessageList((list) => [messageFile, ...list]);
                dispatch(setLastMessageToConversations({
                    conversation: room,
                    body: fileName,
                    author: user._id,
                    type: 'file',
                    fileUrl: url,
                    public_id: public_id,
                    fileName: fileName,
                    fileType: fileType,
                    fileSize: fileSize,
                }));
                onSuccess('ok');
            } else {
                onError('Upload file failed!');
            }
        } catch (e) {
            console.log(e);
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
                                        hasMore={hasMore}
                                        loader={<div style={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <ClipLoader size={20} color="#36d7b7" loading={true} />
                                        </div>}
                                        endMessage={
                                            <p style={{ textAlign: 'center', padding: '10px 0' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget="scrollableDiv"
                                    >
                                        {messageList.map((item, index) => {
                                            const isAuthor = user._id === item.author;
                                            return (
                                                <div key={index} className='message' id={isAuthor ? 'you' : 'other'}>
                                                    {item.type === 'text'
                                                        ?
                                                        <div className="message-content">
                                                            <p>{item.body}</p>
                                                        </div>
                                                        :
                                                        <div className='message-content file'>
                                                            <a className='click-download' href={item.fileUrl} target="_blank" download>
                                                                <div className='icon'>
                                                                    <FileOutlined />
                                                                </div>
                                                                <div className='info'>
                                                                    <p>File: <span className="file-name">{item.body}</span></p>
                                                                    <div className='download-info'>
                                                                        <span className='file-size'>Size: {(item.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    }
                                                    <div className="message-avt">
                                                        <Avatar src={isAuthor ? user.image : recipient.image} />
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
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />} block >Đính kèm file</Button>
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
                            placeholder="Nhập câu hỏi!"
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
                            Send
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row >
    )
}

export default Message;