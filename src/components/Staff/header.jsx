import React, { useState, useEffect, Suspense } from 'react';
import {
    Dropdown, Space, Avatar, Button, Badge, Divider, message, Popover, notification,
    Row, Col, Modal
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