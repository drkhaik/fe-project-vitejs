import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List, Tag, Badge, Avatar, Row, Col
} from 'antd';
import './Conversation.scss';
import { setRecipient, fetchListConversationReduxThunk } from '../../redux/conversation/conversationSlice';
import LoadingComponent from '../Loading/loadingComponent';
const Room = React.lazy(() => import('./Room'));

const Conversation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const conversations = useSelector(state => state.conversation.conversations);
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    // console.log("check conversations conversation", conversations);

    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchListConversationReduxThunk(user._id));
        }
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
                                            {item && item.lastMessage
                                                ?
                                                <p className="text-overflow">
                                                    {user._id === item.lastMessage.author ? `You: ${item.lastMessage.body}` : `${item.lastMessage.body}`}
                                                </p>
                                                :
                                                <p className="text-overflow">
                                                    Send a new message!
                                                </p>
                                            }
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