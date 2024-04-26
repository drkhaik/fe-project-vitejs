import React, { useState, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Row, Col, message, notification
} from 'antd';
import './home.scss';
import Content from './content';
const Sidebar = React.lazy(() => import('./sidebar'));
const MostRating = React.lazy(() => import('../Document/MostRating'));
import FloatButtonRedirect from './FloatButtonRedirect';
import LoadingComponent from '../Loading/loadingComponent';
import ModalChooseFaculty from './ModalChooseFaculty';

const Home = () => {
    const user = useSelector(state => state.account.user);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user.role === 'Student') {
            if (!user.studentId || !user.faculty) {
                setModalOpen(true);
            }
        }
    }, [user]);

    return (
        <div className='wrapper-layout-student'>
            <Row>
                {/* <Col span={24}>
                    <Header />
                </Col> */}
                <Col span={24}>
                    <Row justify={'space-between'} className="homepage-container">
                        <Col xs={0} sm={0} md={8} lg={8} xl={5} className='sidebar'>
                            <Suspense fallback={<LoadingComponent />}>
                                <Sidebar />
                            </Suspense>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={15} xl={14} className='content'>
                            <Content />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={5} className='sidebar-right'>
                            <Suspense fallback={<LoadingComponent />}>
                                <MostRating />
                            </Suspense>
                        </Col>
                        <FloatButtonRedirect />
                    </Row>
                </Col>
            </Row>

            <ModalChooseFaculty
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                userId={user._id}
            />
        </div >

    )
}

export default Home;