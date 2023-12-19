import React, { useState, useEffect } from 'react';
import {
    List, Tag, Badge
} from 'antd';
import { fetchAllRole } from '../../services/api';

const Sidebar = (props) => {
    const { setUserID, setOpenDrawer } = props;
    const [itemSidebar, setItemSidebar] = useState([]);

    useEffect(() => {
        const getAllRole = async () => {
            let res = await fetchAllRole();
            setItemSidebar(res.data);
        }
        getAllRole();
    }, []);

    return (
        <>
            {/* <div style={{ height: 32, margin: 14, textAlign: 'center', fontSize: 17 }}>Department</div> */}
            <List
                itemLayout="horizontal"
                dataSource={itemSidebar}
                size='small'
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <a onClick={() => {
                                    setOpenDrawer(true)
                                    setUserID(item.id)
                                }}>
                                    <span className='title-status'>
                                        <span style={{ color: '#468aeb' }}>{item.name}</span>
                                        <span>{item.id % 2 === 0 ? <Tag color="blue"> Responded </Tag> : <Tag color="red"> Pending</Tag>}</span>
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
        </>

    )
}

export default Sidebar;