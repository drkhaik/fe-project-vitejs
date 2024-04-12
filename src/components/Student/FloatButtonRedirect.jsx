import React, { useState, useEffect, Suspense } from 'react';
import {
    FloatButton,
} from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Chatbot = React.lazy(() => import('../Chatbot'));
import LoadingComponent from '../Loading/loadingComponent';

const FloatButtonRedirect = () => {
    const navigate = useNavigate();
    const [isOpenDrawer, setOpenDrawer] = useState(false);

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
                    // icon={<CustomerServiceOutlined />}
                >
                    <FloatButton tooltip={<div>Document Sharing</div>} onClick={() => navigate('/document')} />
                    <FloatButton tooltip={<div>Chatbot</div>} onClick={() => setOpenDrawer(true)} icon={<RobotOutlined />} />
                </FloatButton.Group>
            </>

            <Suspense fallback={<LoadingComponent />}>
                <Chatbot
                    isOpenDrawer={isOpenDrawer}
                    setOpenDrawer={setOpenDrawer} 
                />
            </Suspense>
        </div>
    )
}

export default FloatButtonRedirect
