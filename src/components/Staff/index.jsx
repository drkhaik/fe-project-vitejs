import React, { useState, useEffect } from 'react';
import {
    Row, Col, Tag
} from 'antd';
import './homeStaff.scss';
import UpdateInfo from './Department/UpdateInfo';
import ContentStaffSide from './content';
import Sidebar from './sidebar';
import Header from './header';

const HomeStaff = () => {
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [userID, setUserID] = useState(1);

    const onReset = () => {
        form.resetFields();
    };

    const clickViewInfo = async () => {
        navigate('/department');
    };

    return (
        <div className='wrapper'>
            <Row className="layout-staff">
                <Col className='sidebar' span={5} >
                    <Sidebar setUserID={setUserID} />
                </Col>

                <Col className='content' span={19} >
                    <Header setOpenModalUpdate={setOpenModalUpdate} />
                    <ContentStaffSide userID={userID} />
                </Col>
            </Row>

            <UpdateInfo
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
            />
        </div >
    )
}

export default HomeStaff;