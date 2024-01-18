import React, { useState, useEffect } from 'react';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import Header from './header';
import Conversation from '../Conversation/Conversation';
import Post from './Post';

const HomeStaff = () => {
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
                        <Col className='content' span={18} >
                            <Post />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    )
}

export default HomeStaff;