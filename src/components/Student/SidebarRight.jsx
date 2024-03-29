import React, { useState, useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List, Drawer, Tag, Row, Col, FloatButton,
} from 'antd';
import { CustomerServiceOutlined, RobotOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SidebarRight = () => {

    const navigate = useNavigate();

    return (
        <div>
            <>
                <FloatButton.Group
                    trigger="hover"
                    type="primary"
                    style={{
                        right: 60,
                        fontSize: 20
                    }}
                    icon={<CustomerServiceOutlined />}
                >
                    <FloatButton tooltip={<div>Document Sharing</div>} onClick={() => navigate('/document')} />
                    <FloatButton tooltip={<div>Chatbot</div>} icon={<RobotOutlined />} />
                </FloatButton.Group>
            </>

        </div>
    )
}

export default SidebarRight
