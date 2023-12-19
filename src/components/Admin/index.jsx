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
    // const srcAvt = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;
    let newStr = location.pathname.replace("/admin/", "");
    useEffect(() => {
        let keyActiveByPath = location.pathname.replace("/admin/", "");
        // console.log("check keyActive Path", keyActiveByPath)
        if (keyActiveByPath === '/admin') {
            setActiveMenu('dashboard');
        } else {
            setActiveMenu(keyActiveByPath);
        }
    }, [])
    // console.log("check new str", newStr);
    const itemsDropdown = [
        {
            label: <p onClick={() => navigate('/')} style={{ margin: 0, cursor: 'pointer' }}>Trang Chủ</p>,
            key: 'home'
        },
        {
            label: <p onClick={() => navigate('/staff')} style={{ margin: 0, cursor: 'pointer' }}>Trang Staff</p>,
            key: 'staff',
        },
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0 }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];

    return (
        <div style={{ minHeight: '100vh' }} className="layout-admin">
            {/* <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            > */}
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
                                {/* <Avatar src={srcAvt} /> {user?.fullName} <Space /> */}
                                <Avatar /> {user?.name} <Space />
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Outlet />
            </Content>
            {/* </Layout> */}
        </div>
    );
};
export default LayoutAdmin;