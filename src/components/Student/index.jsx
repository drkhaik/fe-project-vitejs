import React, { useState, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Row, Col, message, notification
} from 'antd';
import './home.scss';
// import Sidebar from './sidebar';
import Content from './content';
import Header from './header';
const Sidebar = React.lazy(() => import('./sidebar'));
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
                <Col span={24}>
                    <Header />
                </Col>
                <Col span={24}>
                    <Row justify={'space-between'} className="homepage-container">
                        <Col span={5} className='sidebar'>
                            <Suspense fallback={<LoadingComponent />}>
                                <Sidebar />
                            </Suspense>
                        </Col>
                        <Col span={19} className='content'>
                            <Content />
                        </Col>
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