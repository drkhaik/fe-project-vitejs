import { useState } from 'react';
import {
    Row, Col, message, notification
} from 'antd';
import './home.scss';
import Sidebar from './sidebar';
import Content from './content';


const Home = () => {
    return (
        <div>
            <Row justify={'space-between'} className="homepage-container" gutter={12}>
                <Col span={6}>
                    <div className='sidebar'>
                        <Sidebar />
                    </div>
                </Col>

                <Col span={18}>
                    <div className='content'>
                        <Content />
                    </div>
                </Col>
            </Row>
        </div >

    )
}

export default Home;