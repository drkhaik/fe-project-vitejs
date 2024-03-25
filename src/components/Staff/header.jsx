import React, { useState, useEffect, Suspense } from 'react';
import {
    Dropdown, Space, Avatar, Button, Badge, Divider, message, Popover, notification
} from 'antd';
import { DownOutlined, MessageOutlined } from '@ant-design/icons';
import logo from '../../assets/logo-uef-home.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../redux/account/accountSlice';
import { fetchUser } from '../../services/api';
import UpdateInfo from './Department/UpdateInfo';
const Conversation = React.lazy(() => import('../Conversation/Conversation'));
import LoadingComponent from '../Loading/loadingComponent';



const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const [departmentInfo, setDepartmentInfo] = useState({});
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    useEffect(() => {
        getDepartmentInfo(user._id);
    }, [user._id]);

    const getDepartmentInfo = async (_id) => {
        try {
            const res = await fetchUser(_id);
            if (res && res.data && res.errCode === 0) {
                setDepartmentInfo(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/staff");
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

    const renderChatbox = () => {
        return (
            <Suspense fallback={<LoadingComponent />}>
                <Conversation />
            </Suspense>
        )
    }


    const redirectHome = () => {
        navigate('/staff');
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
                                <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <Avatar src={user.image} /> {user?.name} <Space />
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </header >
            </div>
            <UpdateInfo
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                departmentInfo={departmentInfo}
            />
        </>

    )
}

export default Header;