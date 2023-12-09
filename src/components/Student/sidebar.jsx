import React, { useState, useEffect } from 'react';
import {
    List, Tag, Badge
} from 'antd';
import { fetchAllRole } from '../../services/api';
import OldConversation from './History/OldConversation';

const Sidebar = () => {
    // const { setConversationID, setOpenModalOldMessage } = props;
    const [itemSidebar, setItemSidebar] = useState([]);
    const [openModalOldMessage, setOpenModalOldMessage] = useState(false);
    const [departmentName, setDepartmentName] = useState("");
    const [conversationID, setConversationID] = useState();

    useEffect(() => {
        const getAllRole = async () => {
            let res = await fetchAllRole();
            // console.log(res.data)
            setItemSidebar(res.data);
        }
        getAllRole();
    }, []);

    return (
        <div>
            <div className='title'>
                Conversation
            </div>
            <List
                itemLayout="horizontal"
                dataSource={itemSidebar}
                size='small'
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <a onClick={() => {
                                    setConversationID(item.id)
                                    setOpenModalOldMessage(true)
                                    setDepartmentName(item.name)
                                }}>
                                    <span className='title-status'>
                                        <span style={{ color: '#1677ff' }}>{item.name}</span>
                                        <span>{item.id % 2 === 0 ? <></> : <Tag color="red"> New</Tag>}</span>
                                    </span>
                                    <p className={item.id % 2 === 0 ? 'text-overflow' : 'text-overflow message-pending'}>
                                        horizontalhorizontalhorizontaalhorizontaalhorizontaalhorizonta
                                        {item.id}
                                    </p>
                                </a>
                            }
                        />
                    </List.Item>
                )}
            />
            <OldConversation
                openModalOldMessage={openModalOldMessage}
                setOpenModalOldMessage={setOpenModalOldMessage}
                departmentName={departmentName}
                conversationID={conversationID}
            />
        </div>

    )
}

export default Sidebar;