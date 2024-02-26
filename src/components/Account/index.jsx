import React, { useEffect, useState } from 'react';
import { Tabs, Modal, Form } from 'antd';
import UpdateInfoDepartment from './UpdateInfo';
import CreatePassword from './CreatePassword';
import { useSelector } from 'react-redux';


const Account = (props) => {
    const { isModalAccountOpen, setModalAccountOpen } = props;
    const userInfo = useSelector(state => state.account.user);
    const [formUpdateInfo] = Form.useForm();
    const [formChangePassword] = Form.useForm();

    const tabItems = [
        {
            key: 'update_info',
            label: `Thông tin người dùng`,
            children:
                <UpdateInfoDepartment
                    isModalAccountOpen={isModalAccountOpen}
                    setModalAccountOpen={setModalAccountOpen}
                    form={formUpdateInfo}
                    userInfo={userInfo}
                />,
        },
        {
            key: 'create_password',
            label: `Tạo mật khẩu`,
            children:
                <CreatePassword
                    setModalAccountOpen={setModalAccountOpen}
                    form={formChangePassword}
                    userInfo={userInfo}
                />,
        },
    ];

    return (
        <>
            <Modal
                title="Cập nhật thông tin"
                open={isModalAccountOpen}
                // onOk={setModalAccountOpen}
                onCancel={() => {
                    setModalAccountOpen(false)
                    formUpdateInfo.resetFields();
                }}
                width={'50vw'}
                // centered={true}
                forceRender={true}
                footer={null}
            >
                <Tabs defaultActiveKey="update_info" items={tabItems} />
            </Modal>
        </>
    )
}


export default Account;