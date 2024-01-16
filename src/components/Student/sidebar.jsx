import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List
} from 'antd';
import { fetchDepartmentUser } from '../../services/api';
const Room = React.lazy(() => import('../Staff/Conversation/Room'));
import LoadingComponent from '../Loading/loadingComponent';
import { setRecipient } from '../../redux/conversation/conversationSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const [itemSidebar, setItemSidebar] = useState([]);
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        const getAllDepartmentUser = async () => {
            let res = await fetchDepartmentUser();
            setItemSidebar(res.data);
        }
        getAllDepartmentUser();
    }, []);

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
                                    onClick={() => {
                                        setOpenDrawer(true)
                                        dispatch(setRecipient(item))
                                    }}>
                                    <span className='title-status'>
                                        <span style={{ color: '#1677ff' }}>{item.name}</span>
                                    </span>
                                    {/* <p>
                                        {item._id}
                                        horizontalhorizontalhorizontaalhorizontaalhorizontaalhorizonta
                                        {item.email}
                                        {item.image}
                                    </p> */}
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
        </div>
    )
}

export default Sidebar;