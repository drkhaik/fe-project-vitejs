import React, { useState, useEffect } from 'react';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import UpdateInfo from './Department/UpdateInfo';
import Header from './header';
import Sidebar from './sidebar';
import Message from './Message';
import Post from './Post';

const HomeStaff = () => {
    const [userID, setUserID] = useState(1);
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
                            <Sidebar setUserID={setUserID} setOpenDrawer={setOpenDrawer} />
                        </Col>
                        <Col className='content' span={18} >
                            <Post />
                        </Col>
                    </Row>
                </Col>
                <Message
                    userID={userID}
                    isOpenDrawer={isOpenDrawer}
                    setOpenDrawer={setOpenDrawer}
                />
            </Row>
        </div >
    )
}

export default HomeStaff;