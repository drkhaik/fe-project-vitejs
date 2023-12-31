import React, { useEffect, useState, useRef } from 'react';
import {
    Tag, Input, Drawer, Upload, Button, message, Row, Col
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setRecipient } from '../../redux/conversation/conversationSlice';
import Message from './message';
import './Conversation.scss';
import io from "socket.io-client";
import { createConversation } from '../../services/api';
const baseURL = import.meta.env.VITE_BACKEND_URL;
const socket = io.connect(baseURL);

const Room = (props) => {
    const dispatch = useDispatch();
    const { isOpenDrawer, setOpenDrawer } = props;
    const user = useSelector(state => state.account.user);
    const recipient = useSelector(state => state.conversation.recipient);
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = async () => {
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
            setShowChat(isOpenDrawer);
        }
    };

    useEffect(() => {
        joinRoom();
    }, [recipient, user])

    return (
        <div>
            <Drawer
                className='box-chat'
                title={
                    <>
                        <Tag color="#108ee9" style={{ marginRight: 0 }}>{recipient.name}</Tag> <Tag color="#108ee9">{recipient.email}</Tag>
                    </>
                }
                placement="right"
                onClose={() => {
                    setOpenDrawer(false)
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

const areEqual = (prevProps, nextProps) => {
    return prevProps.isOpenDrawer === nextProps.isOpenDrawer;
}
export default React.memo(Room, areEqual);