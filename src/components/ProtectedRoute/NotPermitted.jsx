import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const NotPermitted = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    const redirectHome = () => {
        if (userRole === 'Staff') {
            navigate('/staff');
        } else {
            navigate('/');
        }
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button onClick={() => redirectHome()} type="primary">Back Home</Button>}
        />
    )
};
export default NotPermitted;