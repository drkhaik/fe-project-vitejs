import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import Header from './header';
import Sidebar from './sidebar';
// import Room from '../Conversation/Room';
import Post from './Post';
import LoadingComponent from '../Loading/loadingComponent';

const Room = React.lazy(() => import('../Conversation/Room'));

const HomeStaff = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    return (
        <div className='wrapper-layout-staff'>
            <Row className='layout-staff'>
                <Col span={24}>
                    <Header />
                </Col>
                <Col span={24}>
                    <Row className='container'>
                        <Col className='sidebar' span={6} >
                            <Sidebar
                                setOpenDrawer={setOpenDrawer}
                            />
                        </Col>
                        <Col className='content' span={18} >
                            <Post />
                        </Col>
                    </Row>
                </Col>
                <Suspense fallback={<LoadingComponent />}>
                    <Room
                        isOpenDrawer={isOpenDrawer}
                        setOpenDrawer={setOpenDrawer}
                    />
                </Suspense>
            </Row>
        </div >
    )
}

export default HomeStaff;