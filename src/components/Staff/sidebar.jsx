import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    List, Tag, Badge, Avatar, Row, Col
} from 'antd';
import { fetchConversationById } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setRecipient } from '../../redux/conversation/conversationSlice';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const { setOpenDrawer } = props;
    const [itemSidebar, setItemSidebar] = useState([]);
    const fetchConversation = async () => {
        if (user && user._id) {
            let res = await fetchConversationById(user._id);
            if (res && res.data) {
                setItemSidebar(res.data);
            }
        }
    }
    useEffect(() => {
        fetchConversation();
    }, [user]);

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={itemSidebar}
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
                                                <span>{item.id % 2 === 0 ? <Tag color="blue"> Responded </Tag> : <Tag color="red"> Pending</Tag>}</span>
                                            </span>
                                            <p className={item.id % 2 === 0 ? 'text-overflow' : 'text-overflow message-pending'}>
                                                horizontalhorizontalhorizontaalhorizontaalhorizontaalhorizonta
                                                {item.id}
                                            </p>
                                        </Col>
                                    </Row>
                                </a>
                            }
                        />
                    </List.Item>
                )}
            />
        </>

    )
}

export default Sidebar;