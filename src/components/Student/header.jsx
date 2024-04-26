import React, { useState, Suspense } from 'react';
import { Col, Divider, Row, Dropdown, Space, Drawer, Badge, message, Avatar, Popover, Image } from 'antd';
import { DownOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../redux/account/accountSlice';
import logo from '../../assets/logo-uef-home.jpg'
import LoadingComponent from '../Loading/loadingComponent';
import Account from '../Account';
const Conversation = React.lazy(() => import('../Conversation/Conversation'));
const Sidebar = React.lazy(() => import('./sidebar'));

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useSelector(state => state.account.user);
    const notification = useSelector(state => state.conversation.notification);
    const [isModalAccountOpen, setModalAccountOpen] = useState(false);

    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/");
    }

    const itemsDropdown = [
        {
            label: <p onClick={() => setModalAccountOpen(true)} style={{ margin: 0, cursor: 'pointer' }}>Thông tin tài khoản</p>,
            key: 'account'
        },
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0, cursor: 'pointer' }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];

    if (user.role === 'Admin') {
        itemsDropdown.unshift(
            {
                label: <p onClick={() => navigate('/admin')} style={{ margin: 0, cursor: 'pointer' }}>Trang Admin</p>,
                key: 'admin'
            },
            {
                label: <p onClick={() => navigate('/staff')} style={{ margin: 0, cursor: 'pointer' }}>Trang Department</p>,
                key: 'staff'
            },
        )
    }

    const redirectHome = () => {
        navigate('/');
    }

    const onChangeInputSearch = (value) => {
        // console.log("check value", value);
        setSearchQuery(value);
    }

    const renderChatbox = () => {
        return (
            <Suspense fallback={<LoadingComponent />}>
                <Conversation />
            </Suspense>
        )
    }

    return (
        <>
            <div className='header-section'>
                    <Row className='page-header'>
                        <Col xs={2} sm={2} md={0} lg={0} className='left'>
                            <div className='navbar-mobile-left' onClick={() => setOpenDrawer(open => !open)}>
                                <div className='toggle'> 
                                    ☰ 
                                </div>  
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={6} lg={6} className='left'>
                            <div className='logo-wrapper'>
                                <span className='logo' onClick={() => redirectHome()}>
                                    <img className='logo_img' src={logo} alt="Logo UEF" />
                                    <p className='name'> Students UEF </p>
                                </span>
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={10} lg={10} className='middle'>
                        </Col>
                        <Col xs={10} sm={10} md={0} lg={0} className='middle'>
                            <span className='logo' onClick={() => redirectHome()}>
                                <img className='logo_img' src={logo} alt="Logo UEF" />
                                <p className='name'> Students UEF </p>
                            </span>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} className='right'>
                            <ul id="navigation" className="navigation">
                                <li className="navigation__item">
                                    <Popover
                                        content={renderChatbox}
                                        className='popover-cart'
                                        rootClassName='popover-cart'
                                        placement={'bottom'}
                                        trigger="click"
                                        zIndex={0}
                                    >
                                        <Badge
                                            showZero
                                            size={"default"}
                                            count={notification > 0 ? notification : null}
                                        >
                                            <MessageOutlined style={{ fontSize: '18px' }} />
                                        </Badge>
                                    </Popover>
                                </li>
                                <li className="navigation__item mobile"><Divider type='vertical' /></li>
                                <li className="navigation__item mobile">
                                    <Dropdown rootClassName='dropdown-custom-style' menu={{ items: itemsDropdown }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                            <Avatar className='avt' src={user.image} />
                                                <span className='username'>{user?.name}</span>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </li>
                            </ul>
                        </Col>
                    </Row>
            </div >
            {openDrawer
                ? <Drawer
                    placement="left"
                    width={'100vw'}
                    closable={true}
                    onClose={() => setOpenDrawer(false)}
                    visible={openDrawer}
                >
                    <Suspense fallback={<LoadingComponent />}>
                        <Sidebar />
                    </Suspense>
                </Drawer>
                : null
            }

            <Account
                isModalAccountOpen={isModalAccountOpen}
                setModalAccountOpen={setModalAccountOpen}
            />
        </>
    )
}

export default Header;