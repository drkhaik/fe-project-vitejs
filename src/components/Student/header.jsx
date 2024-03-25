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
                <header className='page-header'>
                    <div className='page-header__left'>
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo' onClick={() => redirectHome()}>
                                <img className='logo_img' src={logo} alt="Logo UEF" />
                                <p className='name'> Students UEF </p>
                            </span>
                        </div>
                    </div>
                    {/* <div className='page-header__middle'>
                        <VscSearchFuzzy className='icon-search' />
                        <input
                            className="input-search" type={'text'}
                            placeholder="Bạn tìm gì hôm nay"
                        // onChange={(e) => onChangeInputSearch(e.target.value)}
                        />
                    </div> */}
                    <div className='page-header__right'>
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
                                {/* <Dropdown rootClassName='dropdown-custom-style' menu={{ item: itemsDropdown }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <Avatar className='avt' src={user.image} />
                                            <Space />
                                            {user?.name}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown> */}
                                <Dropdown rootClassName='dropdown-custom-style' menu={{ items: itemsDropdown }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <Avatar className='avt' src={user.image} /> {user?.name} <Space />
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>

                            </li>
                        </ul>
                    </div>
                </header >

            </div >

            <Drawer
                title="Welcome"
                placement={'left'}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                width={"80vw"}
            >
                {user.role === 'Admin'
                    ?
                    <>
                        <p>Trang quản trị</p>
                        <Divider />
                    </>
                    :
                    <>
                    </>
                }
                <p>Xem lịch sử</p>
                <Divider />
                <p>Đăng xuất</p>
                <Divider />

            </Drawer>
            <Account
                isModalAccountOpen={isModalAccountOpen}
                setModalAccountOpen={setModalAccountOpen}
            />
        </>
    )
}

export default Header;