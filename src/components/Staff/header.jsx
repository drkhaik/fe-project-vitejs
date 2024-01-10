import React, { useState } from 'react';
import {
    Dropdown, Space, Avatar, Button, Row, Col, message
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../redux/account/accountSlice';
import UpdateInfo from './Department/UpdateInfo';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    // console.log("check user header", user);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/");
    }
    const itemsDropdown = [
        {
            label: <p onClick={() => setOpenModalUpdate(true)} style={{ margin: 0 }}>Chỉnh sửa thông tin</p>,
            key: 'edit_info',
        },
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0 }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];

    if (user.role === 'Admin') {
        itemsDropdown.unshift(
            {
                label: <p onClick={() => navigate('/admin')} style={{ margin: 0 }}>Trang Admin</p>,
                key: 'admin',
            },
            {
                label: <p onClick={() => navigate('/')} style={{ margin: 0 }}>Trang Chủ</p>,
                key: 'home',
            }
        )
    }

    return (
        <>
            <div className='header'>
                {/* <Button onClick={() => navigate('/staff/post')}> Quản lý bài viết</Button> */}
                <div style={{ textAlign: 'center', fontSize: 17 }}>Department</div>
                <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar src={user.image} /> {user?.name} <Space />
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <UpdateInfo
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
            />
        </>

    )
}

export default Header;