import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const NotFound = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    const redirectHome = () => {
        navigate(userRole === 'Department' ? '/staff' : '/');
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={() => redirectHome()} type="primary">Back</Button>}
        />
    )
};
export default NotFound;