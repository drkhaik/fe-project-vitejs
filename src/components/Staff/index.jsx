import React, { useState, useEffect } from 'react';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import Header from './header';
import Sidebar from './sidebar';
import Room from '../Conversation/Room';
import Post from './Post';


const HomeStaff = () => {
    const [recipient, setRecipient] = useState({});
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
                                setRecipient={setRecipient}
                                setOpenDrawer={setOpenDrawer}
                            />
                        </Col>
                        <Col className='content' span={18} >
                            <Post />
                        </Col>
                    </Row>
                </Col>
                <Room
                    recipient={recipient}
                    isOpenDrawer={isOpenDrawer}
                    setOpenDrawer={setOpenDrawer}
                />
            </Row>
        </div >
    )
}

export default HomeStaff;