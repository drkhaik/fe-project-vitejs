import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List, Tag, Badge, Avatar, Row, Col, Drawer, Divider
} from 'antd';
import { FaCircle } from "react-icons/fa";
import './Conversation.scss';
import {
    setRecipient,
    fetchListConversationReduxThunk,
    setIsRead,
    setLastMessageToConversations
}
    from '../../redux/conversation/conversationSlice';
import Message from './message';
import BeatLoader from "react-spinners/BeatLoader"
import io from "socket.io-client";
const baseURL = import.meta.env.VITE_APP_BACKEND_NODEJS_URL;
const socket = io.connect(baseURL);

const Conversation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const recipient = useSelector(state => state.conversation.recipient);
    const conversations = useSelector(state => state.conversation.conversations);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchListConversationReduxThunk(user._id));
        }
    }, [user]);

    useEffect(() => {
        if (conversations && conversations.length > 0) {
            for (let i = 0; i < conversations.length; i++) {
                socket.emit("join_room", conversations[i].conversationId);
                // console.log("check conversations[i].conversationId", conversations[i].conversationId)
            }
            setShowChat(true);
        }
    }, [socket, conversations]);

    useEffect(() => {
        if (recipient.conversationId) {
            setRoom(recipient.conversationId);
            setShowChat(true);
        }
    }, [recipient]);

    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            // console.log("check receive_message", newMessage);
            let isReadMessage = false;
            if (showChat && room === newMessage.conversation) {
                isReadMessage = true;
            }
            dispatch(setLastMessageToConversations({ ...newMessage, isRead: isReadMessage }));
        })
        return () => {
            socket.off("receive_message");
        }
    }, [socket]);

    useEffect(() => {
        socket.on("receive_file", (newMessage) => {
            // console.log("check receive_file", newMessage);
            let isReadMessage = false;
            if (showChat && room === newMessage.conversation) {
                isReadMessage = true;
            }
            dispatch(setLastMessageToConversations({ ...newMessage, isRead: isReadMessage }));
        })
        return () => {
            socket.off("receive_file");
        }
    }, [socket]);

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={conversations}
                size='small'
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <a key={index}
                                    className='item-sidebar'
                                    onClick={() => {
                                        setOpenDrawer(true)
                                        dispatch(setRecipient(item))
                                        dispatch(setIsRead(item.conversationId))
                                    }}>
                                    <Row justify={'space-between'}>
                                        <Col span={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Avatar size={'large'} src={item.image} />
                                        </Col>
                                        <Col span={19} className='title-status'>
                                            <div>
                                                <span style={{ color: '#468aeb' }}>{item.name}</span>
                                                {item && item.lastMessage
                                                    ?
                                                    <p className="text-overflow">
                                                        {user._id === item.lastMessage.author
                                                            ? `You: ${item.lastMessage.body}`
                                                            : `${item.lastMessage.body}`}
                                                    </p>
                                                    :
                                                    <p className="text-overflow">
                                                        Send a new message!
                                                    </p>
                                                }
                                            </div>
                                            {item && item.lastMessage && item.lastMessage.author !== user._id ? (
                                                <span className='dot-new-message'>
                                                    {item.lastMessage.isRead === false ? (
                                                        <FaCircle size={12} color='#0761e1' />
                                                    ) : null}
                                                </span>
                                            ) : null}
                                        </Col>
                                    </Row>
                                </a>
                            }
                        />
                    </List.Item>
                )}
            />

            <Drawer
                className='box-chat'
                title={
                    <>
                        <Tag color="#108ee9" style={{ marginRight: 0 }}>{recipient.name}</Tag>
                        <Divider type='vertical' />
                        <Tag color="#108ee9">{recipient.email}</Tag>
                    </>
                }
                placement="right"
                onClose={() => {
                    setOpenDrawer(false)
                    setShowChat(false);
                    dispatch(setRecipient({}))
                }}
                open={isOpenDrawer}
                width={'50vw'}
            >
                {!showChat ?
                    <>
                        <BeatLoader style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} color="#F8BFD4" />
                    </>
                    :
                    <Message
                        socket={socket}
                        room={room}
                    />
                }
            </Drawer>
        </>

    )
}

export default Conversation;