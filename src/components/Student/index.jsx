import React, { useState, Suspense } from 'react';
import {
    Row, Col, message, notification
} from 'antd';
import './home.scss';
// import Sidebar from './sidebar';
import Content from './content';
import Header from './header';
const Sidebar = React.lazy(() => import('./sidebar'));
import LoadingComponent from '../Loading/loadingComponent';

const Home = () => {
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
        </div >

    )
}

export default Home;