import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List, Tag, Badge, Avatar, Row, Col
} from 'antd';
import { fetchConversationById } from '../../services/api';
import { setRecipient, setConversations } from '../../redux/conversation/conversationSlice';
import LoadingComponent from '../Loading/loadingComponent';
const Room = React.lazy(() => import('./Room'));

const Conversation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const conversations = useSelector(state => state.conversation.conversations);
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    const fetchConversation = async () => {
        if (user && user._id) {
            let res = await fetchConversationById(user._id);
            if (res && res.data) {
                // console.log("check res.data", res.data);
                dispatch(setConversations(res.data));
                // setItemSidebar(res.data);
            }
        }
    }
    ///// modify the user scheme, for students (mssv, faculty,) and for department
    //// send message to department and their faculty

    useEffect(() => {
        fetchConversation();
    }, []);

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
                                <a
                                    key={index}
                                    className='item-sidebar'
                                    onClick={() => {
                                        setOpenDrawer(true)
                                        dispatch(setRecipient(item))
                                    }}>
                                    <Row justify={'space-between'}>
                                        <Col span={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Avatar size={'large'} src={item.image} />
                                        </Col>
                                        <Col span={19}>
                                            <span className='title-status'>
                                                <span style={{ color: '#468aeb' }}>{item.name}</span>
                                                {/* <span> {new Date(item.lastMessage.createdAt).toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour: 'numeric', minute: 'numeric', hour12: true })}</span> */}
                                            </span>
                                            <p className="text-overflow">
                                                {user._id === item.lastMessage.author ? `You: ${item.lastMessage.body}` : `${item.lastMessage.body}`}
                                            </p>
                                        </Col>
                                    </Row>
                                </a>
                            }
                        />
                    </List.Item>
                )}
            />

            <Suspense fallback={<LoadingComponent />}>
                <Room
                    isOpenDrawer={isOpenDrawer}
                    setOpenDrawer={setOpenDrawer}
                />
            </Suspense>
        </>

    )
}

export default Conversation;