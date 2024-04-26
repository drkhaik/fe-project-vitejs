import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import Header from './header';
import Conversation from '../Conversation/Conversation';
import Post from './Post';
import ModalChooseFaculty from './ModalChooseFaculty';
const MostRating = React.lazy(() => import('../Document/MostRating'));
import LoadingComponent from '../Loading/loadingComponent';


const HomeStaff = () => {
    const user = useSelector(state => state.account.user);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user.role === 'Department') {
            if (!user.faculty) {
                setModalOpen(true);
            }
        }
    }, [user])

    return (
        <div className='wrapper-layout-staff'>
            <Row className='layout-staff'>
                <Col span={24}>
                    <Header />
                </Col>
                <Col span={24}>
                    <Row className='container'>
                        <Col className='sidebar' span={6} >
                            <Conversation />
                        </Col>
                        <Col className='content' span={13} >
                            <Post />
                        </Col>
                        <Col className='sidebar-right' span={5} >
                            <Suspense fallback={<LoadingComponent />}>
                                <MostRating />
                            </Suspense>
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

export default HomeStaff;