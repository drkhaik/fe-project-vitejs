import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    UserOutlined,
    DownOutlined,
    RightSquareTwoTone,
    LeftSquareTwoTone
} from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space, message, Avatar, Divider } from 'antd';
import './LayoutAdmin.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, Link, useLocation, useMatch } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../redux/account/accountSlice';
import { FaNewspaper, FaPollH, FaFile, FaFolder } from "react-icons/fa";

const { Header, Content, Footer, Sider } = Layout;
const itemsSidebar = [
    {
        label: <Link to='/admin'> Dashboard </Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <Link to='/admin/user'>User</Link>,
        key: 'user',
        icon: <UserOutlined />
    },
    {
        label: <Link to='/admin/faculty'>Faculty</Link>,
        key: 'faculty',
        icon: <FaPollH />
    },
    {
        label: <Link to='/admin/subject'>Subject</Link>,
        key: 'subject',
        icon: <FaFolder />
    },
    {
        label: <Link to='/admin/post'>Post</Link>,
        key: 'post',
        icon: <FaNewspaper />
    },
    {
        label: <Link to='/admin/document'>Document</Link>,
        key: 'document',
        icon: <FaFile />
    },
];

const LayoutAdmin = () => {
    const user = useSelector(state => state.account.user);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/");
    }
    const [collapsed, setCollapsed] = useState(false);
    let newStr = location.pathname.replace("/admin/", "");
    useEffect(() => {
        let keyActiveByPath = location.pathname.replace("/admin/", "");
        if (keyActiveByPath === '/admin') {
            setActiveMenu('dashboard');
        } else {
            setActiveMenu(keyActiveByPath);
        }
    }, [])
    const itemsDropdown = [
        {
            label: <p onClick={() => navigate('/')} style={{ margin: 0, cursor: 'pointer' }}>Trang Student</p>,
            key: 'home'
        },
        {
            label: <p onClick={() => navigate('/staff')} style={{ margin: 0, cursor: 'pointer' }}>Trang Department</p>,
            key: 'staff',
        },
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0 }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];

    return (
        <div style={{ minHeight: '100vh' }} className="layout-admin">
            <Sider
                className='sidebar'
                theme="light"
                // collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ height: 32, margin: 14, textAlign: 'center', fontSize: 17 }}>Admin</div>
                <Menu
                    // theme="light"
                    className='menu-sidebar'
                    // defaultSelectedKeys={[activeMenu]}
                    selectedKeys={[activeMenu]}
                    // activeKey={activeMenu}
                    mode="inline"
                    items={itemsSidebar}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>

            <Content style={{ margin: '0 16px', }} >
                <div className='admin-header'>
                    <span style={{ fontSize: 24 }}>
                        {React.createElement(collapsed ? RightSquareTwoTone : LeftSquareTwoTone, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        {/* <button onClick={() => { setCollapsed(!collapsed) }} ><MinusSquareTwoTone /></button> */}
                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar src={user.image} /> {user?.name} <Space />
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Outlet />
            </Content>
        </div>
    );
};
export default LayoutAdmin;