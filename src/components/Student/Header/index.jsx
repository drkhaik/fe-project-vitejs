import React, { useState } from 'react';
import { Col, Divider, Row, Dropdown, Space, Drawer, Badge, message, Avatar, Popover, Image } from 'antd';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../../redux/account/accountSlice';
import './header.scss';
import { VscSearchFuzzy } from 'react-icons/vsc';
import logo from '../../../assets/logo-uef-home.jpg'

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchQuery, setSearchQuery } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);
    // const srcAvt = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;

    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/");
    }

    const handleClickOrder = () => {
        setIsModalAccountOpen(true);
    }

    let items = [
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0, cursor: 'pointer' }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];


    if (user.roleID === 2) {
        items.unshift({
            label: <p onClick={() => navigate('/history')} style={{ margin: 0, cursor: 'pointer' }}>Xem lịch sử</p>,
            key: 'history'
        })
    }

    if (user.roleID === 1) {
        items.unshift(
            {
                label: <p onClick={() => navigate('/admin')} style={{ margin: 0, cursor: 'pointer' }}>Trang Admin</p>,
                key: 'admin'
            },
            {
                label: <p onClick={() => navigate('/staff')} style={{ margin: 0, cursor: 'pointer' }}>Trang Staff</p>,
                key: 'staff'
            },
        )
    }

    const redirectHome = () => {
        const userRole = user.role;
        navigate(userRole === 'Staff' ? '/staff' : '/');
    }

    const onChangeInputSearch = (value) => {
        // console.log("check value", value);
        setSearchQuery(value);
    }

    return (
        <>
            <div className='header-container'>
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
                            {/* <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            // onChange={(e) => onChangeInputSearch(e.target.value)}
                            /> */}
                        </div>
                    </div>
                    <div className='page-header__middle'>
                        <VscSearchFuzzy className='icon-search' />
                        <input
                            className="input-search" type={'text'}
                            placeholder="Bạn tìm gì hôm nay"
                        // onChange={(e) => onChangeInputSearch(e.target.value)}
                        />
                    </div>
                    <div className='page-header__right'>
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    // title="Thông báo"
                                    // content={renderCartHeader}
                                    className='popover-cart'
                                    rootClassName='popover-cart'
                                    placement={'bottomRight'}
                                // arrow={true}
                                >
                                    <Badge
                                        // count={cart?.length ?? 0}
                                        showZero
                                        size={"default"}
                                        count={5}
                                    >
                                        <BellOutlined style={{ fontSize: '18px' }} />
                                        {/* <FiShoppingCart className='icon-cart' /> */}
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown rootClassName='dropdown-custom-style' menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar className='avt' />
                                                {user?.name}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
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
            {/* <Account
                isModalAccountOpen={isModalAccountOpen}
                setIsModalAccountOpen={setIsModalAccountOpen}
            /> */}
        </>
    )
}

export default Header;