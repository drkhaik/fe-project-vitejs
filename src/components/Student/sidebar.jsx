import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List, Drawer, Tag, Row, Col, Button,
} from 'antd';
import { fetchDepartmentUser, createConversation } from '../../services/api';
import { setRecipient, setListConversations, setLastMessageToConversations } from '../../redux/conversation/conversationSlice';
import Message from '../Conversation/message';
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import convertSlugFunction from '../../utilizes/convertSlug';
const baseURL = import.meta.env.VITE_APP_BACKEND_NODEJS_URL;
const socket = io.connect(baseURL);

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const recipient = useSelector(state => state.conversation.recipient);
    const { convertSlug } = convertSlugFunction();
    const [itemSidebar, setItemSidebar] = useState([]);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const getAllDepartmentUser = async () => {
            let res = await fetchDepartmentUser(user._id);
            setItemSidebar(res.data);
        }
        getAllDepartmentUser();
    }, []);

    useEffect(() => {
        if (itemSidebar.length > 0) {
            let arrayConversations = []
            for (let i = 0; i < itemSidebar.length; i++) {
                if (itemSidebar[i].conversationId) {
                    socket.emit("join_room", itemSidebar[i].conversationId);
                    // console.log("check join room", itemSidebar[i].conversationId)
                    arrayConversations.push(itemSidebar[i]);
                }
            }
            dispatch(setListConversations(arrayConversations))
        }
    }, [itemSidebar.length]);

    const joinRoom = async () => {
        try {
            if (!user || !recipient) {
                return;
            }
            let data = {
                senderId: user._id,
                recipientId: recipient._id
            }
            const res = await createConversation(data);
            if (res && res.errCode === 0 && res.data) {
                const roomId = res.data;
                socket.emit("join_room", roomId);
                setRoom(roomId);
                let newRecipient = { ...recipient, conversationId: roomId }
                dispatch(setRecipient(newRecipient));
                // dispatch(setListConversations(newRecipient));
                setShowChat(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (recipient.conversationId) {
            socket.emit("join_room", recipient.conversationId);
            setRoom(recipient.conversationId);
            setShowChat(true);
        }
    }, [recipient]);

    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            console.log("check receive_message", newMessage);
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
            console.log("check receive_file", newMessage);
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

    const handleOnClickDepartment = (item) => {
        setOpenDrawer(true);
        dispatch(setRecipient(item));
    }

    const handleRedirectViewFacultyPost = (recipient) => {
        const slug = convertSlug(recipient.name);
        let encodedDepartmentId = btoa(recipient._id);
        navigate(`/post/${slug}?id=${encodedDepartmentId}`);
    }

    return (
        <div>
            <div className='title'>
                Department/Faculty
            </div>
            <List
                itemLayout="horizontal"
                dataSource={itemSidebar}
                className='list-department'
                style={{ maxHeight: 'auto', overflow: 'auto' }}
                size='small'
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <a
                                    key={index}
                                    onClick={() => handleOnClickDepartment(item)}>
                                    <span className='title-status'>
                                        <span style={{ color: '#1677ff' }}>{item.name}</span>
                                    </span>
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
                        <Tag
                            color="#108ee9"
                            style={{ marginRight: 0, cursor: 'pointer' }}
                            onClick={() => handleRedirectViewFacultyPost(recipient)}
                            title={`Posts of ${recipient.name}`}
                        >
                            {recipient.name}
                        </Tag>
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
                    <Row>
                        <Col span={24}>
                            <div className='chat-window'>
                                <div className='chat-body'>
                                    <div className='room-container'>
                                        <Button type="primary" onClick={joinRoom}>
                                            Connect
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Message
                        socket={socket}
                        room={room}
                    />
                }
            </Drawer>
        </div>
    )
}

export default Sidebar;