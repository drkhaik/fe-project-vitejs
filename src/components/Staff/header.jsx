import {
    Dropdown, Space, Avatar, Button, Row, Col, message
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogoutReduxThunk } from '../../redux/account/accountSlice';

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setOpenModalUpdate } = props;
    const user = useSelector(state => state.account.user);

    const handleLogoutAction = () => {
        dispatch(handleLogoutReduxThunk());
        message.success("Log out successfully!");
        navigate("/");
    }
    const itemsDropdown = [
        {
            label: <p onClick={() => handleLogoutAction()} style={{ margin: 0 }}>Đăng xuất</p>,
            key: 'logout',
        },
    ];

    if (user.roleId === 1) {
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
        <div className='staff-header'>
            <Button onClick={() => setOpenModalUpdate(true)}> Xem thông tin phòng ban</Button>
            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {/* <Avatar src={srcAvt} /> {user?.fullName} <Space /> */}
                        <Avatar /> {user?.fullName} <Space />
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default Header;